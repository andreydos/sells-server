const express = require('express'),
    router = express.Router();

const db = require('../db');

router.get('/', function(req, res) {
    const collection = db.get().collection('clients');

    collection.find().toArray(function(err, docs) {
        if (err) {
            res.send(JSON.stringify({result: 'error', message: 'Server error'}));
        }

        res.send(JSON.stringify({result: 'success', message: 'Successfully load clients', clients: docs}));
    });
});

router.post('/', function(req, res) {
    const clientData = req.body,
        collection = db.get().collection('clients');

    // Insert user
    collection.insertOne(clientData)
        .then((doc)=>{
            console.log("Inserted new client into the collection");
            res.send(
                JSON.stringify({result: 'success',
                    message: 'Successfully saved new client',
                    type: 'success',
                    dbOrderId: doc.insertedId})
            );
        })
        .catch(()=>{
            console.log("Error when add the client to db");

            res.send(
                JSON.stringify({result: 'error',
                    message: 'Error when add the client to db',
                    type: 'warn'})
            );
        });
});

module.exports = router;
