# CorpAuth — Auth Response Challenge

## What This Is
CorpAuth is a working Node.js auth API. Users can sign up, log in, and fetch their profile. The API is functionally correct and supports user registration, authentication via JWT, and profile retrieval.

**However, the API is not secure.** Your job is not to fix what is broken functionally — it is to find and fix what is **over-exposed** in the responses.

---

## Getting Started

1.  **Install dependencies**
    ```bash
    npm install
    ```

2.  **Configure environment variables**
    ```bash
    cp .env.example .env
    ```
    *   Add your PostgreSQL connection string (`DATABASE_URL`) and `JWT_SECRET` to `.env`.

3.  **Setup the database**
    ```bash
    psql -d your_db -f db/schema.sql
    psql -d your_db -f db/seed.sql
    ```

4.  **Start the server**
    ```bash
    npm start
    ```

---

## Endpoints

- `POST /auth/signup` — body: `{ name, email, password }`
- `POST /auth/login` — body: `{ email, password }`
- `GET /auth/me` — header: `Authorization: Bearer <token>`

---

## Test Credentials (from seed)

- **Admin**: `admin@corpauth.dev` / `password123`
- **Manager**: `manager@corpauth.dev` / `password123`
- **User**: `user@corpauth.dev` / `password123`

---

## Your Task
1.  **Read every file**: Inspect the codebase to understand how responses are being handled.
2.  **Try every endpoint**: Use a tool like Postman, Insomnia, or `curl` to test the routes.
3.  **Inspect every response**: Look closely at the JSON bodies and the JWT contents (use [jwt.io](https://jwt.io)).
4.  **Document your findings**: Before writing a single line of code, create a file named `Changes.md` and list every field that should not be in a response and explain **why** it is a security risk.
5.  **Remediate**: Fix the code to ensure data exposures are eliminated while keeping the app functional.

---

## Rules
- `Changes.md` must be committed **before** any code changes are implemented.
- The solution branch must be named `challenge-solution`.
- The application must remain fully functional after your security fixes.
- Deploy your fixed app to a live URL (e.g., Render, Fly.io, or Railway) before submitting.

---

## Submission
- Provide the Pull Request (PR) link from your `challenge-solution` branch to `main`.
- Include a video link demonstrating the audit process and the final secure responses.
