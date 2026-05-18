# Changes

## 1. What I Found

- The signup flow accepted `email` and `password` from the request body and created a new user record in MongoDB without hashing the password.
- The login flow retrieved the stored user record and compared the submitted password to the stored password using a direct string comparison.
- The `User` model stored `password` as a plain `String` field with no `select: false` guard and no Mongoose pre-save hook.
- The project did not include or use `bcryptjs` anywhere prior to the fix.

## 2. Root Cause

- Passwords were persisted directly from `req.body.password` into the database rather than being transformed into a secure hash first.
- Authentication used raw string equality (`user.password !== password`) instead of a cryptographic password verification function.
- The schema did not implement defensive controls for sensitive data, so password attributes were available for selection by default.

## 3. Why This Is Dangerous

- Storing passwords in plain text exposes every user credential to disclosure if the database is accessed by an attacker, a rogue administrator, or through a backup leak.
- Direct string comparison of passwords assumes the database contains plain-text secrets and prevents the system from using hashing algorithms designed to mitigate offline credential cracking.
- Absence of schema-level protections increases the likelihood that password fields could be inadvertently returned by queries or logs.
- These weaknesses together create a high-risk authentication failure mode, enabling account takeover and credential reuse attacks.

## 4. Checkpoint 1 — Signup

- Identified in `backend/controllers/authController.js` at the signup controller.
- The signup route accepted `password` and passed it directly to `User.create()`.
- This violated secure password handling requirements by saving the raw credential to the database.

## 5. Checkpoint 2 — Database Record

- The `User` model in `backend/models/User.js` defined the password field as a plain string.
- There was no `select: false`, no minimum length enforcement, and no pre-save hook to hash passwords automatically.
- As a result, stored password values were not protected at the schema level.

## 6. Checkpoint 3 — Login Comparison

- The login controller in `backend/controllers/authController.js` used `if (user.password !== password)`.
- This comparison is only valid for plain-text passwords and does not provide cryptographic verification.
- It also means the authentication path could not support hashed password storage.

## 7. Checkpoint 4 — User Model

- `backend/models/User.js` lacked any Mongoose pre-save hook for password hashing.
- It also lacked `select: false` for the `password` property, leaving the field exposed to normal queries.

## 8. What I Fixed

- Installed `bcryptjs` and imported it in `backend/controllers/authController.js`.
- Updated the signup flow to hash incoming passwords with `bcrypt.hash(password, 10)` before creating the user record.
- Updated the login flow to use `bcrypt.compare(password, user.password)` for secure password verification.
- Left existing JWT issuance logic intact so the current route behavior remains consistent.

## 9. Verification

- Verified that `package.json` now includes `bcryptjs` as a dependency.
- Verified that `backend/controllers/authController.js` hashes passwords before saving and compares them with `bcrypt.compare()` during login.
- Confirmed that JWT generation using `jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })` was not modified.
