import React, { useState } from 'react';
import { 
  IonItem, 
  IonLabel, 
  IonText, 
  IonButton, 
  IonIcon, 
  IonModal,
  useIonToast,
  IonAlert,
  IonList,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonRefresher,
  IonRefresherContent,
  IonSpinner
} from '@ionic/react';
import { mailOutline, refreshOutline } from 'ionicons/icons';
import { gmailService } from '../services/GmailService';
import axios from 'axios';

interface EmailData {
  from: string;
  subject: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface ResponseProps {
    subject: string;
    shortSummary: string;
    priority: number;
    sentTime: string
}

const generateAIResponse = async (emailContent: { subject: string; from: string }) => {
  try {
    const prompt = `Please write a professional response to an email with subject: "${emailContent.subject}" from: "${emailContent.from}". Do not include the subject in the reply back. Make sure there are no placeholders. Get the name of person from the context of email or do not write anything if name is not given in the email. Make sure email reply is according to the tone of the email recieved. Always include closing and opening salutations. DO NOT WRITE PLACEHOLDERS SUCH AS [YOUR NAME] in case name is not known.`;
    
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a professional email assistant. Write concise, courteous responses." },
          { role: "user", content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
};

const EmailComponent: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [presentToast] = useIonToast();
  const [recentEmails, setRecentEmails] = useState<EmailData[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [subject, setSubject] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [responseContent, setResponseContent] = useState('');

  const authorize = async () => {
    try {
      await gmailService.handleAuth();
      setIsAuthorized(true);
      await fetchRecentEmails();
      presentToast({
        message: 'Gmail authorization successful!',
        duration: 2000,
        color: 'success'
      });
    } catch (error) {
      presentToast({
        message: 'Gmail authorization failed. Please try again.',
        duration: 3000,
        color: 'danger'
      });
    }
  };

  const fetchRecentEmails = async () => {
    try {
      const emails = await gmailService.readLastNEmails(5);
      setRecentEmails(emails);
    } catch (error) {
      presentToast({
        message: 'Failed to fetch recent emails',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    try {
      await fetchRecentEmails();
      presentToast({
        message: 'Emails refreshed successfully',
        duration: 2000,
        color: 'success'
      });
    } finally {
      event.detail.complete();
    }
  };

  const handleEmailSelect = async (email: EmailData) => {
    setSelectedEmail(email);
    setSubject(`Re: ${email.subject}`);
    setToEmail(email.from.replace(/.*<(.+)>/, '$1')); 
    
    setIsLoading(true);
    try {
      const aiResponse = await generateAIResponse(email);
      setResponseContent(aiResponse); // Populate response content automatically
    } catch (error) {
      presentToast({
        message: 'Failed to generate AI response',
        duration: 2000,
        color: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!toEmail || !subject || !responseContent) {
      presentToast({
        message: 'Please fill in all required fields',
        duration: 2000,
        color: 'warning'
      });
      return;
    }
    try {
      await gmailService.sendEmail(toEmail, subject, responseContent);
      
      presentToast({
        message: 'Email sent successfully!',
        duration: 2000,
        color: 'success'
      });
      // Clear form
      setSubject('');
      setToEmail('');
      setResponseContent('');
      setSelectedEmail(null);
      
      // Refresh email list
      await fetchRecentEmails();
    } catch (error) {
      presentToast({
        message: 'Failed to send email. Please try again.',
        duration: 3000,
        color: 'danger'
      });
    }
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>

      <IonButton 
        expand="block" 
        onClick={authorize} 
        disabled={isAuthorized}
        className="ion-margin"
      >
        {isAuthorized ? 'Authorized' : 'Authorize Gmail'}
        <IonIcon slot="start" icon={mailOutline} />
      </IonButton>
      {isAuthorized && (
        <>
          <IonButton 
            expand="block" 
            onClick={fetchRecentEmails}
            className="ion-margin"
          >
            <IonIcon slot="start" icon={refreshOutline} />
            Refresh Emails
          </IonButton>

          <IonCard className="ion-margin">
            <IonCardContent>
              <h2>Recent Emails</h2>
              <IonList>
                {recentEmails.map((email, index) => (
                  <IonItem
                    key={index}
                    button
                    onClick={() => handleEmailSelect(email)}
                    className={selectedEmail?.subject === email.subject ? 'selected-email' : ''}
                  >
                    <IonLabel>
                      <h3>{email.subject}</h3>
                      <p>{email.from}</p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
          <IonCard className="ion-margin">
            <IonCardContent>
              <h2>Compose Response</h2>
              {isLoading && (
                <div className="ion-text-center ion-padding">
                  <IonSpinner />
                  <p>Generating AI response...</p>
                </div>
              )}
              
              <IonItem>
                <IonLabel position="stacked">To:</IonLabel>
                <IonInput
                  value={toEmail}
                  onIonChange={e => setToEmail(e.detail.value || '')}
                  type="email"
                  placeholder="recipient@email.com"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Subject:</IonLabel>
                <IonInput
                  value={subject}
                  onIonChange={e => setSubject(e.detail.value || '')}
                  placeholder="Enter subject"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Response:</IonLabel>
                <IonTextarea
                  value={responseContent}
                  onIonChange={e => setResponseContent(e.detail.value || '')}
                  rows={6}
                  placeholder="Type your response here..."
                />
              </IonItem>
              <IonButton
                expand="block"
                className="ion-margin-top"
                onClick={handleSendEmail}
                disabled={isLoading}
              >
                Send Response
              </IonButton>
            </IonCardContent>
          </IonCard>
        </>
      )}
      <IonAlert
        isOpen={showAuthAlert}
        onDidDismiss={() => setShowAuthAlert(false)}
        header="Authorization Required"
        message="You need to authorize Gmail to send emails. Would you like to authorize now?"
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Authorize',
            handler: () => {
              authorize();
            },
          },
        ]}
      />
    </IonContent>
  )

}

export default EmailComponent;
