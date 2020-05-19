var express = require('express');
var router = express.Router();

var Auth = require('../controllers/auth')
var { match } = require('path-to-regexp')
//const match = match(path, { encode: encodeURI, decode: decodeURIComponent })

router.post('/auth', (req, res) => {

    res.jsonp({ title: 'Express' });
});

module.exports = router;
