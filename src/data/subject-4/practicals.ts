import type { Practical } from '../../types/practical';

export const subject4Practicals: Practical[] = [
  {
    id: 'practical-01',
    number: 1,
    title: 'SQL — CREATE TABLE and INSERT',
    language: 'SQL',
    aim: 'To understand how to create a database table with appropriate constraints and insert records into it using standard SQL statements.',
    theory: `**SQL (Structured Query Language)** is the standard language for managing and manipulating relational databases.

**DDL (Data Definition Language):** Defines database structure.
- \`CREATE TABLE\` – Creates a new table with columns and constraints.
- \`DROP TABLE\` – Deletes a table.
- \`ALTER TABLE\` – Modifies an existing table.

**DML (Data Manipulation Language):** Manipulates data.
- \`INSERT INTO\` – Adds new records.
- \`SELECT\` – Retrieves records.
- \`UPDATE\` – Modifies existing records.
- \`DELETE\` – Removes records.

**Common Constraints:**
- \`PRIMARY KEY\` – Uniquely identifies each row.
- \`NOT NULL\` – Prevents null values.
- \`UNIQUE\` – Ensures all values in a column are different.
- \`DEFAULT\` – Sets a default value.
- \`CHECK\` – Validates data against a condition.`,
    code: `-- =============================================
-- PRACTICAL 01: CREATE TABLE and INSERT
-- =============================================

-- Create the Students table
CREATE TABLE Students (
    student_id   INT          PRIMARY KEY AUTO_INCREMENT,
    first_name   VARCHAR(50)  NOT NULL,
    last_name    VARCHAR(50)  NOT NULL,
    email        VARCHAR(100) UNIQUE NOT NULL,
    age          INT          CHECK (age >= 16 AND age <= 60),
    department   VARCHAR(50)  DEFAULT 'General',
    enroll_date  DATE         NOT NULL
);

-- Create the Courses table
CREATE TABLE Courses (
    course_id   INT         PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    credits     INT          DEFAULT 3,
    instructor  VARCHAR(50)
);

-- Insert student records
INSERT INTO Students (first_name, last_name, email, age, department, enroll_date) VALUES
    ('Alice',   'Johnson', 'alice@college.edu',   20, 'Computer Science', '2024-08-01'),
    ('Bob',     'Smith',   'bob@college.edu',     22, 'Mathematics',      '2024-08-01'),
    ('Charlie', 'Brown',   'charlie@college.edu', 19, 'Computer Science', '2024-08-15'),
    ('Diana',   'Prince',  'diana@college.edu',   21, 'Physics',          '2024-07-20'),
    ('Eve',     'Adams',   'eve@college.edu',     23, 'Mathematics',      '2024-09-01');

-- Insert course records
INSERT INTO Courses (course_name, credits, instructor) VALUES
    ('Database Management',   4, 'Prof. Kumar'),
    ('Data Structures',       4, 'Prof. Sharma'),
    ('Web Development',       3, 'Prof. Patel'),
    ('Operating Systems',     4, 'Prof. Gupta'),
    ('Computer Networks',     3, 'Prof. Singh');

-- Verify the insertions
SELECT * FROM Students;
SELECT * FROM Courses;

-- Count students per department
SELECT department, COUNT(*) AS student_count
FROM Students
GROUP BY department
ORDER BY student_count DESC;`,
    conclusion: 'Thus, we successfully created relational database tables using SQL CREATE TABLE with constraints and populated them with records using INSERT INTO statements.',
  },
  {
    id: 'practical-02',
    number: 2,
    title: 'SQL — SELECT, WHERE, and JOIN',
    language: 'SQL',
    aim: 'To retrieve data from single and multiple tables using SELECT statements, filter records with WHERE clause, and combine tables using JOIN operations.',
    theory: `**SELECT Statement** is the most commonly used SQL command. It retrieves data from one or more tables.

**Syntax:**
\`\`\`sql
SELECT column1, column2 FROM table_name WHERE condition;
\`\`\`

**WHERE Clause Operators:**
- Comparison: \`=\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`
- Logical: \`AND\`, \`OR\`, \`NOT\`
- Pattern: \`LIKE\` (with \`%\` wildcard)
- Range: \`BETWEEN ... AND ...\`
- List: \`IN (...)\`

**JOINs** combine rows from two or more tables based on a related column:
- \`INNER JOIN\` – Returns rows with matching values in both tables.
- \`LEFT JOIN\` – Returns all rows from the left table + matching right rows.
- \`RIGHT JOIN\` – Returns all rows from the right table + matching left rows.
- \`FULL JOIN\` – Returns all rows from both tables.`,
    code: `-- =============================================
-- PRACTICAL 02: SELECT, WHERE, and JOIN
-- =============================================

-- 1. Basic SELECT
SELECT first_name, last_name, department
FROM Students;

-- 2. SELECT with WHERE
SELECT * FROM Students
WHERE department = 'Computer Science';

-- 3. WHERE with multiple conditions
SELECT first_name, last_name, age
FROM Students
WHERE age BETWEEN 20 AND 22
  AND department != 'Physics';

-- 4. WHERE with LIKE (pattern matching)
SELECT first_name, email
FROM Students
WHERE email LIKE '%@college.edu';

-- 5. ORDER BY and LIMIT
SELECT first_name, last_name, age
FROM Students
ORDER BY age DESC
LIMIT 3;

-- Create Enrollments table for JOIN demo
CREATE TABLE Enrollments (
    enroll_id  INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id  INT,
    grade      VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id)  REFERENCES Courses(course_id)
);

INSERT INTO Enrollments (student_id, course_id, grade) VALUES
    (1, 1, 'A'), (1, 2, 'B+'), (2, 1, 'A+'),
    (3, 3, 'B'), (4, 4, 'A'), (5, 2, 'B+');

-- 6. INNER JOIN — Students and their enrolled courses
SELECT
    s.first_name,
    s.last_name,
    c.course_name,
    e.grade
FROM Enrollments e
INNER JOIN Students s ON e.student_id = s.student_id
INNER JOIN Courses  c ON e.course_id  = c.course_id
ORDER BY s.first_name;

-- 7. LEFT JOIN — All students, even those not enrolled
SELECT
    s.first_name,
    s.last_name,
    c.course_name
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
LEFT JOIN Courses     c ON e.course_id  = c.course_id;`,
    conclusion: 'Thus, we successfully retrieved and filtered data using SELECT and WHERE clauses, and combined multiple related tables using INNER JOIN and LEFT JOIN operations.',
  },
  {
    id: 'practical-03',
    number: 3,
    title: 'SQL — Aggregate Functions and GROUP BY',
    language: 'SQL',
    aim: 'To compute summary statistics from database tables using SQL aggregate functions like COUNT, SUM, AVG, MAX, MIN and group results using GROUP BY and HAVING clauses.',
    theory: `**Aggregate Functions** perform calculations on a set of rows and return a single result.

| Function  | Description                        |
|-----------|-----------------------------------|
| \`COUNT()\` | Returns the number of rows         |
| \`SUM()\`   | Returns the sum of numeric values  |
| \`AVG()\`   | Returns the average value          |
| \`MAX()\`   | Returns the maximum value          |
| \`MIN()\`   | Returns the minimum value          |

**GROUP BY** groups rows that have the same values in specified columns, so aggregate functions can be applied to each group.

**HAVING** filters groups (like WHERE, but for grouped results).

**Key difference:**
- \`WHERE\` filters individual rows *before* grouping.
- \`HAVING\` filters groups *after* grouping.`,
    code: `-- =============================================
-- PRACTICAL 03: Aggregate Functions & GROUP BY
-- =============================================

-- Setup: Products table
CREATE TABLE Products (
    product_id   INT          PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category     VARCHAR(50)  NOT NULL,
    price        DECIMAL(10,2) NOT NULL,
    quantity     INT           NOT NULL,
    supplier     VARCHAR(50)
);

INSERT INTO Products (product_name, category, price, quantity, supplier) VALUES
    ('Laptop Pro',      'Electronics', 75000.00, 50, 'TechCorp'),
    ('Wireless Mouse',  'Electronics', 1200.00, 200, 'TechCorp'),
    ('USB-C Hub',       'Electronics', 2500.00, 150, 'GadgetWorld'),
    ('Office Chair',    'Furniture',   15000.00, 30, 'FurnishCo'),
    ('Standing Desk',   'Furniture',   25000.00, 20, 'FurnishCo'),
    ('Notebook A4',     'Stationery',  150.00, 1000, 'PaperMart'),
    ('Ballpoint Pens',  'Stationery',  80.00,  2000, 'PaperMart'),
    ('Highlighters',    'Stationery',  200.00,  800, 'PaperMart'),
    ('Monitor 27"',     'Electronics', 22000.00, 40, 'GadgetWorld'),
    ('Ergonomic Pad',   'Furniture',   500.00,  100, 'FurnishCo');

-- 1. Total number of products
SELECT COUNT(*) AS total_products FROM Products;

-- 2. Price statistics
SELECT
    MAX(price) AS highest_price,
    MIN(price) AS lowest_price,
    ROUND(AVG(price), 2) AS average_price,
    SUM(price * quantity) AS total_inventory_value
FROM Products;

-- 3. Products per category (GROUP BY)
SELECT
    category,
    COUNT(*)             AS product_count,
    ROUND(AVG(price), 2) AS avg_price,
    SUM(quantity)        AS total_stock
FROM Products
GROUP BY category
ORDER BY product_count DESC;

-- 4. Categories with avg price > 5000 (HAVING)
SELECT
    category,
    ROUND(AVG(price), 2) AS avg_price
FROM Products
GROUP BY category
HAVING AVG(price) > 5000;

-- 5. Supplier-wise total inventory value
SELECT
    supplier,
    COUNT(*)                      AS products_supplied,
    SUM(price * quantity)         AS total_value
FROM Products
GROUP BY supplier
ORDER BY total_value DESC;`,
    conclusion: 'Thus, we successfully applied SQL aggregate functions COUNT, SUM, AVG, MAX, and MIN along with GROUP BY and HAVING clauses to perform meaningful data summarization.',
  },
];
