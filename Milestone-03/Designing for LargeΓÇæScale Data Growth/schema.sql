-- TrackFlow Schema
-- Initial schema for event tracking and user sessions

-- Core users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    plan VARCHAR(20) DEFAULT 'free',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table to track user activity periods
CREATE TABLE sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER
);

-- Main events table for all user interactions
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    session_id INTEGER REFERENCES sessions(id),
    event_type VARCHAR(50) NOT NULL,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feature usage tracking for internal analytics
CREATE TABLE feature_usage (
    id BIGSERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    feature_name VARCHAR(100) NOT NULL,
    used_at TIMESTAMPTZ DEFAULT NOW(),
    count INTEGER DEFAULT 1
);
