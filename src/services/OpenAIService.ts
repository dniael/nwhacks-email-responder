import axios from "axios";

export class OpenAIService {
    private static API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Move key to environment variable
  
    public static async generateEmailResponse(emailContent: { subject: string; from: string }): Promise<string> {
      try {
        const prompt = `Please write a professional response to an email with subject: "${emailContent.subject}" from: "${emailContent.from}". The response should be polite and professional.`;
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              { role: "system", content: "You are an AI email assistant. Write a professional response based on the given email." },
              { role: "user", content: prompt }
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        });
  
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error("Error generating email response:", error);
        throw new Error("Failed to generate email response");
      }
    }
  }
  