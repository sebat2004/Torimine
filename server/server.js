require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors") // Cross Origin Resource Sharing
const session = require("express-session");
const app = express();
const db = require("./config/db");
const passwordUtilities = require("./lib/passwordUtilities");
const { urlencoded } = require("express");

const port = process.env.PORT || 3001;

// Logging middleware
app.use(morgan('dev'))

// Attach body to request
app.use(express.json());
app.use(urlencoded({extended: true}))

// CORS middleware
const corsOptions = {
	origin: ["http://localhost:5173"],
	credentials: true,
  };

app.use(cors(corsOptions));


sessionStore = new (require('connect-pg-simple')(session))({
	pool : db.pool
});

// Session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30 // 1 month
	}
}));

// Login route with passport auth
app.post('/api/login', async (req, res) => {
	const password = req.body.password;
	const username = req.body.username
	if (req.session.user) {
		res.status(200).json({message: "Already logged in", status: "success"});
	} else {
		const results = await db.query("SELECT * FROM users WHERE username = $1", [username]);
		if (results.rows.length > 0) {
			const user = results.rows[0];
			const isValid = passwordUtilities.validatePassword(password, user.hash, user.salt);
			if (isValid) {
				req.session.user = user;
				res.status(200).json({message: "Logged in", status: "success"});
				console.log(req.session.user);
				console.log(req.sessionID)
			} else {
				res.status(401).json({message: "Invalid password", status: "error"});
			}
		}
		else {
			res.status(401).json({message: "Invalid username", status: "error"});
		}
	}
});

// Register route
app.post('/api/register', async (req, res) => {
	// Password encryption
	const saltHash = passwordUtilities.genPassword(req.body.password);
	const salt = saltHash.salt;
	console.log(salt)
	const hash = saltHash.hash;

	try {
		const results = await db.query("SELECT * FROM users WHERE username = $1", [req.body.username]);
		if (results.rows.length > 0) {
			res.status(409).json({message: "Username already exists"});
		} else {
			const results = await db.query('INSERT INTO users (username, email, hash, salt) values ($1, $2, $3, $4) returning *',
			[req.body.username, req.body.email, hash, salt]);
			res.status(201).json({
				status: "success",
				data: {
					user: results.rows[0]
				},
				message: `User ${req.body.username} is registered!`
			});
		}
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Logout route
app.get('/api/logout', (req, res) => {
	req.logout();
	res.status(200).json({message: "Logged out"});
});

// Is authenticated route
app.get('/api/authenticated', (req, res) => {
	if (req.session.user) {
		res.status(200).json({
			message: "Authenticated",
			status: "success",
			user: req.session.user
		});
	} else {
		res.status(401).json({message: "Not authenticated", status: "error"});
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
		[req.body.address, req.body.username, req.body.email, req.body.phone, req.body.salary, req.body.vacation_days]);

		res.status(201).json({
			status: "success",
			results: results.length,
			data: {
			employees: results.rows.username
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