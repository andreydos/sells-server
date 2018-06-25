const express = require('express'),
    router = express.Router(),
    {ObjectId} = require('mongodb'),
    db = require('../db');

router.get('/get/:id*', function(req, res) {
    const collection = db.get().collection('clients'),
        userId = req.params.id;

    collection.find().toArray(function(err, docs) {
        if (err) {
            res.send(JSON.stringify({result: 'error', message: 'Server error'}));
        }

        const filtered = docs.filter((doc) => {
            return userId === doc.userId;
        });

        res.send(JSON.stringify({result: 'success', message: 'Successfully load clients', clients: filtered}));
    });
});

router.post('/', function(req, res) {
    const clientData = req.body,
        collection = db.get().collection('clients');

    // Insert client
    collection.insertOne(clientData)
        .then((doc)=>{
            console.log("Inserted new client into the collection");
            res.send(
                JSON.stringify({result: 'success',
                    message: 'Successfully saved new client',
                    type: 'success',
                    dbClientId: doc.insertedId})
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

router.get('/delete/:id*', function(req, res) {
    const id = ObjectId(req.params.id),
        collection = db.get().collection('clients');

    collection.remove( {"_id": id} )
        .then(() => {
            res.send(
                JSON.stringify({
                    message: 'Successfully removed client',
                    type: 'info'})
            );
        })
        .catch((e)=> {
            console.log(e);
            res.send(
                JSON.stringify({
                    message: 'Error when remove the client from db',
                    type: 'warn'})
            );
        });
});

module.exports = router;
