// Import MySQL Connection
const connection = require(`./connection`);

function qMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push(`?`);
    }
  
    return arr.toString();
  }

function makeSql(ob) {
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