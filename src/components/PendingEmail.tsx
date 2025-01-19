import React from 'react';
import { IonItem, IonLabel, IonText, IonButton, IonIcon, IonDatetimeButton, IonDatetime, IonModal } from '@ionic/react';
import { alertCircleOutline, alertOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './Response.css';

export interface ResponseProps {
  subject: string;
  shortSummary: string;
  priority: 1 | 2 | 3;
  sentTime: string;
}

const PendingEmail: React.FC<ResponseProps> = ({ subject, shortSummary, priority, sentTime }: ResponseProps) => {

  const handleSend = () => {
    // Handle the send action here
    console.log('Subject:', subject);
    console.log('Priority:', priority);
    console.log('Scheduled Send Time:', sentTime);
  };

  const getPriorityData = () => {
    switch (priority) {
      case 1:
        return {
          color: 'danger',
          icon: alertCircleOutline,
          text: "High Priority"
        }
      case 2:
        return {
          color: 'warning',
          icon: alertOutline,
          text: "Medium Priority"
        }
      case 3:
        return {
          color: 'success',
          icon: checkmarkCircleOutline,
          text: "Low Priority"
        }
    }
  };

  const priorityData = getPriorityData();

  return (
    <IonItem>  
      <IonText className="subject">{subject}</IonText>
      <IonIcon style={{ paddingLeft: '10px' }} icon={priorityData.icon} color={priorityData.color} /> 
      <IonText style={{ paddingLeft: '10px', minWidth: '150px', maxWidth: '150px' }} color={priorityData.color}>
        {priorityData.text}   
      </IonText>
      <IonDatetimeButton datetime="datetime" style={{ paddingLeft: '10px' }} disabled></IonDatetimeButton>

      <IonModal keepContentsMounted={true}>
        <IonDatetime id="datetime" value={sentTime}></IonDatetime>
      </IonModal>

      <IonText className='shortSummary'>{shortSummary}</IonText>
      <IonButton onClick={handleSend}>Send</IonButton>
    </IonItem>
  );
};

export default PendingEmail;