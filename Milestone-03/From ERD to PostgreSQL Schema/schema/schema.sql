-- Broken schema.sql
-- This has Intentional mistakes:

CREATE TABLE users (
    id SERIAL, -- missing KEY
    name TEXT,
    email TEXT
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
    -- missing constraints
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    title TEXT,
    user_id INT,  -- missing reference
    project_id INT -- missing reference
);

-- Intentional mistake: no relationship enforced between tasks and users/projects