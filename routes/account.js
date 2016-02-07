module.exports = function(app) {

    var route = '/account';
    var all = [{ id: 1, name: 'igor tavares', age: 32 },
               { id: 2, name: 'kenia monteiro', age: 39 }];

    app.get(route + '/all', function(req, res) {
        res.send(all);
    });

    app.get(route + '/get/:id', function (req, res) {

        res.send(all[req.params.id]);
    });

    app.post(route + '/create', function (req, res) {

        res.send(all[req.param('id')]);
    });

    app.put(route + '/update', function (req, res) {

        res.send(all[req.param('id')]);
    });

    app.delete(route + '/delete', function (req, res) {

        res.send(all[req.param('id')]);
    });
}