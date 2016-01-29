var express = require('express');
var app = express();

app.get('/users', function(req, res) {

    res.send([{ name: 'igor tavares', age: 32 }]);
});

app.listen(3000);
console.log('listening on port 3000');
