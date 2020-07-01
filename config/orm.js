// Import MySQL Connection
const connection = require(`./connection`);

// Helper Functions
// Get correct number of ? for query
const qMarks = (num) => {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(`?`);
    } 
    return arr.toString();
};
// set correct syntax for values like id=1
const makeSql = (ob) =>{
    var arr = [];
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === `string` && value.indexOf(` `) >= 0) {
        value = `'${value}'`;
        }
        arr.push(`${key}=${value}`);
      }
    }
    return arr.toString();
};

// ORM
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
        let queryString = `INSERT INTO ${table}`;
        queryString += ` (${cols.toString()}) VALUES `;
        queryString += `(${qMarks(vals.length)})`;  
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