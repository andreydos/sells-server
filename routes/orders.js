const express = require('express'),
    router = express.Router(),
    {ObjectId} = require('mongodb'),
    db = require('../db');

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

router.get('/delete/:id*', function(req, res) {
    const id = ObjectId(req.params.id),
        collection = db.get().collection('orders');

    console.log(id);

    collection.remove( {"_id": id} )
        .then(() => {
            res.send(
                JSON.stringify({
                    message: 'Successfully removed order',
                    type: 'info'})
            );
        })
        .catch((e)=> {
            console.log(e);
            res.send(
                JSON.stringify({
                    message: 'Error when remove the orders from db',
                    type: 'warn'})
            );
        });
});

module.exports = router;
