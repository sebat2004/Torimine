CREATE TABLE employees (
    id BIGSERIAL NOT NULL,
    address VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    salary INT NOT NULL,
    vacation_days INT NOT NULL,
    PRIMARY KEY (id));

ALTER TABLE employees ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE employees ADD CONSTRAINT unique_phone UNIQUE (phone);

ALTER TABLE employees
ALTER COLUMN phone TYPE VARCHAR(15);

INSERT INTO employees (id, address, name, email, phone, 
salary, vacation_days) values (1, '6021 126th Ave NE', 
'Sebastian J Torresola', 'test123@gmail.com', '4444444444', 110000, 10);