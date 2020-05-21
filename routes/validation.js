const { oneOf, check, param, query, body, header, cookie } = require('express-validator');

const getLocation = {
    'param': param,
    'query': query,
    'body': body,
    'header': header,
    'cookie': cookie
}

module.exports.existe = function (location, field, ifF){
    ifF = ifF || undefined
    const msg = 'Valor é undefined, null ou vazio'

    try{
        if(!ifF){
            return getLocation[location](field, msg).exists({checkFalsy: true})
        }else{
            return getLocation[location](field, msg)
                .if(ifF)
                .exists({checkFalsy: true})
        }
    }catch(err){
        if(!ifF){
            return check(field, msg).exists({checkFalsy: true})
        }else{
            return check(field, msg)
                .if(ifF)
                .exists({checkFalsy: true})
        }
    }
}

module.exports.enumList = function(list){
    var strList = list.map(v => "'" + v + "'")
    var ret = list.length > 1 ? strList.slice(0, -1).join(", ") + ' e ' : ""
    ret += strList.slice(-1)
    return ret
}

module.exports.estaEm = function (location, field, list, ifF){
    var strList = module.exports.enumList(list)
    const msg = "Valor diferente de " + strList
    ifF = ifF || undefined

    return module.exports.existe(location, field, ifF)
        .bail()
        .isIn(list)
        .withMessage(msg)
}

module.exports.match = function(location, field, regex, ifF){
    const msg = `Formato Inválido. Não respeita o regex: '${regex}'`
    ifF = ifF || undefined

    return module.exports.existe(location, field, ifF)
        .bail()
        .matches(new RegExp(regex))
        .withMessage(msg)
}

module.exports.eObjeto = function (location, field, ifF){
    ifF = ifF || undefined

    return module.exports.existe(location, field, ifF)
        .bail()
        .custom(v => typeof v == "object")
        .withMessage("Não é um objeto")
}

module.exports.eJWT = function (location, field, ifF){
    ifF = ifF || undefined

    return module.exports.existe(location, field, ifF)
        .bail()
        .isJWT()
        .withMessage("Não é um JWT")
}

module.exports.eExpiresTime = function(location, field, ifF){
    ifF = ifF || undefined
    var regex = '^\\d+(ms|s|m|h|d|y)$'
    return module.exports.match(location, field, regex, ifF)
}

//Vocabulários
module.exports.vcVerbo = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
