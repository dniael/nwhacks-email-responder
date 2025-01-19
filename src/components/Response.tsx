import React from 'react';
import { IonItem, IonLabel, IonText, IonButton, IonIcon, IonDatetimeButton, IonDatetime, IonModal } from '@ionic/react';
import { alertCircleOutline, alertOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './Response.css';

interface ResponseProps {
  subject: string;
  response: string;
  priority: 'high' | 'medium' | 'low';
  scheduledSendTime: string;
}

const Response: React.FC<ResponseProps> = ({ subject, response, priority, scheduledSendTime }: ResponseProps) => {

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
    <IonItem className='response'>  
      <IonText>{subject}</IonText>
      {getPriorityIcon()}
      <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

      <IonModal keepContentsMounted={true}>
        <IonDatetime id="datetime"></IonDatetime>
      </IonModal>

      {/* <IonButton onClick={handleSend}>Send</IonButton> */}
    </IonItem>
  );
};

export default Response;