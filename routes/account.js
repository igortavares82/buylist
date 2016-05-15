module.exports = function(app) {

    var route = '/account';
    var mongoose = require('../helpers/mongoose.js');
    var schemas = require('../helpers/schema');
    var jwt = require('jsonwebtoken');
    var model = mongoose.mongoose.model('Account', new schemas().account(), 'accounts');


    app.get(route + '/all', function(req, res) {

        try {

            mongoose.open();

            model.find({})
            .populate('lists')
            .exec(function (err, docs) {

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

            model.find({ _id: req.params.id })
            .populate('lists')
            .exec(function (err, docs) {

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

                var token = jwt.sign(ac, app.get('superSecret'), {});

                res.send({
                    success: true,
                    message: 'authentication performed successfully',
                    account: ac,
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
                lists: req.body.lists,
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

        try {

            mongoose.open();

            model.update(
            { _id: req.body.id },
            {
                $set: {
                    name: req.body.name,
                    birth: req.body.birth,
                    email: req.body.email,
                    isActive: req.body.isActive,
                    lists: req.body.lists,
                }
            },
            function (err, place) {

                 if (err)
                    res.send(err);
                 else
                    res.send(place);

                mongoose.close();
            });

        } catch (ex) {

            res.send(ex);
        }
    });

    app.delete(route + '/delete', function (req, res) {


    });
}