SELECT 
    e.first_name AS FirstName,
    e.last_name AS LastName,
    r.title AS Title,
    d.name AS Department,
    r.salary AS Salary,
    CONCAT(m.first_name, ' ', m.last_name) AS ManagerName
FROM 
    employee e
JOIN 
    role r ON e.role_id = r.role_id
JOIN 
    department d ON r.department_id = d.department_id
LEFT JOIN 
    employee m ON e.manager_id = m.employee_id;