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
	pool : db.pool,
	createTableIfMissing: true
});

// Session middleware
app.set('trust proxy', 1);
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
	const results = await db.query("SELECT * FROM users WHERE username = $1", [username]);
	if (results.rows.length > 0) {
		const user = results.rows[0];
		const isValid = passwordUtilities.validatePassword(password, user.hash, user.salt);
		if (isValid) {
			req.session.user = user;
			res.status(200).json({message: "Logged in", status: "success"});
		} else {
			res.status(401).json({message: "Invalid password", status: "error"});
		}
	}
	else {
		res.status(401).json({message: "Invalid username", status: "error"});
	}
});

// Register route
app.post('/api/register', async (req, res) => {
	// Password encryption
	const saltHash = passwordUtilities.genPassword(req.body.password);
	const salt = saltHash.salt;
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
	req.session.destroy();
	res.status(200).json({message: "Logged out"});
});

// Is authenticated route
app.get('/api/authenticated', (req, res) => {
	console.log(req.session.user);
	if (req.session.user) {
		res.status(200).json({
			message: "Authenticated",
			status: "success",
			data: {
				username: req.session.user.username
			}
		});
	} else {
		res.status(401).json({message: "Not authenticated", status: "error"});
	}
});

// Get all coworkers for a user
app.get('/api/users/:username/coworkers', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("SELECT * FROM coworkers WHERE username = $1", [req.params.username]);

		res.status(200).json({
			status: "success",
			data: {
				coworkers: results.rows
			},
			message: `Got coworkers for ${req.params.username}`
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Add another user as a coworker
app.put('/api/users/:username/coworkers', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		// Checks if user is adding themselves
		if (req.params.username == req.body.coworker) {
			res.status(400).json({message: "Cannot add yourself as a coworker"});
			return;
		}

		// Checks if the user has already added the coworker
		let results = await db.query("SELECT * FROM coworkers WHERE username = $1 AND coworker = $2", [req.params.username, req.body.coworker]);
		if (results.rows.length > 0) {
			res.status(409).json({message: "Coworker already added"});
			return;
		}

		// Checks if the coworker exists as a user
		results = await db.query("SELECT * FROM users WHERE username = $1", [req.body.coworker]);
		if (results.rows.length == 0) {
			res.status(404).json({message: "User not found"});
			return;
		}

		// Inserts the connection into the db
		results = await db.query("INSERT INTO coworkers (username, coworker) VALUES ($1, $2), ($2, $1) returning *",
		[req.params.username, req.body.coworker]);

		res.status(201).json({
			status: "success",
			data: {
				coworker: results.rows[0]
			},
			message: `Added coworker for ${req.params.username}`
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Get all users
app.get('/api/users/', async (req, res) => {
	try {
		const results = await db.query('SELECT * FROM users');
		res.status(200).json({
		status: "success",
		results: results.rows.length,
		data: {
			users: results.rows
		},
		message: "Got All Users"
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Get specific user
app.get('/api/users/:username', async (req, res) => {
	try {
		const results = await db.query("SELECT * FROM users WHERE username = $1", [req.params.username]);
		if (results.rows.length > 0) {
			res.status(200).json({
				status: "success",
				data: {
					employee: results.rows[0]
				},
				message: `Got ${req.params.id}`});
		} else {
			res.status(404).json({message: `${req.params.id} not found`});
		}
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Update user
app.put('/api/users/:username', async (req, res) => {
	try {
		if (req.session.user.username != req.body.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("UPDATE users SET email = $2 WHERE username = $1", 
		[req.params.username, req.body.email]);
	
		res.status(200).json({
			status: "success",
			data: {
				user: results.rows
			},
			message: `Updated user #${req.body.username}`
		});
	} catch (err) {
		res.status(400).json({message: err.message})
	}
});

// Delete user
app.delete('/api/users/:username', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("DELETE FROM users WHERE username = $1 returning *", [req.params.username]);

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Add a user's event to the db
app.post('/api/users/:username/events', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		// Add event to db for requestor
		let results = await db.query("INSERT INTO events (username, title, start, end) values ($1, $2, $3, $4) returning *",
		[req.params.username, req.body.title, req.body.start, req.body.end]);

		// Add event to db for coworker
		results = await db.query("INSERT INTO events (username, title, start, end) values ($1, $2, $3, $4) returning *",
		[req.body.coworker, req.body.title, req.body.start, req.body.end]);

		res.status(201).json({
			status: "success",
			data: {
				event: results.rows[0]
			},
			message: `Added event for ${req.params.username}`
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Get all events for a user
app.get('/api/users/:username/events', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("SELECT * FROM events WHERE username = $1", [req.params.username]);

		res.status(200).json({
			status: "success",
			data: {
				events: results.rows
			},
			message: `Got events for ${req.params.username}`
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Get a specific event for a user
app.get('/api/users/:username/events/:title', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("SELECT * FROM events WHERE username = $1 AND title = $2", [req.params.username, req.params.title]);
		if (results.rows.length > 0) {
			res.status(200).json({
				status: "success",
				data: {
					event: results.rows[0]
				},
				message: `Got event #${req.params.title}`});
		} else {
			res.status(404).json({message: `${req.params.title} not found`});
		}
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Update a specific event for a user
app.put('/api/users/:username/events/:title', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("UPDATE events SET title = $2, start = $3, end = $4 WHERE username = $1 AND title = $2 returning *",
		[req.params.username, req.body.title, req.body.start, req.body.end]);

		res.status(200).json({
			status: "success",
			data: {
				event: results.rows[0]
			},
			message: `Updated event #${req.params.id}`
		});
	} catch (err) {
		res.status(500).json({message: err.message})
	}
});

// Delete a specific event for a user
app.delete('/api/users/:username/events/:title', async (req, res) => {
	try {
		if (req.session.user.username != req.params.username) {
			res.status(401).json({message: "Unauthorized"});
			return;
		}

		const results = await db.query("DELETE FROM events WHERE username = $1 AND title = $2 returning *", [req.params.username, req.params.title]);

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