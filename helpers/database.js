module.exports = function () {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var db = mongoose.connection;
    var uri = 'mongodb://127.0.0.1:27017/buylist';

    var dataschema = require('./dataschema');

    this.getConnection = function () {

        db.on('error', console.error);
        db.once('open', function (){ console.log('mongo database connected on 127.0.0.1 port 27017') });

        db = mongoose.connect(uri);
        createSchemas();

        return db;
    }

    var createSchemas = function () {

        var schema = new dataschema();

        mongoose.model('Account', new Schema(schema.account()));
        mongoose.model('List', new Schema(schema.list()));
        mongoose.model('ListItem', new Schema(schema.listitem()));
    }
}


