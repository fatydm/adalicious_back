const express = require('express')
const router = express.Router()
const db = require('../database')

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM orders')
    res.status(200).send(result.rows)
});

router.get('/:id', async (req, res) => {
    const orderId = req.params.id

    try {
        const result = await db.query(
            `SELECT orders.id,
                    users.firstname,
                    menus.plate,
                    orders.quantity,
                    orders.status,
                    orders.created_at AS order_date
            FROM orders
            JOIN users ON orders.user_id = users.id
            JOIN menus ON orders.menu_id = menus.id
            WHERE orders.id = $1
            `,
        [orderId])
        console.log(result.rows);
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).send({ error});
    } 
})

module.exports = router;  