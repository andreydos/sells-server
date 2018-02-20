const express = require('express'),
    router = express.Router();

const db = require('../db');

router.get('/', function(req, res) {
    const collection = db.get().collection('items');

    collection.find().toArray(function(err, docs) {
        if (err) {
            res.send(JSON.stringify({result: 'error', message: 'Server error'}));
        }

        res.send(JSON.stringify({result: 'success', message: 'Successfully load items', items: docs}));
    });
});

router.post('/', function(req, res) {
    const itemData = req.body,
        collection = db.get().collection('items');

    // Insert user
    collection.insertOne(itemData)
        .then((doc)=>{
            console.log("Inserted new order into the collection");
            res.send(
                JSON.stringify({result: 'success',
                    message: 'Successfully saved new order',
                    type: 'success',
                    dbItemId: doc.insertedId})
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
