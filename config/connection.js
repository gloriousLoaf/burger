// Dependecy
const mysql = require(`mysql`);

// DB Connection
const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `root`,
    database: `burgers_db`
});
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
});

// Export
module.exports = connection;