# Productivity Dashboard - Developer Assessment

Welcome to the Productivity Dashboard setup! You have inherited this codebase from a previous developer who left the project somewhat... unfinished. The application is meant to be a simple task and notes manager, but it is incredibly slow and quite buggy.

## Project Context
This is a MERN stack application (MongoDB, Express, React, Node). 
It technically "runs," but it suffers from severe performance bottlenecks, logical flaws, and bad React practices.

**STUDENT TASK: Do NOT fix anything initially. First measure baseline performance.**

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017

### Backend Setup
1. `cd backend`
2. `npm install`
3. `npm run dev` (Runs on port 5000)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Runs on port 3000)

## Your Mission

1. **Phase 1: Measure and Observe (Baseline)**
   - Fill out the `BASELINE.md` document completely BEFORE writing code.
   - Use the recommended tools to identify bottlenecks.
2. **Phase 2: Fix the Code**
   - Address the list of known issues mentioned in `ISSUES.md`.
   - Document the specific file and line number where you applied your fix.

### Recommended Tools
* **Postman / Thunder Client** for API testing
* **MongoDB Compass / logs** for checking queries
* **Browser DevTools (Network Tab)** for payload and request inspection
* **React DevTools Profiler** for identifying slow component renders
