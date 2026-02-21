📚 Social Saver

Social Saver is an AI-powered Telegram bot that transforms saved social media links into a searchable personal knowledge dashboard.

Users send Instagram Reels, X (Twitter) posts, or blog URLs to the bot. The system extracts metadata, understands context (including sarcasm and meme tone), categorizes the content using AI, generates a concise English summary, and stores everything in a user-isolated dashboard.

🚀 Live

Telegram Bot: https://t.me/YOUR_BOT_USERNAME

Dashboard: https://social-saver-frontend.onrender.com

🏗 System Architecture
┌─────────────────────────────┐
│        Telegram User        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│      Telegram Bot API       │
└──────────────┬──────────────┘
               │ Webhook
               ▼
┌────────────────────────────────────┐
│        Express Backend (Node)      │
│------------------------------------│
│ • Platform Detection               │
│ • Metadata Extraction (Microlink)  │
│ • AI Analysis (Gemini 2.5 Flash)   │
│ • Content Categorization           │
└──────────────┬─────────────────────┘
               │
               ▼
┌─────────────────────────────┐
│       MongoDB Atlas         │
│ • User-specific storage     │
│ • Categories & summaries    │
└──────────────┬──────────────┘
               │ REST API
               ▼
┌─────────────────────────────┐
│    React Dashboard (Vite)   │
│ • Search                    │
│ • Category Filter           │
│ • Random Discovery          │
└─────────────────────────────┘
🔄 User Flow

User opens Telegram bot

Sends /start

Sends a social media link

Backend extracts metadata

Gemini AI analyzes:

Meaning

Tone (sarcasm / satire / meme)

Category

One-line English summary

Content stored in MongoDB (isolated per Telegram user)

Bot returns:

Category

Summary

Dashboard link

User views saved content in personal dashboard

✨ Features

AI-powered content categorization

Sarcasm and meme-aware summarization

Dynamic category generation

User-isolated storage model

Search functionality

Category filtering

Random inspiration feature

Fully deployed backend and frontend

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

Gemini 2.5 Flash (Google Generative AI)

Frontend

React (Vite)

Axios

Custom CSS

Deployment

Render (Backend & Static Site)

Telegram Bot API

🔐 Data Model (MongoDB)
{
  userPhone: "telegram_chat_id",
  url: "...",
  caption: "...",
  aiSummary: "...",
  category: "...",
  image: "...",
  createdAt: ...
}

All queries are filtered by userPhone to ensure user isolation.

📦 Local Setup
Backend
npm install
npm start

Create a .env file:

MONGODB_URI=
GEMINI_API_KEY=
TELEGRAM_BOT_TOKEN=
PORT=5000
Frontend
cd client
npm install
npm run dev


📈 Future Improvements

Advanced analytics dashboard

Browser extension

WhatsApp integration

RAG-based real-time news enrichment

👨‍💻 Author

Yashwanth Kumar S B
