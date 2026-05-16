# 🛠 Debug and Redesign the TaskSphere ER Diagram

In real engineering teams, developers often inherit database schemas created by other developers.

Sometimes these schemas contain **design flaws** that lead to serious problems in production systems.

Your task in this challenge is to **analyze a broken ER diagram and redesign it correctly.**

---

# 📘 Scenario

You recently joined a backend engineering team working on a project called **TaskSphere**.

TaskSphere manages:

- Projects
- Tasks
- Team Members

A previous developer designed the database schema.

After a few weeks of usage, the team started noticing several issues:

- Duplicate records appearing in reports
- Tasks assigned to users that do not exist
- Queries becoming slower as the database grows

After investigation, the team suspects the **database schema design is flawed**.

Your team lead has asked you to **review the ER diagram and fix the design.**

---

# 📂 Provided Resources

The repository includes a **broken database schema and ER diagram**.
docs/broken-erd.png
schema/broken_schema.sql

# 🎯 Your Challenge

You must complete **two tasks**.

### 1️⃣ Debug the Broken ER Diagram

Analyze the given schema and identify the design flaws.

Focus on:

- Missing keys
- Poor relationships
- Redundant attributes
- Lack of constraints

---

### 2️⃣ Create a Correct ER Diagram

Design a **corrected schema** that fixes the issues.

Your improved design should include:

- Proper **Primary Keys**
- Correct **Foreign Key relationships**
- Reduced redundancy
- Logical table structure
- A schema closer to **Third Normal Form (3NF)**

---

# 📤 Submission Requirements

Submit **two files** inside the `submission` folder.

### 1️⃣ Corrected ER Diagram


submission/corrected-erd.png


Create the diagram using tools like:

- draw.io
- DrawSQL
- dbdiagram.io

Export the diagram as **PNG**.

---

### 2️⃣ Corrected Database Schema


submission/corrected-schema.sql


Write the SQL schema for your improved design.

Your schema should include:

- Primary Keys
- Foreign Keys
- Proper table relationships

---

# 🔒 Contribution Rules (Important)

To protect the original repository from accidental changes, **direct modifications are not allowed**.

All learners must follow the **Fork → Work → Pull Request workflow**.

### Workflow

1. **Fork** this repository  
2. **Clone your fork**

```bash
git clone <your-fork-url>

Create a branch

git checkout -b erd-fix

Add your files in the submission folder

Push changes

git push origin erd-fix

Open a Pull Request

```
## 🧠 Learning Objectives

By completing this challenge you will learn how to:

Identify problems in database schemas

Understand proper entity relationships

Apply normalization concepts

Design scalable relational schemas

🚀 Happy Debugging