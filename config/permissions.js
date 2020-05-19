/*
 * Dicionário onde é indicado que tipo de utilizadores ou chaves API podem aceder
 * Regras:
 *   Se permissão for '-1' então não está protegido (qq pessoa pode aceder)
 *   Se permissão for '0' então todos podem aceder (utilizadores e chaves API)
 *   Se permissão é um número maior que 0 então só podem aceder os utilizadores com nível maior ou igual à permissão
 *   Se permissão é uma lista de números então só podem aceder os utilizadores em que o seu nível está na lista
 *   A ordem é importante: as rotas são testadas por ordem e ao primeiro match é assumido esse valor
*/
module.exports = {
    GET: {
        "/auth": {
            "/:id": 0
        },
        "/autosEliminacao": {
            "/:id": 0,
            "/": 0
        },
        "/chaves": {
            "/clavToken": -1,
            "/:id": 7,
            "/": 6
        }
    },
    POST: {
        "/auth": {
            "/adicionar": 0
        },
        "/autosEliminacao": {
            "/importar": [1, 3, 3.5, 4, 5, 6, 7],
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/chaves": {
            "/": -1
        }
    },
    PUT: {
        "/chaves": {
            "/renovar": -1,
            "/:id": {
                "/desativar": 7,
                "/ativar": 7,
                "/atualizar": 7
            }
        }
    },
    DELETE: {
        "/auth": {
            "/": 7
        },
        "/chaves": {
            "/:id": 7
        }
    }
}
