var express = require('express');
var router = express.Router();

var Auth = require('../controllers/auth')
var { match } = require('path-to-regexp')
const routePermissions = require('../config/permissions')
const api_version = require('../config/vars').APIVersion

function getPermissions(method, path){
    var ret = null

    if(method in routePermissions){
        for(const route of Object.keys(routePermissions[method])){
            r = route.replace("{api_version}", api_version)
            const matchF = match(r, {
                encode: encodeURI,
                decode: decodeURIComponent
            })

            if(matchF(path)){
                ret = routePermissions[method][route]
                break
            }
        }
    }

    return ret
}

router.post('/auth', (req, res) => {
    const permissions = getPermissions(req.body.method, req.body.path)

    req.query = req.body.query
    req.headers = req.body.headers

    if(permissions){
        if(permissions instanceof Array){
            Auth.isLoggedInUser(req, res, user => {
                if (permissions.includes(user.level)) {
                    res.jsonp(user)
                }else{
                    res.status(403).send('Não tem permissões suficientes para aceder')
                }   
            })
        } else if (permissions == -1) {
            res.jsonp({})
        } else if (permissions == 0) {
            Auth.isLoggedInKey(req, res)
        } else {
            Auth.isLoggedInUser(req, res, user => {
                if (user.level >= permissions) {
                    res.jsonp(user)
                }else{
                    res.status(403).send('Não tem permissões suficientes para aceder')
                }   
            })
        }
    }else{
        res.status(404).send('Not Found')
    }
});

module.exports = router;
