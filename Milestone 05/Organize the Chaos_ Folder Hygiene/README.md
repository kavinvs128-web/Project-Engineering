# ShopFlat - Organize the Chaos Challenge

Welcome to **ShopFlat**, a fully functional e-commerce application that has grown a bit... faster than its architecture could keep up with.

## The Challenge

Your task is to take this flat, chaotic `src/` directory and reorganize it into a clean, feature-based architecture. 

### Requirements:
1.  **Analyze the current structure**: Look at how files are related and group them into logical features (e.g., `auth`, `products`, `cart`, `orders`) and shared folders (e.g., `components`, `hooks`, `services`, `utils`).
2.  **Move the files**: Relocate every file in `src/` (except `main.jsx` and `App.jsx` if you choose) to its new home.
3.  **Fix Import Paths**: Every component, hook, and service must have its import paths updated to reflect the new structure.
4.  **Document the Change**: Create or update `STRUCTURE.md` to explain your new architecture and the reasoning behind your decisions.

## Features
-   **Auth**: Login with any email and password `pass123`.
-   **Products**: Browse a curated collection of home goods.
-   **Cart**: Add items, adjust quantities, and "checkout".
-   **Orders**: View your simulated order history.

## Tech Stack
-   React 18
-   Vite
-   Tailwind CSS
-   React Router v6
-   Lucide React (Icons)

## Getting Started
```bash
npm install
npm run dev
```

Good luck and happy organizing!
