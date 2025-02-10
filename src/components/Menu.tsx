import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonMenuButton,
  IonButtons,
  IonButton
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { personOutline, analyticsOutline, analyticsSharp, personSharp, bookmarkOutline} from 'ionicons/icons';
import './Menu.css';
import { auth } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    iosIcon: analyticsOutline,
    mdIcon: analyticsSharp
  },
  {
    title: 'Profile',
    url: '/profile',
    iosIcon: personOutline, 
    mdIcon: personSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  const history = useHistory();

  const handleLogout = () => {
    auth.signOut();
    history.push('/login');
    console.log('Logging out');
  }

  const { currentUser } = useAuth();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>{currentUser.email}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonButton expand="block" fill="clear" onClick={handleLogout}>Logout</IonButton>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
