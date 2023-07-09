require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors") // Cross Origin Resource Sharing

const app = express();
const db = require("./db");

const port = process.env.PORT || 3001;

// Logging
app.use(morgan('dev'))
app.use(cors())

// Attach body to request
app.use(express.json());

// Login route
app.post('/api/login', async (req, res) => {
	try {
		const results = await db.query("SELECT * FROM users WHERE username = $1", [req.body.username]);
		if (results.rows.length > 0) {
			if (results.rows[0].password === req.body.password) {
				res.status(200).json({
					status: "success",
					data: {
						user: results.rows[0]
					},
					message: `Logged in as ${req.body.username}`
				});
			} else {
				res.status(401).json({message: "Wrong password"});
			}
		} else {
			res.status(404).json({message: "User not found"});
		}
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});


// Get specific employee
app.get('/api/employees/:id', async (req, res) => {
	try {
		const results = await db.query("SELECT * FROM employees WHERE id = $1", [req.params.id]);
		res.status(200).json({
			status: "success",
			results: results.rows.length,
			data: {
				employee: results.rows
			},
			message: `Got employee #${req.params.id}`});
	} catch (err) {
		console.error(err.message);
	}
});

// Get all employees
app.get('/api/employees/', async (req, res) => {
	try {
		const results = await db.query('SELECT * FROM employees');
		res.status(200).json({
		status: "success",
		results: results.rows.length,
		data: {
			employees: results.rows
		},
		message: "Got All Employees"
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Create new employee
app.post('/api/employees/', async (req, res) => {
	try {
		const results = await db.query('INSERT INTO employees (address, name, email, phone, salary, vacation_days) values ($1, $2, $3, $4, $5, $6) returning *', 
		[req.body.address, req.body.name, req.body.email, req.body.phone, req.body.salary, req.body.vacation_days]);

		res.status(201).json({
			status: "success",
			results: results.length,
			data: {
			employees: results.rows.name
			},
			message: "Got All Employees"
		});
		} catch (err) {
			res.status(500).json({message: err.message})
		}
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
	try {
		const results = await db.query("UPDATE employees SET address = $1, name = $2, email = $3, phone = $4, salary = $5, vacation_days = $6 WHERE id = $7 returning *", 
		[req.body.address, req.body.name, req.body.email, req.body.phone, req.body.salary, req.body.vacation_days, req.params.id]);
		console.log(results);
	
		res.status(200).json({
			status: "success",
			data: {
				employee: results.rows
			},
			message: `Updated employee #${req.params.id}`
		});
	} catch (err) {
		res.status(400).json({message: err.message})
	}
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
	try {
		const results = await db.query("DELETE FROM employees WHERE id = $1 returning *", [req.params.id]);

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`
    );
});