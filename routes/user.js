var express = require('express');
var router = express.Router();

var Auth = require('../controllers/auth')

router.post('/sign', (req, res) => {
    try{
        var token = Auth.generateTokenUser(req.body.user, req.body.expiresIn)
        res.jsonp({ token: token });
    }catch(error){
        res.status(500).send(error)
    }
});

router.post('/verify', (req, res) => {
    try{
        var decoded = Auth.verifyTokenUser(req.body.key)
        res.jsonp(decoded);
    }catch(error){
        res.status(500).send(error)
    }
});

module.exports = router;
