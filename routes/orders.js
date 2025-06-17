const express = require('express')
const router = express.Router()
const db = require('../database')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// router.get('/', async (req, res) => {
//     const result = await db.query('SELECT * FROM orders')
//     res.status(200).send(result.rows)
// });

router.get('/', async (req, res) => {
    const orders = await prisma.orders.findMany()
    console.log(orders);
    res.json({ message: orders });
})

router.get('/:id', async (req, res) => {
    const orderId = await prisma.orders.findMany()
    const { id } = req.params;

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

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        res.status(200).json(result.rows[0])

    } catch (error) {
        res.status(500).send({ error });
    }
})

router.post('/', async (req, res) => {
    const { user_id, menu_id, quantity } = req.body

    if (!user_id) {
        return res.status(400).json({ message: `Merci d'entrer un prénom` });
    } if (!menu_id) {
        return res.status(400).json({ message: `Merci de choisir un menu` });
    } if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: `Merci de sélectionner au minimum 1 article` });
    }

    try {
        const insertResult = await db.query(
            `INSERT INTO orders (user_id, menu_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [user_id, menu_id, quantity]
        )
        res.status(201).json({ message: 'Commande créée', order: insertResult.rows[0] });
    }

    catch (error) {
        res.status(500).send({ error });
    }
})



module.exports = router;   