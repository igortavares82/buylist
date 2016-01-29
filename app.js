var express = require('express');
var users = require('./routes/accounts.js');

var app = express();

app.use('/', routes);
app.use('/accounts', accounts);

app.listen(3000);
console.log('listening on port 3000');
