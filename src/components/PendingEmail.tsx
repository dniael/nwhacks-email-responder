import React from 'react';
import { IonItem, IonLabel, IonText, IonButton, IonIcon, IonDatetimeButton, IonDatetime, IonModal } from '@ionic/react';
import { alertCircleOutline, alertOutline, checkmarkCircleOutline } from 'ionicons/icons';
import './Response.css';

interface ResponseProps {
  subject: string;
  shortSummary: string;
  priority: 1 | 2 | 3;
  scheduledSendTime: string;
}

const PendingEmail: React.FC<ResponseProps> = ({ subject, shortSummary, priority, scheduledSendTime }: ResponseProps) => {

  const handleSend = () => {
    // Handle the send action here
    console.log('Subject:', subject);
    console.log('Priority:', priority);
    console.log('Scheduled Send Time:', scheduledSendTime);
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
      <IonText style={{ minWidth: '100px', maxWidth: '100px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{subject}</IonText>
      <IonIcon style={{ paddingLeft: '10px' }} icon={priorityData.icon} color={priorityData.color} /> 
      <IonText style={{ paddingLeft: '10px', minWidth: '150px', maxWidth: '150px' }} color={priorityData.color}>
        {priorityData.text}   
      </IonText>
      <IonDatetimeButton datetime="datetime" style={{ paddingLeft: '10px' }}></IonDatetimeButton>

      <IonModal keepContentsMounted={true}>
        <IonDatetime id="datetime" value={scheduledSendTime}></IonDatetime>
      </IonModal>

      <IonText style={{ minWidth: '100px', maxWidth: '100px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}></IonText>
      <IonButton onClick={handleSend}>Send</IonButton>
    </IonItem>
  );
};

export default PendingEmail;