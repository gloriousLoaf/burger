// Import MySQL Connection
const connection = require(`./connection`);

// Build ORM
const orm = {
    // template
    selectAll: (input, cb) => {
        const queryString = `SELECT * FROM ${input};`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    /* insertOne: (data, cb) => {
        const queryString = ``;
        connection.query(queryString, (err,res) => {
            if (err) throw err;
            cb(res)
        });
    },
    updateOne: (data, cb) => {
        const queryString = ``;
        connection.query(queryString, (err,res) => {
            if (err) throw err;
            cb(res)
        });
    } */
};

// Export
module.exports = orm;