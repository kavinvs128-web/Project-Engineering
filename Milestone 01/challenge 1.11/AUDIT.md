# Pre-Refactor Audit

## 1. Poor Variable Naming
- Variable `d` is unclear (used for request body)
- Variable `r` is unclear (used for request params)
- Variable `x` is unclear (used as counter)
- Variable `tmp` is not descriptive
- Variable `arr` is vague and does not explain content

## 2. Monolithic Function
- Function `handleAll()` does too many things:
  - Handles request routing (create, getAll)
  - Validates input
  - Creates data
  - Pushes to array
  - Sends response
- Violates single responsibility principle

## 3. No Separation of Concerns
- Entire app logic is in one file (`app.js`)
- No MVC structure (routes, controllers, services missing)

## 4. Hardcoded Values
- Categories array is hardcoded inside function
- Max text length (500) is hardcoded

## 5. Deep Nested Conditions
- Too many nested `if` statements make code hard to read and maintain

## 6. Inconsistent Error Handling
- Sometimes uses `.json()`, sometimes `.send()`
- Error messages are inconsistent

## 7. No Comments
- No explanation of why logic exists

## 8. Business Logic Inside Route Handler
- Data creation and validation directly inside request handler

## 9. Global Mutable State
- `confessions` array and `x` counter are global variables

## 10. Magic Strings
- "create", "getAll" used directly instead of constants
