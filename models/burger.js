// Dependency
const orm = require(`../config/orm`);

// Burger Modeler
const burger = {
    // use ORM methods to append and respond with callbacks
    all: (cb) => {
        orm.selectAll(`burgers`, (res) => {
            cb(res);
        });
    },
    insert: (cols, vals, cb) => {
        orm.insertOne(`burgers`, cols, vals, (res) => {
            cb(res);
        });
    },
    update: (objColVals, cond, cb) => {
        orm.updateOne(`burgers`, objColVals, cond, (res) => {
            cb(res);
        });
    }
};

// Export
module.exports = burger;