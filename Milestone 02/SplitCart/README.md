# SplitCart Prototype

SplitCart is a prototype application designed to help roommates split grocery or food delivery expenses.

Users can add items to a shared cart and divide the total bill equally between participants.

---

## Features

The current prototype allows users to:

- Add items to a shared cart
- View the total cart value
- Split the bill among participants
- Confirm payment shares
- Remove items from the cart

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start backend:

```bash
node server/index.js
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

http://localhost:5173

---

## Engineering Investigation

This prototype was developed quickly during early product development.

The engineering team suspects that the system behavior may not always match the intended product logic.

Your task is to run the application and explore how the cart behaves when multiple participants interact with it.

Pay attention to how:

- cart totals behave
- payments are calculated
- cart items are modified

Document any inconsistencies you observe.

These observations will help define the acceptance criteria that should govern the product.
