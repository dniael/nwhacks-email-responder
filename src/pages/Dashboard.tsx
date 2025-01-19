import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import PendingEmail from '../components/PendingEmail';
import './Dashboard.css';

const Dashboard: React.FC = () => {

  const name = "Dashboard";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PendingEmail subject="Hello, World!" shortSummary='sample response' priority={1} scheduledSendTime="2022-01-01T00:00:00.000Z" />
        <PendingEmail subject="Test1!" shortSummary='sample response' priority={2} scheduledSendTime="2022-01-01T00:00:00.000Z" />
        <PendingEmail subject="Test2!" shortSummary='sample response' priority={3} scheduledSendTime="2022-01-01T00:00:00.000Z" />
      </IonContent>  
    </IonPage>
  );
};

export default Dashboard;
