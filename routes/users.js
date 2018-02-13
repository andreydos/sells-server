const express = require('express'),
    router = express.Router(),
    passwordHash = require('password-hash');

const db = require('../db');

router.get('/', function(req, res) {
    res.render('index', { title: 'API endpoints' });
});

router.post('/login', function(req, res) {
    const username = req.body.username,
        password = req.body.password,
        collection = db.get().collection('users');

    collection.find().toArray(function(err, docs) {
        if (err) return;

        const user = docs.find((doc) => {
            return doc.username === username;
        });

        if (user) {
            if (passwordHash.verify(password, user.password)) {
                res.send(JSON.stringify({result: 'success', message: 'Successful login', user: { name: username}}));
            } else {
                res.send(JSON.stringify({result: 'error', message: 'Incorrect password'}));
            }
        } else {
            res.send(JSON.stringify({result: 'error', message: 'User not found'}));
        }
    });
});

router.post('/signup', function(req, res) {
    const username = req.body.username,
        pass = req.body.password,
        password = passwordHash.generate(pass),
        collection = db.get().collection('users');

    // Insert user
    collection.insertOne({
            username,
            password
    })
    .then(()=>{
        console.log("Inserted new user into the collection");
        res.send(JSON.stringify({
            username
        }));
    })
    .catch(()=>{
        console.log("Error when add the user to db");
    });
});

module.exports = router;
