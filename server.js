const express = require('express');
const connectDB = require('./config/db');

const app = express();
//connect db
connectDB();

// init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/checkins', require('./routes/api/checkins'));
app.use('/api/habits', require('./routes/api/habits'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}` ));