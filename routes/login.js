const express = require('express'),
    router = express.Router();

router.get('/validate', function (req, res) {
    console.log('validate');

    res.send(JSON.stringify(
        {
            result: 'success',
        }
    ));
});
router.post('/', function (req, res) {
    console.log('login');
    res.send(JSON.stringify(
        {
            id: 1,
            token: '123test-token456'
        }
    ));
});

module.exports = router;
