var express = require('express');
var router = express.Router();

var all = [{ id: 1, name: 'igor tavares', age: 32 },
           { id: 2, name: 'kenia monteiro', age: 39 }];

router.get('/all', function(req, res, next) {
    res.send(all);
});

router.get('account:id', function (req, res, next) {
    res.send(all[0]);
});

module.exports = router;