const express = require('express'),
    router = express.Router();

const db = require('../db');

router.get('/', function(req, res) {
    const collection = db.get().collection('orders');

    collection.find().toArray(function(err, docs) {
        if (err) {
            res.send(JSON.stringify({result: 'error', message: 'Server error'}));
        }

        res.send(JSON.stringify({result: 'success', message: 'Successfully load orders', orders: docs}));
    });
});

router.post('/', function(req, res) {
    const orderData = req.body,
        collection = db.get().collection('orders');

    console.log(orderData);

    // Insert user
    collection.insertOne(orderData)
        .then((doc)=>{
            console.log("Inserted new order into the collection");
            res.send(
                JSON.stringify({result: 'success',
                                message: 'Successfully saved new order',
                                type: 'success',
                                dbOrderId: doc.insertedId})
            );
        })
        .catch(()=>{
            console.log("Error when add the order to db");

            res.send(
                JSON.stringify({result: 'error',
                    message: 'Error when add the order to db',
                    type: 'warn'})
            );
        });
});

module.exports = router;
