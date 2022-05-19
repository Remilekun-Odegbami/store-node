const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3009

//api
router.get('/', (req, res) => {
    res.json({
        'All Products': `http://localhost:${PORT}/api/products`,
        'All Carts': `http://localhost:${PORT}/api/cart`,
        'All Contacts': `http://localhost:${PORT}/api/contact`
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('Created User');
})

// api/products
router.use('/products', require('./api/productRoutes'))

// api/cart
router.use('/cart', require('./api/cartRoutes'))

router.use('/contact', require('./api/contactRoutes'))



module.exports = router