require("dotenv").config();
const morgan = require("morgan");
const express = require("express");

const app = express();
const db = require("./db");

const port = process.env.PORT || 3001;

// Logging
app.use(morgan('dev'))

// Attach body to request
app.use(express.json());

// Get specific employee
app.get('/api/employees/:id', async (req, res) => {
  const employeeList = await db.query('SELECT * FROM employees');
  
  res.status(200).json({
    status: "success",
    data: {
      employeeList: employeeList.rows
    },
    message: `Got Employee ${req.params.id}}`
  });
});

// Get all employees
app.get('/api/employees/', (req, res) => {
  res.json({
    status: "success",
    message: "Got All Employees"
  });
});

// Create new employee
app.post('/api/employees/', (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(201).json({
    status: "success",
    message: `Created new employee under id #${body.id}`
  });
});

// Update employee
app.patch('/api/employees/:id', (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(200).json({
    status: "success",
    message: `Updated employee #${req.params.id}`
  });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
  res.status(204)
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`
    );
});