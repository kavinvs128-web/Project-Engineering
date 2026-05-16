# FocusForge Productivity

FocusForge is a lightweight productivity application designed to help users manage their daily tasks. This repository serves as a starter project for students to explore, analyze, and improve both code architecture and product design.

---

## Features

### Task Management
- Add new tasks
- View a list of existing tasks
- Mark tasks as completed

### Motivation Mode
A built-in feature that displays random motivational quotes intended to keep users inspired while working.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js with Express
- **Database:** PostgreSQL with Prisma ORM

---

## Getting Started

### Prerequisites

Before running the project, ensure the following tools are installed:

- Node.js (v16 or higher)
- PostgreSQL running locally

---

### 1. Clone the Repository

```bash
git clone <repo-url>
cd focusforge-productivity
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies.

```bash
cd server
npm install
```

Create a `.env` file by copying `.env.example` and update the `DATABASE_URL` with your PostgreSQL credentials.

Run database migrations.

```bash
npx prisma migrate dev --name init
```

Start the backend server.

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory.

```bash
cd client
npm install
npm run dev
```

The application should now be running locally.

---

## Project Goal

FocusForge is designed to help users stay organized and productive by managing their daily tasks.

The application currently includes a feature called Motivation Mode, which displays motivational quotes in the interface.

---

## Your Challenge

During a recent product review, the team raised questions about the usefulness of the Motivation Mode feature.

Although the feature was originally introduced to encourage productivity, it is unclear whether displaying motivational quotes actually helps users manage and complete their tasks more effectively.

Your objective is to investigate the current implementation of this feature and evaluate whether it meaningfully contributes to the product's goal.

If the feature does not provide real value, consider how the application could be improved to better support focused and productive work.

Your solution should integrate with the existing codebase and improve the overall product experience without breaking the current functionality of the application.

---

## Submission Expectations

When completing this challenge, ensure that:

- The application continues to run correctly
- Any improvements integrate properly with the existing structure
- Your reasoning and changes are documented in `Changes.md`

---

## Notes

In real engineering environments, developers often inherit features that were built with good intentions but may not ultimately improve the product experience.

This challenge focuses on evaluating existing functionality and making thoughtful improvements to the product.
