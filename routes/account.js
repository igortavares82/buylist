module.exports = function(app) {

    var route = '/account';
    var mongoose = require('../helpers/mongoose.js');
    var schemas = require('../helpers/schema');
    var jwt = require('jsonwebtoken');
    var model = mongoose.mongoose.model('Account', new schemas().account(), 'accounts');

    app.get(route + '/all', function(req, res) {

        try {

            mongoose.open();

            model.find({}, function (err, docs) {

                res.send(docs);
                mongoose.close();
            });

        } catch (ex) {

            res.send(ex);

        }
    });

    app.get(route + '/get/:id', function (req, res) {

        try {

            mongoose.open();

            model.find({ _id: req.params.id }, function (err, docs) {

                res.send(docs);
                mongoose.close();
            });

        } catch (ex) {

            res.send(ex);

        }
    });

    app.post(route + '/auth', function (req, res) {

        mongoose.open();

        model.find({ username: req.body.username, password: req.body.password }, function (err, ac) {

            if (ac.length == 1) {

                var token = jwt.sign(ac, app.get('superSecret'), {

                    expiresInMinutes: 1440
                });

                res.send({
                    success: true,
                    message: 'authentication performed successfully',
                    token: token
                });
            } else {

                res.send({
                    success: false,
                    message: 'username or password not correct'
                });
            }

            mongoose.close();
        });
    });

    app.post(route + '/create', function (req, res) {

        try {

            mongoose.open();

            var account = new model({

                name: req.body.name,
                birth: req.body.birth,
                email: req.body.email,
                isActive: true,
                username: req.body.username,
                password: req.body.password

            }).save(function (err) {

                if (err)
                    res.send(err);
                else
                    res.send("account saved successfully");

                mongoose.close();
            });

        } catch (ex) {

            res.send(ex);
        }
    });

    app.put(route + '/update', function (req, res) {

        res.send(all[req.param('id')]);
    });

    app.delete(route + '/delete', function (req, res) {

        res.send(all[req.param('id')]);
    });
}