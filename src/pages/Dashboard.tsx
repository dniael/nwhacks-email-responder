import { IonSelect, IonSelectOption, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import PendingEmail from '../components/PendingEmail';
import './Dashboard.css';
import { auth } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ResponseProps } from '../components/PendingEmail';
import { useState } from 'react';


const sampleData: ResponseProps[] = [
  {
    subject: 'Meeting with team',
    shortSummary: 'Discuss project updates and next steps.',
    priority: 1,
    sentTime: new Date().toISOString()
  },
  {
    subject: 'Project deadline',
    shortSummary: 'Finalize and submit the project deliverables.',
    priority: 2,
    sentTime: new Date().toISOString()
  },
  {
    subject: 'Client follow-up',
    shortSummary: 'Follow up with the client regarding feedback.',
    priority: 3,
    sentTime: new Date().toISOString()
  },
  {
    subject: 'Weekly report',
    shortSummary: 'Prepare and send the weekly progress report.',
    priority: 1,
    sentTime: new Date().toISOString()
  },
  {
    subject: 'Code review',
    shortSummary: 'Review the code changes and provide feedback.',
    priority: 2,
    sentTime: new Date().toISOString()
  }
];

const Dashboard: React.FC = () => {

  const name = "Dashboard";

  const [data, setData] = useState<ResponseProps[]>(sampleData);

  const compareNumbers = (a: ResponseProps, b: ResponseProps) => {
    return a.priority - b.priority;
  }

  const compareDates = (a: ResponseProps, b: ResponseProps) => {
    return new Date(a.sentTime).getTime() - new Date(b.sentTime).getTime();
  }

  const selectHandler = (event: any) => {
    const dataCopy = data;
    const compareFunction = event.detail.value;
    setData(dataCopy.sort((a, b) => compareFunction(a,b)));
    console.log(dataCopy);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonSelect style={{ marginRight: '10px' }} slot="end" placeholder="Sort By" onChange={e => selectHandler(e)}>
            <IonSelectOption value={compareNumbers}>Ascending Priority</IonSelectOption>
            <IonSelectOption value={compareDates}>Ascending Date</IonSelectOption>
        </IonSelect>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {sampleData.map((data, index) => (
          <PendingEmail key={index} {...data} />
        ))}
      </IonContent>  
    </IonPage>
  );
};

export default Dashboard;
