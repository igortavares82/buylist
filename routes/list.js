module.exports = function(app) {

    var route = '/list';
    var all = [{ id: 1, name: 'my list', count: 2 },
               { id: 2, name: 'kenia list', count: 39 }];

    app.get(route + '/all', function(req, res) {
        res.send(all);
    });
}