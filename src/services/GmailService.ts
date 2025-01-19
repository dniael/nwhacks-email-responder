// src/services/GmailService.ts

export class GmailService {
    private static CLIENT_ID = '922010715057-5o8kb846vdoq363ufarr08u551ajc3hs.apps.googleusercontent.com';
    private static API_KEY = 'AIzaSyCg6YtAwjfN9RgyTugHHQPW1zQLyOlle1o';
    private static DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
    private static SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose';
  
    private tokenClient: any;
    private gapiInited: boolean = false;
    private gisInited: boolean = false;
  
    constructor() {
      this.initializeGAPI();
      this.initializeGIS();
    }
  
    private initializeGAPI() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        (window as any).gapi.load('client', this.initializeGapiClient.bind(this));
      };
      document.body.appendChild(script);
    }
  
    private initializeGIS() {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        this.initializeTokenClient();
      };
      document.body.appendChild(script);
    }
  
    private async initializeGapiClient() {
      await (window as any).gapi.client.init({
        apiKey: GmailService.API_KEY,
        discoveryDocs: [GmailService.DISCOVERY_DOC],
      });
      this.gapiInited = true;
    }
  
    private initializeTokenClient() {
      this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: GmailService.CLIENT_ID,
        scope: GmailService.SCOPES,
        callback: '', // Will be set during auth
      });
      this.gisInited = true;
    }
  
    public async handleAuth(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (!this.gapiInited || !this.gisInited) {
          reject(new Error('Gmail API not initialized'));
          return;
        }
  
        this.tokenClient.callback = async (resp: any) => {
          if (resp.error !== undefined) {
            reject(resp);
            return;
          }
          resolve();
        };
  
        if ((window as any).gapi.client.getToken() === null) {
          this.tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
          this.tokenClient.requestAccessToken({ prompt: '' });
        }
      });
    }
  
    public async handleSignout(): Promise<void> {
      const token = (window as any).gapi.client.getToken();
      if (token !== null) {
        (window as any).google.accounts.oauth2.revoke(token.access_token);
        (window as any).gapi.client.setToken('');
      }
    }
  
    public async readLastNEmails(n: number): Promise<Array<{ from: string; subject: string }>> {
      const response = await (window as any).gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: n,
      });
  
      const messages = response.result.messages;
      if (!messages || messages.length === 0) {
        return [];
      }
  
      const emailPromises = messages.map((message: any) =>
        (window as any).gapi.client.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        })
      );
  
      const emailDetails = await Promise.all(emailPromises);
      return emailDetails.map((email: any) => {
        const headers = email.result.payload.headers;
        return {
          subject: headers.find((h: any) => h.name === 'Subject')?.value || '(No Subject)',
          from: headers.find((h: any) => h.name === 'From')?.value || '(Unknown Sender)',
        };
      });
    }
  
    public async sendEmail(to: string, subject: string, body: string): Promise<void> {
      const email = [
        `To: ${to}`,
        'From: me',
        `Subject: ${subject}`,
        '',
        body,
      ].join('\r\n');
  
      const base64EncodedEmail = btoa(email)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
  
      await (window as any).gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: base64EncodedEmail,
        },
      });
    }
  }
  
  export const gmailService = new GmailService();