# NoteSnap

NoteSnap is a simple study-note summarisation tool that uses AI to condense your notes into key concepts.

## Setup Instructions

Follow these steps to get the project running locally:

### 1. Root Dependencies
Run this in the root folder:
```bash
npm install
```

### 2. Backend Dependencies
Navigate to the `backend/` folder and install dependencies:
```bash
cd backend
npm install
```

### 3. Environment Variable
Create a `.env` file in the root directory and add your OpenAI API key:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the Application
From the root directory, start the development server:
```bash
npm run dev
```

The app should now be running on [http://localhost:5173](http://localhost:5173).
