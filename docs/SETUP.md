# Setup

## Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL
- pgvector

You also need API credentials for:

- Google Gemini
- Adzuna

## 1. Clone the repository

```bash
git clone https://github.com/Ikerpaipai/cv-match-ai.git
cd cv-match-ai
```

## 2. Backend

Install the backend dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the required environment variables:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/cv_match_ai"

GEMINI_API_KEY="your_gemini_api_key"
GEMINI_MODEL="your_gemini_model"

ADZUNA_APP_ID="your_adzuna_app_id"
ADZUNA_APP_KEY="your_adzuna_app_key"
```

Make sure PostgreSQL is running and that the `pgvector` extension is enabled.

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Start the backend:

```bash
npm run start:dev
```

The backend will run on:

```text
http://localhost:3000
```

## 3. Frontend

Open a new terminal and go to the frontend directory:

```bash
cd cv-match-ai/frontend
npm install
```

Create a `.env` file in the `frontend` directory with the required environment variables.

Start the frontend:

```bash
npm run dev
```

Vite will display the frontend URL in the terminal.

## Project Structure

```text
cv-match-ai/
├── backend/
│   ├── prisma/
│   └── src/
├── frontend/
│   └── src/
├── docs/
│   └── SETUP.md
└── README.md
```