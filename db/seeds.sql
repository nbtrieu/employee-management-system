USE employees_db;

INSERT INTO department (name)
VALUES  ('Engineering'), 
        ('Sales'), 
        ('Marketing'), 
        ('HR');

INSERT INTO role (title, salary, department_id)
VALUES  ('Lead Engineer', 180000, 1),
        ('Software Engineer', 120000, 1),
        ('Sales Lead', 100000, 2),
        ('Salesperson', 85000, 2),
        ('Account Manager', 160000, 3),
        ('Marketing Analyst', 110000, 3),
        ('Recruiting Manager', 170000, 4),
        ('HR Specialist', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Quan', 'Chau', 1, NULL),
        ('Nicole', 'Trieu', 2, 1),
        ('Jimin', 'Park', 3, NULL),
        ('Jungkook', 'Jeon', 4, 3),
        ('Nayeon', 'Im', 5, NULL),
        ('Momo', 'Hirai', 6, 5),
        ('Kathie', 'Vu', 7, NULL),
        ('Wednesday', 'Addams', 8, 7);
