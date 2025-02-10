import { useState, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonAvatar,
  IonInput,
} from "@ionic/react";

const Profile: React.FC = () => {
  // ✅ Store profile name & email in localStorage
  const [name, setName] = useState(localStorage.getItem("USER_NAME") || "Your Name");
  const [email, setEmail] = useState(localStorage.getItem("USER_EMAIL") || "example@example.com");
  const [editing, setEditing] = useState(false);

  // ✅ Save changes when user updates
  const handleSave = () => {
    localStorage.setItem("USER_NAME", name);
    localStorage.setItem("USER_EMAIL", email);
    alert("Profile updated!");
    setEditing(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            {/* ✅ Hardcoded Profile Picture */}
            <IonItem lines="none">
              <IonAvatar slot="start">
                <img src="https://www.gravatar.com/avatar/?d=mp" alt="Profile" />
              </IonAvatar>
              <IonLabel>
                <h2>{name}</h2>
                <p>{email}</p>
              </IonLabel>
            </IonItem>

            {/* ✅ Editable Name & Email */}
            {editing ? (
              <>
                <IonItem>
                  <IonLabel position="stacked">Name</IonLabel>
                  <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                </IonItem>

                <IonButton expand="full" color="primary" onClick={handleSave}>
                  Save Changes
                </IonButton>
              </>
            ) : (
              <IonButton expand="full" color="tertiary" onClick={() => setEditing(true)}>
                Edit Profile
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
