const express = require('express');

// subpackage w/ capibilities to handle different routes w/ diff endpoints
const router = express.Router();

// Handles GET requests
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;

    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    }
    else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

module.exports = router;