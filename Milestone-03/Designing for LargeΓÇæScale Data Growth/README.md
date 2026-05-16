# TrackFlow API

TrackFlow is a high-performance event tracking and analytics API designed for early-stage startups. It provides a simple, robust interface for logging user interactions, managing sessions, and generating aggregate metrics.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and configure your database URL:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/trackflow
   ```
4. Initialize the database schema:
   ```bash
   psql -d trackflow -f schema.sql
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Events
- `POST /events` - Ingest a new event.
- `GET /events?user_id={id}` - Get recent events for a user.

### Sessions
- `POST /sessions/start` - Start a new user session.
- `GET /sessions/active` - List all currently active sessions.

### Metrics
- `GET /metrics/monthly` - Get event type distribution for the last 30 days.
- `POST /metrics/feature-usage` - Log a specific feature interaction.

## Growth Context

Students should use the following data points for their projections and architectural proposals:

- **Current active users:** 50,000
- **Average events per user per day:** 200
- **Daily event row growth:** 10,000,000 rows/day
- **Current events table size:** 45,000,000 rows (4.5 days of data)
- **Projected monthly growth:** 300,000,000 rows

---

Developed for the Engineering Challenge on Large-Scale Data Growth Strategies.
