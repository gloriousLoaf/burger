// Dependencies
const express = require(`express`);
const burger = require(`../models/burger`);
const router = express.Router();

/* Routes */
// GET burgers
router.get(`/`, (req, res) => {
    // Handlebars obj
    burger.all((data) => {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render(`index`, hbsObject);
    });
});

// POST new burger
router.post(`/api/burgers`, (req, res) => {
    burger.insert([`name`, `devoured`], [req.body.name, req.body.devoured], (result) => {
        res.json({ id: result.insertId });
    });
});

// PUT ie eat a burger
router.put(`/api/burgers/:id`, function (req, res) {
    const condition = `id = ${req.params.id}`;
    console.log(`condition`, condition);
    burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// Export
module.exports = router;