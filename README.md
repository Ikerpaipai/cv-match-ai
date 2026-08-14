# AI-Powered CV & Job Matching Platform

A full-stack application that uses AI to analyze CVs and job offers, then identify and rank the most relevant opportunities for a candidate.

The project combines **LLM-based information extraction**, **semantic similarity** and **rule-based scoring** to create a more relevant job matching system.

## Overview

Finding relevant job opportunities can be time-consuming when manually comparing a candidate's experience and skills with hundreds of job descriptions.

This application automates part of this process. A candidate can upload their CV, which is analyzed to extract:

- Job title
- Technical skills
- Professional experience

Job offers are also analyzed to extract their requirements. The application then compares the candidate profile with available opportunities using **semantic similarity** and **structured matching criteria**.

The result is a ranked list of job opportunities based on their compatibility with the candidate.

## How It Works

```text
                    Candidate CV
                         │
                         ▼
                    PDF Analysis
                         │
                         ▼
                Candidate Profile
              ┌──────────┼──────────┐
              ▼          ▼          ▼
            Title      Skills   Experience
              │          │          │
              └──────────┼──────────┘
                         ▼
                     Embedding
                         │
                         ▼
                   Vector Search
                         │
                         ▼
                  Relevant Jobs
                         │
                         ▼
                   Gemini Analysis
                         │
                         ▼
                Compatibility Score
                         │
                         ▼
                 Ranked Opportunities
```

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, TanStack Query
- **Backend:** NestJS, TypeScript, Prisma
- **Database:** PostgreSQL
- **AI:** Google Gemini, embeddings, vector search