const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3009

//api
router.get('/', (req, res) => {
    res.json({
        'All Products': `http://localhost:${PORT}/api/products`,
        'Single Product': `http://localhost:${PORT}/api/products/:id`,
        'All Carts': `http://localhost:${PORT}/api/cart`,
        'All Contacts': `http://localhost:${PORT}/api/contact`,
        'Latest Products': `http://localhost:${PORT}/api/latest`,
        'Slashed Products': `http://localhost:${PORT}/api/slashed`
    })
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201).send('Created User');
})

// api/products
router.use('/products', require('./api/productRoutes'))

//single-product
router.use('/products/:id', require('./api/productRoutes'))

// api/cart
router.use('/cart', require('./api/cartRoutes'))

//contact
router.use('/contact', require('./api/contactRoutes'))

//slashed
router.use('/slashed', require('./api/slashedRoutes'))

//latest
router.use('/latest', require('./api/latestRoutes'))



module.exports = router