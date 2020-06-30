// Import MySQL Connection
const connection = require(`./connection`);

// Helper functions to concat MySQL queryString
const qMarks = (num) => {
    const arr = [];
    for (let i = 0; i < num.length; i++) {      // either loop, "num is not iterable" :(
        // for (i of num) {
        arr.push(`?`);
    }
    return arr.toString();
}

const makeSql = (ob) => {
    const arr = [];
    for (let key in ob) {
        let value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === `string` && value.indexOf(` `) >= 0) {
                value = `'${value}'`;
            }
            arr.push(`${key}=${value}`);
        }
    }
    return arr.toString();
}

// Build ORM
const orm = {
    // display data when GET route is hit
    selectAll: (table, cb) => {
        const queryString = `SELECT * FROM ${table};`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    // POST route
    insertOne: (table, cols, vals, cb) => {
        let qVals = qMarks(vals.length);
        let queryString = `INSERT INTO ${table};`;
        queryString += ` (${cols.toString()}) VALUES `;
        queryString += `(${qVals})`;
        console.log(queryString);
        connection.query(queryString, vals, (err, res) => {
            if (err) throw err;
            cb(res);
        });
    },
    // PUT route
    updateOne: (table, objColVals, cond, cb) => {
        let queryString = `UPDATE ${table} SET ${makeSql(objColVals)}`;
        queryString += ` WHERE ${cond}`;
        connection.query(queryString, (err, res) => {
            if (err) throw err;
            cb(res)
        });
    }
};

// Export
module.exports = orm;