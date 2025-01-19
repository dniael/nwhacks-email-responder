import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import Response from '../components/Response';
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
        <Response subject="Hello, World!" response='sample response' priority="high" scheduledSendTime="2022-01-01T00:00:00.000Z" />
      </IonContent>  
    </IonPage>
  );
};

export default Dashboard;
