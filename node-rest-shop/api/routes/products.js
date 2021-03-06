const express = require('express');

// subpackage w/ capibilities to handle different routes w/ diff endpoints
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

// Handles GET requests
router.get('/', (req,res,next) => {
    Product.find()
    // JS Promise
    .exec()
    .then(docs => {
        console.log(docs);
        // if docs is empty, returns empty array, not null
        //if (docs.length >= 0) {
            res.status(200).json(docs);
        }
       // else {
       //     res.status(404).json({
       //         message: 'No entries found'
       //     });
        //}
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
});

router.post('/', (req,res,next) => {
  // Constructor 
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    // Stores into database
    product.save().then(result => {
        console.log(result);
    })
    .catch(err =>  {
        console.log(err);
        res.status(500).json({error : err});
    });

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req,res,next) => {
    const id = req.params.productId;

    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);

        }
        else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });      
});

router.patch('/:productId', (req,res,next) => {
    const id = req.params.productId;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps[ops.propName]  = ops.value;
    }
    Product.update({_id : id}, {$set: updateOps })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).listenerCount({
            erorr: err
        });
    });
});

router.delete('/:productId', (req,res,next) => {
    const id = req.params.productId;

    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
 });

module.exports = router;
