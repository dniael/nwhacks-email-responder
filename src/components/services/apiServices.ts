import axios from "axios";
import emailjs from "emailjs-com";

// ✅ Function to get OpenAI API Key from localStorage
const getApiKey = () => localStorage.getItem("OPENAI_API_KEY") || "";

// ✅ Function to generate email using OpenAI API
export const generateEmail = async (userPrompt: string) => {
  const OPENAI_API_KEY = getApiKey(); // Fetch API Key before request

  if (!OPENAI_API_KEY) {
    return "Error: No OpenAI API Key found. Please update it in your profile.";
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-4o",
        prompt: `Write a professional email about: ${userPrompt}`,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating email:", error);
    return "Error generating email. Please try again.";
  }
};

// ✅ Function to send email using Email.js
export const sendEmail = async (recipient: string, subject: string, emailContent: string) => {
  try {
    const response = await emailjs.send(
      "your_service_id",
      "your_template_id",
      {
        to_email: recipient,
        subject: subject,
        message: emailContent,
      },
      "your_user_id"
    );

    return "Email sent successfully!";
  } catch (error) {
    console.error("Error sending email:", error);
    return "Error sending email. Please try again.";
  }
};
