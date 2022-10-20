const express = require('express');
const router = express.Router();

const User = require('../models/User');


/* Get all item */
router.get('/users', async (req, res, next) => {
    const {q} = req.query;
    const filter = q ? {$or: [{firstname: new RegExp(q, 'i')}, {lastname: new RegExp(q, 'i')}]} : {};

    try {
        const users = await User.find(filter).sort({lastname: 1});
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

/* Get a single item */
router.get('/users/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        !user ? res.status(404).json({error: `User with id=${id} not found!`}) : res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

/* Insert a new item */
router.post('/users', async (req, res, next) => {
    const {body} = req;
    delete body._id;

    try {
        const user = await User.create({...body, active: true});
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

/* Edit an item */
router.put('/users/:id', async (req, res, next) => {
    const {id} = req.params,
        {body} = req;

    delete body._id;

    try {
        const user = await User.findOneAndUpdate({_id: id}, {...body, active: true}, {new: true});
        !user ? res.status(404).json({error: `User with id=${id} not found!`}) : res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

/* Delete an item - logical delete: set `active=false` */
router.delete('/users/:id', async (req, res, next) => {
    const {id} = req.params;

    try {
        const user = await User.findOneAndUpdate({_id: id}, {active: false});
        !user ? res.status(404).json({error: `User with id=${id} not found!`}) : res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
