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
  IonTextarea
} from '@ionic/react';
import { mailOutline } from 'ionicons/icons';
import { gmailService } from '../services/GmailService';
import './Response.css';

interface EmailData {
  from: string;
  subject: string;
}

const PendingEmail: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [presentToast] = useIonToast();
  const [recentEmails, setRecentEmails] = useState<EmailData[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null);
  
  // Form state
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
    } catch (error) {
      presentToast({
        message: 'Failed to send email. Please try again.',
        duration: 3000,
        color: 'danger'
      });
    }
  };

  const handleEmailSelect = (email: EmailData) => {
    setSelectedEmail(email);
    setSubject(`Re: ${email.subject}`);
    setToEmail(email.from.replace(/.*<(.+)>/, '$1')); // Extract email from "Name <email>" format
  };

  return (
    <IonContent>
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
  );
};

export default PendingEmail;