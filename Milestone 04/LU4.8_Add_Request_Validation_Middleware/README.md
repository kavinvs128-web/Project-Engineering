# LU 4.8 — Add Request Validation Middleware

The API currently accepts any request body on `POST /users` — no validation, no checks, no rejection. Bad data passes through the controller and reaches the service layer. Your job is to add validation middleware to stop it.

## Setup instructions
```bash
# 1. Clone the repository
git clone <YOUR_REPO_LINK_HERE>

# 2. Navigate into the folder
cd <YOUR_FOLDER_NAME_HERE>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

## What you need to do

**Task 1:** Update `src/middleware/validateUser.middleware.js` to enforce all 10 rules below. Return `400 Bad Request` if any fail. (You may use Zod, Joi, or Manual JS).

| Rule | Description |
|------|-------------|
| R01 | **Presence:** `username`, `email`, `password`, `age`, and `role` are required. |
| R02 | **Length:** `username` (3-30 chars), `password` (min 6 chars). |
| R03 | **Email:** Must be a valid email format. |
| R04 | **Age Type:** Must be a number (not a string). |
| R05 | **Age Limit:** Minimum value of 18. |
| R06 | **Role Enum:** Must be exactly `"user"` or `"admin"`. |
| R07 | **Website:** Optional, but if provided, must be a valid URL. |
| R08 | **Trim:** Strip leading/trailing spaces from `username` and `email`. |
| R09 | **Lowercase:** Convert `email` to lowercase (e.g., USER@MAIL.COM -> user@mail.com). |
| R10 | **Password Complexity:** Must contain at least 1 letter and 1 number. |

**Task 2:** Update `src/routes/user.routes.js` to inject the middleware before the controller: `router.post('/', validateUser, userController.createUser);`

## The Proof Mechanism
`src/services/user.service.js` logs `DATABASE HIT: Creating user...` every time it is called.
- Send an **invalid** request: the log must **not** appear.
- Send a **valid** request: the log **must** appear, and the data logged should be trimmed and lowercased!