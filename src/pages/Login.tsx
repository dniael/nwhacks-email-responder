import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonText } from '@ionic/react';
import { auth, googleProvider } from '../firebase/firebase';
import { Link, useHistory } from 'react-router-dom';

import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <IonPage style={ {display: 'flex', justifyContent: 'center', alignItems: 'center', top: '20%'} }>
      <IonText style={{ fontSize: '20px', fontWeight: 'bold' }}>Login</IonText>
      <IonContent style={{ maxWidth: '300px' }}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput style={{ marginTop: '10px' }} value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput style={{ marginTop: '10px' }} type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        </IonItem>
        <IonButton style={{ marginTop: '10px' }} expand="full" onClick={handleLogin}>Login</IonButton>
        <IonText style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Login;