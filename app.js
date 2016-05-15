var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var config = require('./config');

app.set('port', process.env.PORT || 3000);
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//app.use('/', require('./helpers/tokenvalidator'));

app.set('account', require('./routes/account')(app));
app.set('list', require('./routes/list')(app));
app.set('listitem', require('./routes/listitem')(app));

http.createServer(app).listen(app.get('port'), function() {

  console.log('Express server listening on port ' + app.get('port'));
});