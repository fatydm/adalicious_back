const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM menus')
    res.status(200).send(result.rows) 
});

module.exports = router; 