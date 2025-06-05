-- customers
CREATE TABLE customers (
    cust_id SERIAL PRIMARY KEY,
    cust_name VARCHAR(100) NOT NULL
);

INSERT INTO customers (cust_name)
VALUES
    ('Raju'), ('Sham'), ('Paul'), ('Alex');

-- orders
CREATE TABLE orders (
    ord_id SERIAL PRIMARY KEY,
    ord_date DATE NOT NULL,
    cust_id INTEGER NOT NULL,
    FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);

INSERT INTO orders (ord_date, cust_id)
VALUES
    ('2024-01-01', 1),  -- Raju first order
    ('2024-02-01', 2),  -- Sham first order
    ('2024-03-01', 3),  -- Paul first order
    ('2024-04-04', 2);  -- Sham second order

-- products
CREATE TABLE products (
    p_id SERIAL PRIMARY KEY,
    p_name VARCHAR(100) NOT NULL,
    price NUMERIC NOT NULL);

INSERT INTO products (p_name, price)
VALUES
    ('Laptop', 55000.00),
    ('Mouse', 500),
    ('Keyboard', 800.00),
    ('Cable', 250.00);	

-- order_items
CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    ord_id INTEGER NOT NULL,
    p_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (ord_id) REFERENCES orders(ord_id),
    FOREIGN KEY (p_id) REFERENCES products(p_id)
);

INSERT INTO order_items (ord_id, p_id, quantity)
VALUES
    (1, 1, 1),  -- Raju ordered 1 Laptop
    (1, 4, 2),  -- Raju ordered 2 Cables
    (2, 1, 1),  -- Sham ordered 1 Laptop
    (3, 2, 1),  -- Paul ordered 1 Mouse
    (3, 4, 5),  -- Paul ordered 5 Cables
    (4, 3, 1);  -- Sham ordered 1 Keyboard

-- JOINS 

select * FROM customers c join orders o on c.cust_id=o.cust_id join order_items oi on o.ord_id=oi.ord_id join products p on  oi.p_id=p.p_id ;
select c.cust_name , p.p_name , (oi.quantity * p.price)  as totalPrice , oi.quantity
from order_items oi JOIN products p ON oi.p_id=p.p_id JOIN orders o ON o.ord_id=oi.ord_id JOIN customers c ON o.cust_id=c.cust_id;

select c.cust_name , count(o.ord_id) 
from order_items oi JOIN products p ON oi.p_id=p.p_id JOIN orders o ON o.ord_id=oi.ord_id JOIN customers c ON o.cust_id=c.cust_id 
group by c.cust_name;

select c.cust_name ,o.ord_id, p.p_name ,p.price ,
oi.quantity,o.ord_date,
(oi.quantity * p.price)  as totalPrice 
from order_items oi JOIN products p ON oi.p_id=p.p_id 
JOIN orders o ON o.ord_id=oi.ord_id 
JOIN customers c ON o.cust_id=c.cust_id;

-- VIEW
create view billing_info AS
select c.cust_name ,o.ord_id, p.p_name ,p.price ,
oi.quantity,o.ord_date,
(oi.quantity * p.price)  as totalPrice 
from order_items oi JOIN products p ON oi.p_id=p.p_id 
JOIN orders o ON o.ord_id=oi.ord_id 
JOIN customers c ON o.cust_id=c.cust_id;


select * from billing_info;

select p_name , sum(totalPrice) from billing_info
group by p_name;

select cust_name , sum(totalPrice) from billing_info
group by cust_name;

--Having clause
select p_name , sum(totalPrice) from billing_info
group by p_name 
having sum(totalPrice)>1500;

select p_name , sum(totalPrice) from billing_info
group by rollup (p_name);

select coalesce(p_name , 'total') , sum(totalPrice) from billing_info
group by rollup (p_name)
order by sum(totalPrice) ;

--Stored procedure from diff db
--and diff table, only for concept

-- create or replace procedure update_emp_salary(
--   p_employee_id INT , 
--   p_new_salary NUMERIC 
-- )
-- language plpgsql
-- as $$ 
--  begin 
--    update employees 
--    set salary = p_new_salary
--    where emp_id = p_employee_id;
--  end;
-- $$;

-- call update_emp_salary (3 , 71000);
/* exapmle usage 
create or replace procedure add_labour(p_id INT ,
p_fname varchar, p_lname varchar,p_email varchar,p_dept varchar,
p_salary NUMERIC
)
language plpgsql
as $$
begin 
insert into employees (emp_id ,fname , lname , email ,dept , salary)
values (p_id ,p_fname , p_lname ,p_email ,p_dept ,
p_salary );
end;
$$;

call add_labour (45,'aayush' , 'pandey' ,'aayush.pandey@gmail.com','IT' ,95000);
*/

/*
-- User Defined function ****
-- Question => we have to find the records of the employees 
-- whose salary is max in thier respective dept.

-- so we have complexity =>
select 
 e.emp_id,
 e.fname,
 e.salary
from
 employees e
where e.dept = 'IT' 
 AND e.salary = (
select max(emp.salary) 
from employees emp where emp.dept='IT'
 );

 -- so for finding for every depart we have to write this 
 -- query varios time so thats why user defined func
 -- comes into picture

 
create or replace function 
dept_max_sal_emp(dept_name varchar)
returns table(emp_id int , fname varchar , salary numeric)
as $$
begin
return query
select 
 e.emp_id,
 e.fname,
 e.salary
from
 employees e
where e.dept = dept_name --(this dept_name is variable)
 AND e.salary = (
select max(emp.salary) 
from employees emp where emp.dept=dept_name --(this dept_name is variable)
 );
 end;
 $$ language plpgsql;
 
--How to use
 select * from dept_max_sal_emp('Marketing');
*/

 -- Common table expressions 

 /*
 Use Cases - 1
. We want to calculate the average salary
per department and then find all
employees whose salary is above the
average salary of their department.
 */

-
select  avg(salary)as avg_salary from employees 
group by dept;


-- select emp_id , fname , salary from employees 
-- where salary > (select avg(salary)as avg_salary from employees 
-- group by dept); tried with sub query but not getting results 
-- we'll do it by cte => below 

with avg_sal AS (select dept,  avg(salary)as avg_salary from employees 
group by dept)
select 
e.emp_id ,e.dept, e.salary , a.avg_salary
from employees e join avg_sal a on a.dept = e.dept
where e.salary > a.avg_salary;

--Q => we want to find the highest paid employee in each depart

with max_sal AS (select dept,  max(salary)as max_salary from employees 
group by dept)
select e.fname , e.salary , m.max_salary 
from employees e join max_sal m
on e.dept = m.dept
where e.salary = m.max_salary;

-- can implement these queries in bankdb