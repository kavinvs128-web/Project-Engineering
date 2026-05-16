# CredApp — Starter Repository

## Challenge: Passwords in Plain Sight

This is the starter repository for the "Passwords in Plain Sight" security challenge.

## What This App Does
CredApp is a basic authentication API. It allows users to:
- Create an account via POST /api/auth/signup
- Log in via POST /api/auth/login and receive a JWT token
- Access a protected route via GET /api/auth/profile

## Setup
1. Clone this repository
2. Copy .env.example to .env and fill in your MongoDB URI and JWT secret
3. Run: `npm install`
4. Run: `npm start`
5. The server starts at http://localhost:3000

## Your Task
1. Run the app and create a test user account
2. Open your database viewer and look at the user record you just created
3. Specifically: look at what is stored in the password field
4. Trace through the code to understand WHY this is happening
5. Fix it so passwords are never stored or compared in an unsafe way

## Endpoints
- POST /api/auth/signup — { email, password }
- POST /api/auth/login — { email, password } → returns JWT
- GET /api/auth/profile — requires Authorization: Bearer <token>

## Files to Investigate
Start your investigation with these files:
- `backend/controllers/authController.js`
- `backend/models/User.js`
