-- Create a new database
CREATE DATABASE flameskitchen;

-- Connect to the newly created database
\c flameskitchen;

-- List the newly created tables
CREATE TABLE employee_data (
    empid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    salary INTEGER,
    address VARCHAR(300),
    role VARCHAR(20),
    LoggedIn BOOLEAN DEFAULT FALSE,
    password VARCHAR(100),

    

);

CREATE TABLE transactions (
    date VARCHAR (50) ,
    time VARCHAR (4),
    mode VARCHAR (50),
    name varchar (50),
    refid varchar (50),
    type varchar (50),
    sum INTEGER,
    items VARCHAR[]

    
    

)

CREATE TABLE financial_day_data (
    date VARCHAR(50) ,
    starting_balance INTEGER
)



