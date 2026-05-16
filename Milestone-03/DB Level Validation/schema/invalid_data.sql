-- Missing task title
INSERT INTO tasks (id, title, priority, project_id)
VALUES (3, NULL, 3, 1);

-- Duplicate email
INSERT INTO users (id, name, email)
VALUES (3, 'Charlie', 'alice@email.com');

-- Invalid priority
INSERT INTO tasks (id, title, priority, project_id)
VALUES (4, 'Testing Task', 10, 1);

-- Invalid project reference
INSERT INTO tasks (id, title, priority, project_id)
VALUES (5, 'Ghost Task', 2, 999);