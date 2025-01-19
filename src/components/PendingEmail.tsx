import React, { useState } from "react";
import { IonButton, IonInput, IonTextarea, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { generateEmail, sendEmail } from "./services/apiServices";

const PendingEmail: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Function to generate an email using OpenAI
  const handleGenerateEmail = async () => {
    if (!userPrompt) {
      alert("Please enter a description for the email.");
      return;
    }
    setLoading(true);
    const emailResponse = await generateEmail(userPrompt);
    setGeneratedEmail(emailResponse);
    setLoading(false);
  };

  // ✅ Function to send an email using Email.js
  const handleSendEmail = async () => {
    if (!recipient || !subject || !generatedEmail) {
      alert("Please fill in all fields before sending.");
      return;
    }

    setLoading(true);
    const responseMessage = await sendEmail(recipient, subject, generatedEmail);
    alert(responseMessage);
    setLoading(false);
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AI Email Generator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Email Prompt Input */}
        <IonItem>
          <IonLabel position="stacked">Describe the Email</IonLabel>
          <IonInput value={userPrompt} onIonChange={(e) => setUserPrompt(e.detail.value!)} />
        </IonItem>

        {/* Generate Email Button */}
        <IonButton expand="full" onClick={handleGenerateEmail} disabled={loading}>
          {loading ? "Generating..." : "Generate Email"}
        </IonButton>

        {/* Recipient Email Input */}
        <IonItem>
          <IonLabel position="stacked">Recipient Email</IonLabel>
          <IonInput value={recipient} onIonChange={(e) => setRecipient(e.detail.value!)} />
        </IonItem>

        {/* Email Subject Input */}
        <IonItem>
          <IonLabel position="stacked">Email Subject</IonLabel>
          <IonInput value={subject} onIonChange={(e) => setSubject(e.detail.value!)} />
        </IonItem>

        {/* Generated Email Display */}
        <IonTextarea value={generatedEmail} readonly placeholder="Generated email will appear here" />

        {/* Send Email Button */}
        <IonButton expand="full" color="success" onClick={handleSendEmail} disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </IonButton>
      </IonContent>
    </>
  );
};

export default PendingEmail;

