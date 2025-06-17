const express = require('express')
const router = express.Router()
const db = require('../database')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

// router.get('/', async (req, res) => {
//     const result = await db.query('SELECT * FROM menus')
//     res.status(200).send(result.rows) 
// });

router.get('/', async (req, res) => {
    const menus = await prisma.menus.findMany()
    console.log(menus);
    res.json({ message: menus });
})

router.post('/', async (req, res) => {
    const { plate, description, price, is_available, image } = req.body;
    const newMeal = await prisma.menus.create({
        data: {
            plate: plate,
            description: description,
            price: price,
            is_available: is_available,
            image: image 
        }
    })
    res.json(newMeal)
})


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const updatedMenu = await prisma.menus.update({
            where: { id: parseInt(id)},
            data: { description }
        });

        res.json(updatedMenu);
    } catch (error) {
        console.error('Erreur Prisma:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMenu = await prisma.menus.delete({
            where: { id: parseInt(id)},
        })

        res.json(deletedMenu)
    } catch (error) {
        console.error('Erreur Prisma:', error);
        res.status(500).json({ error: error.message }); 
    }

})
module.exports = router;      