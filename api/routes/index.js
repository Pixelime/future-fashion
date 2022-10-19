const express = require('express');
const router = express.Router();

/* Get all item */
router.get('/', function (req, res, next) {
    res.json({'katana': 'banana'});
});

/* Get a single item */
router.get('/:id', function (req, res, next) {
    const {id} = req.params;

    res.json({id});
});

/* Insert a new item */
router.post('/', function (req, res, next) {
    res.json({'katana': 'banana'});
});

/* Edit an item */
router.put('/:id', function (req, res, next) {
    const {id} = req.params;

    res.json({id});
});

/* Delete an item */
router.delete('/:id', function (req, res, next) {
    const {id} = req.params;

    res.json({success: true});
});

module.exports = router;
