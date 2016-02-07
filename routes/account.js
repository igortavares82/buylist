module.exports = function(app) {

    var route = '/account';
    var binder = require('model-binder');

    var database = require('../helpers/database.js');
    var db = new database().getConnection();

    app.get(route + '/all', function(req, res) {

    });

    app.get(route + '/get/:id', function (req, res) {

    });

    app.post(route + '/create', binder(require('../models/account')), function (req, res) {

        try {

        } catch (ex) {

        }

        res.send(all[req.param('id')]);
    });

    app.put(route + '/update', function (req, res) {

        res.send(all[req.param('id')]);
    });

    app.delete(route + '/delete', function (req, res) {

        res.send(all[req.param('id')]);
    });
}