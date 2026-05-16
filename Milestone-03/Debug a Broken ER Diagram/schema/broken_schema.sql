-- Users Table
CREATE TABLE Users (
    name VARCHAR(100),
    email ID(100)
);

-- Projects Table
CREATE TABLE Projects (
    project_name CHAR(100),
    owner_name CHAR(100)
);

-- Tasks Table
CREATE TABLE Tasks (
    task_name INT(100),
    project_name VARCHAR(100),
    assigned_user VARCHAR(100),
    status VARCHAR(50)
);

-- UserProjects Table
CREATE TABLE UserProjects (
    user_name VAR(100),
    project_name VARCHAR(100)
);