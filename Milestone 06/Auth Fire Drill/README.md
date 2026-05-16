# Fragments - Secure Storytelling Challenge (Starter)

Welcome to the **Fragments** platform! This is a collaborative storytelling application where users can share snippets of stories. 

**However, the security of this platform is fundamentally broken.** 

Your mission as a security engineer is to identify, document, and fix six critical vulnerabilities in this codebase.

## Project Structure
- **/client**: A React frontend built with Vanilla CSS.
- **/server**: A Node.js/Express backend that handles data and authentication.

## Your Task
1.  **Identify the Flaws**: Search for comments tagged with `// BROKEN PART`.
2.  **Fix the Backend**: Ensure that security is enforced at every API layer, not just the frontend.
3.  **Document Your Fixes**: You **MUST** update the `changes.md` file in the root of the project with a detailed description of every fix you implement.

## 🕵️ Hints & Target Areas
- **JWT Security**: Look at how tokens are signed and verified in `server/auth/jwt.js`. Are they secure? Do they ever expire?
- **Session Management**: What happens when a user logs out? Does the server know? Try using the token after logging out.
- **Role-Based Access Control (RBAC)**: Check if a "Contributor" can use an Admin's tools by manually sending an API request.
- **Ownership (IDOR)**: Can user "A" edit a fragment created by user "B"? Check the logic in `server/routes/fragments.js`.
- **Middleware Gaps**: Does the authentication middleware provide enough information for other parts of the app to make security decisions?

## How to Run
1.  **Setup Server**: `cd server && npm install && npm start`
2.  **Setup Client**: `cd client && npm install && npm run dev`

---
> [!IMPORTANT]
> A simple "it works on my machine" is not enough. Your fixes must survive automated security scripts that bypass the UI entirely. Remember to update `changes.md` with your solutions!
