import React from 'react';
import { IonItem, IonLabel, IonText, IonButton, IonIcon, IonDatetime } from '@ionic/react';
import { alertCircleOutline, alertOutline, checkmarkCircleOutline } from 'ionicons/icons';

interface ResponseProps {
  subject: string;
  priority: 'high' | 'medium' | 'low';
  scheduledSendTime: string;
}

const Response: React.FC<ResponseProps> = ({ subject, priority, scheduledSendTime }: ResponseProps) => {

  const handleSend = () => {
    // Handle the send action here
    console.log('Subject:', subject);
    console.log('Priority:', priority);
    console.log('Scheduled Send Time:', scheduledSendTime);
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case 'high':
        return <IonIcon icon={alertCircleOutline} color="danger" />;
      case 'medium':
        return <IonIcon icon={alertOutline} color="warning" />;
      case 'low':
        return <IonIcon icon={checkmarkCircleOutline} color="success" />;
      default:
        return null;
    }
  };

  return (
    <IonItem style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <IonText>{subject}</IonText>
      {getPriorityIcon()}
      <IonDatetime value={scheduledSendTime} disabled />
      <IonButton onClick={handleSend}>Send</IonButton>
    </IonItem>
  );
};

export default Response;