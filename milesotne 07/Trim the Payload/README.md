# 🚀 Fragments Performance Challenge

Welcome to the **Fragments Performance Challenge**. You have been handed a "finished" dashboard that looks professional but is suffering from catastrophic performance issues.

Your mission is to identify, document, and fix **five major performance bottlenecks** that are currently preventing this app from scaling.

---

### 🕵️‍♂️ The Scenario
The company just launched this dashboard. It worked fine with 5 orders, but now that we have 500 orders, the server is "freezing," the database is under heavy load, and the frontend payload is massive.

### 🎯 Your Objectives
Identify and resolve the following five issues:
1.  **Over-fetching (Columns)**: The server returns data that the UI never displays.
2.  **N+1 Query Issue**: The server is firing thousands of database queries instead of using joins.
3.  **Missing Pagination**: Loading all 500+ records at once is killing the network.
4.  **No Compression**: The network transfer protocol is not optimized.
5.  **Event Loop Blocking**: Synchronous "blocking" code is bottlenecking the server response.

---

### 🛠️ Setup Instructions

#### **1. Backend (Server)**
1.  Navigate to `server/`
2.  `npm install`
3.  Create a `.env` file with: `DATABASE_URL="file:./dev.db"`
4.  `npx prisma db push` (Initialize database)
5.  `npm run seed` (Generate 500 test orders)
6.  `npm run dev` (Starts on port 3001)

#### **2. Frontend (Client)**
1.  Navigate to `client/`
2.  `npm install`
3.  `npm run dev` (Starts on port 5173)

---

### ✅ Success Criteria
- Payload size must drop from **~1.5 MB** to under **~50 KB** for the initial load.
- Server response time (TTFB) must drop from **~2s** to under **100ms**.
- Database queries per request must drop from **1,000+** to **1**.
- The UI should implement a "Load More" or pagination system.
