import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonText } from '@ionic/react';
import { db } from '../firebase/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc) {
        saveUser(user);
      }
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc) {
        saveUser(user);
      }
    } catch (error) {
      console.error('Failed to login', error);
    }
   }

   const saveUser = async (user: any) => {
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            createdAt: new Date()
        });
        history.push('/dashboard');
 }

  return (
    <IonPage style={ {display: 'flex', justifyContent: 'center', alignItems: 'center', top: '20%'} }>
      <IonText style={{ fontSize: '20px', fontWeight: 'bold' }}>Register</IonText>
      <IonContent style={{ maxWidth: '300px' }}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput style={{ marginTop: '10px' }} value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput style={{ marginTop: '10px' }} type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
        </IonItem>
        <IonButton style={{ marginTop: '10px' }} expand="full" onClick={handleRegister}>Register</IonButton>
        <IonButton style={{ marginTop: '10px' }} expand="full" onClick={handleGoogleLogin}>Sign in with Google</IonButton>
        <IonText style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Register;