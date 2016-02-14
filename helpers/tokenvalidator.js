
var config = require('../config');

module.exports = function(req, res, next) {

    var jwt = require('jsonwebtoken');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var exceptions = ['/account/auth/'];

    // libera algumas url's que não necessitam de token. ex: /account/auth
    for (var ex in exceptions) {

        var url = req.url;

        if (url.lastIndexOf('/') < 0)
            url = url + '/';

        if (exceptions[ex] == url) {

            next();
            return false;
        }
    }

    if (token) {

        jwt.verify(token, config.secret, function(err, decoded) {

            if (err) {

                return res.json({ success: false, message: 'failed to authenticate token.' });

            } else {

                req.decoded = decoded;
                next();
              }

        });

    } else {

        return res.status(403).send({
            success: false,
            message: 'no token provided.'
        });
    }
}