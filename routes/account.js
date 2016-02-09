module.exports = function(app) {

    var route = '/account';
    var mongoose = require('../helpers/mongoose.js');
    var schemas = require('../helpers/schema');
    var model = new mongoose().mongoose.model('Account', new schemas().account(), 'accounts');

    app.get(route + '/all', function(req, res) {

        try {

            model.find({}, function (err, docs) {

                res.send(docs);
            });

        } catch (ex) {

            res.send(ex);
        }

    });

    app.get(route + '/get/:id', function (req, res) {

        try {

            model.find({ _id: req.params.id }, function (err, docs) {

                res.send(docs);
            });

        } catch (ex) {

            res.send(ex);
        }
    });

    app.post(route + '/create', function (req, res) {

        try {

            var account = new model({

                name: req.body.name,
                birth: req.body.birth,
                email: req.body.email,
                isActive: req.body.isActive,
                username: req.body.username,
                password: req.body.password

            }).save(function (err) {

                if (err)
                    res.send(err);
                else
                    res.send("account saved successfully");
            });

        } catch (ex) {

        }
    });

    app.put(route + '/update', function (req, res) {

        res.send(all[req.param('id')]);
    });

    app.delete(route + '/delete', function (req, res) {

        res.send(all[req.param('id')]);
    });
}