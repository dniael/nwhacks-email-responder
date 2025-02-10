# SmartReplay AI

## Overview

SmartReply AI is a web application that allows users to log in, store their data securely, and manage their Gmail inbox through an intuitive dashboard. The application integrates with Firebase for authentication and data storage, the Gmail API for reading and managing emails, and AI-powered tools to generate smart responses to emails. This project is designed to streamline email management and enhance productivity by automating repetitive tasks.

---

## Features

- **User Authentication**:

  - Secure login and registration using Firebase Authentication.
  - Support for email/password and Google Sign-In.

- **Data Storage**:

  - Store user preferences, settings, and other data securely using Firebase Firestore.

- **Gmail Integration**:

  - Connect to the Gmail API to fetch and display emails in a user-friendly dashboard.
  - View, sort, and filter emails by labels, categories, or keywords.

- **AI-Powered Email Responses**:

  - Use AI models to generate context-aware email responses.
  - Customize and send AI-generated replies directly from the dashboard.

- **Dashboard**:

  - Centralized view of all emails with quick actions (reply, compose).

- **Security**:
  - All data is encrypted and securely stored in Firebase.
  - OAuth 2.0 used for Gmail API access to ensure user data privacy.

---

## Technologies Used

- **Frontend**: React.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication, OAuth 2.0
- **APIs**: Gmail API, OpenAI API

---

## Prerequisites

Before running the project, ensure you have the following:

1. **Node.js** and **npm** installed on your machine.
2. A **Firebase project** set up with Firestore and Authentication enabled.
3. **Gmail API credentials** from the Google Cloud Console.
4. An **API key** from an AI service like OpenAI for generating email responses.

---
