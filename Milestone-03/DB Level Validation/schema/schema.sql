CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE projects (
    id INT PRIMARY KEY,
    project_name VARCHAR(100)
);

CREATE TABLE tasks (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    priority INT,
    project_id INT
);