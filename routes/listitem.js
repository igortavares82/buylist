module.exports = function (app) {

    var route = '/listitem';
    var mongoose = require('../helpers/mongoose.js');
    var schemas = require('../helpers/schema');
    var model = mongoose.mongoose.model('ListItem', new schemas().listitem(), 'ListItems');

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

    app.post(route + '/create', function (req, res) {

        try {

            mongoose.open();

            model({

                name: req.body.name,
                price: req.body.price,
                lastUpdate: new Date()

            }).save(function (err) {

                if (err)
                    res.send(err);
                else
                    res.send("list item saved successfully");

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
                        price: req.body.price,
                        lastUpdate: new Date()
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

        mongoose.open();

        try {

            model.remove({ _id: req.body.id }, function (err) {

                if (err)
                    res.send(err);
                else
                    res.send('list item deleted successfully');
            });

        } catch(ex) {

            res.send(ex);
        }

    });
}