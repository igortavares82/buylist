module.exports = function(app) {

    var route = '/list';
    var mongoose = require('../helpers/mongoose.js');
    var schemas = require('../helpers/schema');
    var model = mongoose.mongoose.model('List', new schemas().list(), 'lists');

    app.get(route + '/all', function(req, res) {

        try {

            mongoose.open();

            model
            .find({})
            .populate('account')
            .populate('items')
            .exec(function (err, docs) {

               res.send(docs);
               mongoose.close();

            });

        } catch (ex) {

            res.send(ex);
        }

    });

    app.get(route + '/paginate/:current/:pagesize', function(req, res) {

        try {

            mongoose.open();

            model
            .find({_id: {$gt: req.params.current}})
            .skip(N * req.params.pagesize)
            .limit(req.params.pagesize)
            .populate('account')
            .populate('items')
            .sort({_id: -1})
            .exec(function(err, docs){

                res.send(docs);

            });

        } catch (ex) {

            res.send(ex);
        } finally {

            mongoose.close();
        }

    });

    app.post(route + '/create', function (req, res) {

        try {

            mongoose.open();

            model({

                name: req.body.name,
                createDate: new Date(),
                account: req.body.account,
                isPublic: false,
                isDraft: true,
                description: req.body.description,
                items: req.body.items

            }).save(function (err) {

                if (err)
                    res.send(err);
                else
                    res.send("list saved successfully");

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
                        account: req.body.account,
                        isPublic: req.body.isPublic,
                        isDraft: req.body.isDraft,
                        description: req.body.description,
                        items: req.body.items
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
                    res.send('list deleted successfully');
            });

        } catch(ex) {

            res.send(ex);
        }

    });
}