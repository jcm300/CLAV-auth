var express = require('express');
var router = express.Router();

var Auth = require('../controllers/auth')
var { match } = require('path-to-regexp')
const routePermissions = require('../config/permissions')
const api_version = require('../config/vars').APIVersion

const { validationResult } = require('express-validator')
const { existe, estaEm, vcVerbo, eObjeto } = require('./validation')

function getPermissions(method, path){
    var ret = null

    if(method in routePermissions){
        for(const route of Object.keys(routePermissions[method])){
            //troca a env pela versão da API
            var r = route.replace("{api_version}", api_version)
            //remove o '/' se estiver presente no fim da rota
            r = r.replace(/\/$/, "")

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

router.post('/auth', [
    estaEm('body', 'method', vcVerbo),
    existe('body', 'path')
        .bail()
        .isURL({
            require_tld: false,
            require_host: false,
            require_valid_protocol: false
        })
        .withMessage("Não é um caminho válido"),
    eObjeto('body', 'query'),
    eObjeto('body', 'headers')
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array())
    }

    const permissions = getPermissions(req.body.method, req.body.path)

    var querystring = ""
    var entries = Object.entries(req.body.query)

    if(entries.length > 0){
        querystring = "?" + entries.map(e => `${e[0]}=${e[1]}`).join("&")
    }
    req.url = req.body.path + querystring

    req.query = req.body.query
    req.headers = req.body.headers

    if(permissions != null){
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
