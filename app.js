const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()

const menuRoutes = require('./routes/menu') 
const ordersRoutes = require('./routes/orders')

app.use(cors());
app.use(express.json());

const port = 5005;

app.use('/menus', menuRoutes) 

app.use('/orders', ordersRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
}); 