module.exports = (function () {

    var uri = 'mongodb://127.0.0.1:27017/buylist';

    this.mongoose = require('mongoose');
    this.mongoose.connection.on('connected', function (){ console.log('mongo database connected on 127.0.0.1 port 27017'); });
    this.mongoose.connection.on('error', function (err) { console.log(err); });
    this.mongoose.connection.on('open', function (err) { console.log('mongoose opened connection'); });
    this.mongoose.connection.on('close', function (err) { console.log('mongoose closed connection'); });

    this.connection = this.mongoose.connection;

    this.open = function () {

        this.mongoose.connect(uri);
    }

    this.close = function () {

        this.mongoose.connection.close();
    }

    return {

        mongoose: mongoose,
        connection: mongoose.connection,
        open: open,
        close: close
    }

})();


