var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('account', require('./routes/account')(app));
app.set('list', require('./routes/list')(app));

http.createServer(app).listen(app.get('port'), function() {

  console.log('Express server listening on port ' + app.get('port'));
});