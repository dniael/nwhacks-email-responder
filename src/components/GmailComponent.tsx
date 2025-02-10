// src/components / GmailComponent.tsx
import React, { useState } from 'react';
import { IonButton, IonContent, IonItem, IonLabel, IonList, useIonToast } from '@ionic/react';
import { gmailService } from '../services/GmailService';
const GmailComponent: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [emails, setEmails] = useState<Array<{ from: string; subject: string }>>([]);
  const [presentToast] = useIonToast();
  const handleAuth = async () => {
    try {
      await gmailService.handleAuth();
      setIsAuthorized(true);
      presentToast({
        message: 'Successfully authorized!',
        duration: 2000,
        color: 'success'
      });
    } catch (error) {
      presentToast({
        message: 'Authorization failed!',
        duration: 2000,
        color: 'danger'
      });
    }
  };
  const handleSignout = async () => {
    try {
      await gmailService.handleSignout();
      setIsAuthorized(false);
      setEmails([]);
      presentToast({
        message: 'Signed out successfully!',
        duration: 2000,
        color: 'success'
      });
    } catch (error) {
      presentToast({
        message: 'Sign out failed!',
        duration: 2000,
        color: 'danger'
      });
    }
  };
  const handleReadEmails = async () => {
    try {
      const lastEmails = await gmailService.readLastNEmails(5);
      setEmails(lastEmails);
    } catch (error) {
      presentToast({
        message: 'Failed to read emails!',
        duration: 2000,
        color: 'danger'
      });
    }
  };
  const handleSendEmail = async () => {
    try {
      await gmailService.sendEmail(
        'adilsameer99@gmail.com',
        'Sent from Ionic App',
        'Hello from the Ionic application!'
      );
      presentToast({
        message: 'Email sent successfully!',
        duration: 2000,
        color: 'success'
      });
    } catch (error) {
      presentToast({
        message: 'Failed to send email!',
        duration: 2000,
        color: 'danger'
      });
    }
  };
  return (
    <IonContent>
      <IonButton expand="block" onClick={handleAuth} disabled={isAuthorized}>
        {isAuthorized ? 'Authorized' : 'Authorize Gmail'}
      </IonButton>
      <IonButton expand="block" onClick={handleSignout} disabled={!isAuthorized}>
        Sign Out
      </IonButton>
      <IonButton expand="block" onClick={handleReadEmails} disabled={!isAuthorized}>
        Read Last 5 Emails
      </IonButton>
      <IonButton expand="block" onClick={handleSendEmail} disabled={!isAuthorized}>
        Send Test Email
      </IonButton>
      {emails.length > 0 && (
        <IonList>
          {emails.map((email, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{email.subject}</h2>
                <p>{email.from}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
    </IonContent>
  );
};
export default GmailComponent;