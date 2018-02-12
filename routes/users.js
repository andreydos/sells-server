const express = require('express'),
    router = express.Router(),
    passwordHash = require('password-hash');

const db = require('../db');

router.get('/', function(req, res) {
    res.render('index', { title: 'API endpoints' });
});

router.get('/all', function(req, res) {
    const collection = db.get().collection('users');

    collection.find().toArray(function(err, docs) {
        res.json({data: docs});
    });
});

router.post('/signup', function(req, res) {
    const username = req.query.username,
        pass = req.query.password,
        password = passwordHash.generate(pass),
        collection = db.get().collection('users');

    // Insert user
    collection.insertOne(
        {
            username,
            password
        }
    )
        .then(()=>{
            console.log("Inserted new user into the collection");
        })
        .catch(()=>{
            console.log("Error when add the user to db");
        });

    res.json({username, password});
});

module.exports = router;
