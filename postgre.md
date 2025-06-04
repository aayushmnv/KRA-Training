create table employees (
emp_id SERIAL PRIMARY key ,
fname varchar(50) not null,
lname varchar(50) not null,
email varchar(100) not null unique,
dept varchar(50),
salary decimal(10,2) default 30000.00,
hire_date DATE not null default current_date
);



INSERT INTO employees (emp_id, fname, lname, email, dept, salary, hire_date)
VALUES
(1, 'Raj', 'Sharma', 'raj.sharma@example.com', 'IT', 50000.00, '2020-01-15'),
(2, 'Priya', 'Singh', 'priya.singh@example.com', 'HR', 45000.00, '2019-03-22'),
(3, 'Arjun', 'Verma', 'arjun.verma@example.com', 'IT', 55000.00, '2021-06-01'),
(4, 'Suman', 'Patel', 'suman.patel@example.com', 'Finance', 60000.00, '2018-07-30'),
(5, 'Kavita', 'Rao', 'kavita.rao@example.com', 'HR', 47000.00, '2020-11-10'),
(6, 'Amit', 'Gupta', 'amit.gupta@example.com', 'Marketing', 52000.00, '2020-09-25'),
(7,'Neha', 'Desai', 'neha.desai@example.com', 'IT', 48000.00, '2019-05-18'),
(8, 'Rahul', 'Kumar', 'rahul.kumar@example.com', 'IT', 53000.00, '2021-02-14');



INSERT INTO employees (emp_id, fname, lname, email, dept, salary, hire_date) 
VALUES
(9, 'Anjali', 'Mehta', 'anjali@example.com', 'Finance', 61000.00, '2018-12-15'),
(10, 'Vijay', 'nair', 'vijay@example.com', 'Marketing', 45000.00, '2020-04-22');

select * from employees;

SELECT * FROM employees
WHERE emp_id = 3;


SELECT * FROM employees WHERE emp_id = 5;

select * from employees where dept ='IT' AND salary >50000;

select distinct dept from employees;

select * from employees where dept in ('IT' , 'HR');

select * from employees where salary between 50000 AND 60000;

select * from employees order by  fname;

select * from employees order by  fname desc; 

select * from employees limit 3;

select * from employees where fname like '%a';

select * from employees where fname like 'A%';

select * from employees where fname like '%i%';

select * from employees where dept like '__';

select * from employees where fname like '_a%';

select count(*) from employees;

select sum(salary) from employees;

select avg(salary) from employees;

select min(salary) from employees;

select max(salary) from employees;

select dept ,count(*) from employees group by dept;

select dept ,SUM(salary) as totalSalary from employees group by dept;

select dept ,avg(salary) from employees group by dept;

select dept ,max(salary) from employees group by dept;

select concat(fname,' ',lname) from employees ;

select concat(fname,' ',lname) as fullname from employees ;

--concat with separator it takes first arg. as separator
select concat_ws('-',fname,lname) as fullname from employees ;

select substr(fname , 2,3) from employees ;

select replace('abcxyz' , 'abc' , 'pqr');

select replace (dept,'HR' ,'Lbdnd ') as depart from employees;

select  length(fname) from employees;

select *  from employees where length(fname)>5;

select concat_ws(':',emp_id , fname,lname,dept) from employees where emp_id=1;

select fname , salary,
CASE 
when salary >=50000 then 'HIGH'
when salary >=48000 then 'MID'
else 'LOW'
END as sal_cat
from employees;

select fname , salary,
CASE 
when salary >0 then Round(salary*.10)
END 
as bonus
from employees;

-- XXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-- select fname , Round(salary*.10)as bonus from employees;
-- select bonus XXX 
-- case XXXXXXXXXXXXXXXXXXXXXXXX
-- when bonus>=6100 then 'high' x
-- when bonus>=5300 then 'mid'x
-- else 'low'xxxxxxxxxxxxxxxxxxxxx
-- end as bonus-catxxxxxxxxxxxxxxx
-- from (select fname , Round(salary*.10)as bonus from employees)
-- group by bonus;
--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

select 
CASE
when salary >=50000 then 'HIGH'
when salary >=48000 then 'MID'
else 'LOW'
END as sal_cat ,count(*)
from employees
group by sal_cat; 