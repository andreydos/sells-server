const express = require('express'),
    router = express.Router(),
    {ObjectId} = require('mongodb'),
    db = require('../db');

router.get('/get/:id*', function(req, res) {
    const collection = db.get().collection('items'),
        userId = req.params.id;

    collection.find().toArray(function(err, docs) {
        if (err) {
            res.send(JSON.stringify({result: 'error', message: 'Server error'}));
        }

        const filtered = docs.filter((doc) => {
            return userId === doc.userId;
        });

        res.send(JSON.stringify({result: 'success', message: 'Successfully load items', items: filtered}));
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

router.get('/delete/:id*', function(req, res) {
    console.log("collection");
    const id = ObjectId(req.params.id),
        collection = db.get().collection('items');

    collection.remove( {"_id": id} )
        .then(() => {
            res.send(
                JSON.stringify({
                    message: 'Successfully removed item',
                    type: 'info'})
            );
        })
        .catch((e)=> {
            console.log(e);
            res.send(
                JSON.stringify({
                    message: 'Error when remove the item from db',
                    type: 'warn'})
            );
        });
});

module.exports = router;
