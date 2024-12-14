# Friend AI using OpenAI and Vector Database

## Introduction
This project demonstrates how to integrate the OpenAI API, vector databases, Firebase and the WhatsApp API to create an interactive AI friend. The AI friend can send and receive messages via WhatsApp, making it a practical and engaging way to interact with artificial intelligence.

---

## Features
- **OpenAI Integration**: Leverages GPT models to process and generate conversational responses.
- **Vector Database**: Used to store and retrieve contextual data to provide more accurate and personalized AI responses.
- **WhatsApp API**: Allows sending and receiving messages through WhatsApp.
- **Firebase**: Firestore is used to store message history and deploy to functions to bring the API online.

---

## Prerequisites
Before using this project, ensure you have:
1. A **Firebase account** with Firestore and Firebase Functions enabled.
2. An **OpenAI API Key**.
3. Access to the **WhatsApp Business API** for message handling.
4. A **Pinecone account** with an index created called "conversations".

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/JonathanOrozcoCervantes/friendAiExample.git
cd friendAiExample
cd server
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set variables
1. Set all the necessary variables from the serviceAccountKey.js, Open AI, WhatsApp and Pinecone in the server/config/settings.js file.
2.  Set all your firebase secrets in firebase.js file.

### 4. Run Locally
Remember to be in the server folder
```bash
node index.js
```
If you have not yet configured your Webhook and your Function in Firebase, you can simulate a conversation by calling your endpoint directly as if the WhatsApp Webhook was doing it. Example:
```bash
POST http://localhost:[port]/webhook/whatsapp-business

raw:

{
    "object": "whatsapp_business_account",
    "entry": [
      {
        "id": "123456",
        "changes": [
          {
            "value": {
              "messaging_product": "whatsapp",
              "metadata": {
                "display_phone_number": "",
                "phone_number_id": ""
              },
              "contacts": [
                {
                  "profile": {
                    "name": "Example"
                  },
                  "wa_id": ""
                }
              ],
              "messages": [
                {
                  "from": "",
                  "id": "wamid.12345dIYFgfDAQfTZFQzZCAA==",
                  "timestamp": "1730856090",
                  "text": {
                    "body": "Hello"
                  },
                  "type": "text"
                }
              ]
            },
            "field": "messages"
          }
        ]
      }
    ]
  }
```

Remember to fill in your values in the fields:
1. display_phone_number: The phone number of the bot (the country code is added to it, e.g. 1 → Country code for USA or Canada, 1555...).
2. phone_number_id: Bot's phone number ID
3. wa_id and from: The user's phone number in international E.164 format (the country code is added, and in some cases an additional prefix, such as 1 for mobile numbers in Mexico, 52133...).
4. messages -> id: Each message must have a different wamid.


### LinkedIn article
https://www.linkedin.com/pulse/friend-ai-using-openai-vector-database-jonathan-orozco-cervantes-clbmc/