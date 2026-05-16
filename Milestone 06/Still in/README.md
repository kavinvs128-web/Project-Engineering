# Still In? – Polling App (Expired Access Handling Challenge)

Welcome to the **Still In?** polling app. This is a debugging challenge focused on authentication, backend logic, and frontend resource management.

## Scenario

The app allows users to signup, login, and vote on a public poll. However, there are several foundational bugs that make the app unreliable, especially regarding user sessions and voting integrity.

### 🕵️‍♂️ Known Issues (The Challenge)

#### 1. The "Generic 500" Mystery
- **The Issue**: When your login token expires (after 60 seconds), the backend starts throwing errors. Instead of telling the frontend your session is over (`401`), it reports a generic server error (`500`).
- **🔍 How to Check**: 
    1. Log in and wait for **1 minute**.
    2. Try to cast a vote.
    3. Open the **Network Tab** in DevTools. Look at the status code of the failed `POST /api/vote` request.

#### 2. The "Infinite Vote" Bug
- **The Issue**: The app is supposed to allow only **one vote per person**. Currently, a user can vote as many times as they want for the same option.
- **🔍 How to Check**: 
    1. Log in and vote for an option.
    2. Click the vote button again immediately. 
    3. Does it succeed? It shouldn't! Look at the comparison logic in `server/routes/poll.js`.

#### 3. The "Zombie" Polling Loop
- **The Issue**: The Dashboard fetches the latest poll results every 10 seconds. When the session expires, these requests start failing, but they **never stop firing**.
- **🔍 How to Check**: 
    1. Log in and wait until the token expires (1 minute).
    2. sit idle on the Dashboard and watch the **Network Tab**.
    3. Notice a new failing request to `/api/poll` every 10 seconds. This is a massive resource leak!

#### 4. Missing Global "Bouncer" (Interceptor)
- **The Issue**: The frontend has no central way to handle authentication failures. Even if the server says "Token Expired", the UI doesn't know how to log the user out automatically.
- **🔍 How to Check**: Check `client/src/api/client.js`. Is there anything handling failed responses globally?

---

## 🛠️ Your Task

Fix the backend status codes and implement a robust frontend cleanup system:

1.  **Fix Backend Logic**:
    - Update `server/middleware/auth.js` to return `401` specifically for `TokenExpiredError`.
    - Fix the duplicate vote check in `server/routes/poll.js` (hint: check your data types!).
2.  **Implement Axios Interceptor**:
    - Add a response interceptor in `client/src/api/client.js` to catch `401` errors and clear local storage.
3.  **Kill the Zombies**:
    - Update `client/src/pages/Dashboard.jsx` to clear the `setInterval` and redirect to `/login` as soon as an authentication failure occurs.

---

## 🚀 Getting Started

```bash
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

Record your investigation and fix process in `Changes.md`. Good luck!
