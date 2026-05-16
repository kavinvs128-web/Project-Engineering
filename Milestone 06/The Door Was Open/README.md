# Challenge 7: The Door Was Open

## Objective
A security audit has revealed several private routes in our system with no authentication middleware applied. While we have a robust `middleware/authenticate.js` written, it's never been used across our routes.

Your mission is to:
1.  **Audit the Application:** Identify every route that should be private.
2.  **Apply Protection:** Use the existing `authenticate` middleware to secure only the private routes.
3.  **Ensure Service Availability:** Ensure public routes (like login, register, and health checks) remain accessible without a token.
4.  **Document the Investigation:** Fill out `CHANGES.md` with your findings and evidence of your fixes.

## Project Structure
- `server.js`: Main Express application.
- `middleware/authenticate.js`: Middleware logic for JWT verification.
- `routes/`: Folder containing various route definitions.
- `CHANGES.md`: Your report on the security audit and fixes.

## Instructions
1.  **Auditing (Investigation):** Test the API endpoints before making any changes. Use tools like Postman, Thunder Client, or cURL to confirm which routes return data despite not having an authentication token. Record these in the **Investigation** section of `CHANGES.md`.
2.  **The Fix:** Go through each route file in the `routes/` directory and apply the `authenticate` middleware as the second argument in the route definition where appropriate Header.
    - Example: `router.get('/profile', authenticate, controller.handler)`
3.  **Verification:** After applying the middleware, test the endpoints again. Private routes should now return a `401 Unauthorized` response when no valid token is provided. Confirm that public routes still behave as expected. Document this in the **Verification** section of `CHANGES.md`.

## Setup
1.  Install dependencies: `npm install`
2.  Set up your `.env` file with `JWT_SECRET`.
3.  Start the server: `npm run dev`

Good luck!
