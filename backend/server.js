const express = require('express');
const path = require('path');
const mainRouter = require('./routes/main');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/', mainRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
