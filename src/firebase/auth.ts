import { auth } from './firebase';

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    sendPasswordResetEmail,
} from 'firebase/auth';

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    return result;
}

export const doSignOut = () => {
    return auth.signOut();
}

