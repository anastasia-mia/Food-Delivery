const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',    // Your MySQL host (usually 'localhost')
    user: 'root',         // Your MySQL user
    password: 'Kolia228', // Your MySQL password
    database: 'test',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', connection.threadId);
});

// Close the connection
connection.end();