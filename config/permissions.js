/*
 * Dicionário onde é indicado que tipo de utilizadores ou chaves API podem aceder
 * Regras:
 *   Se permissão for '-1' então não está protegido (qq pessoa pode aceder)
 *   Se permissão for '0' então todos podem aceder se autenticados (utilizadores e chaves API)
 *   Se permissão é um número maior que 0 então só podem aceder os utilizadores com nível maior ou igual à permissão
 *   Se permissão é uma lista de números então só podem aceder os utilizadores em que o seu nível está na lista
 *   A ordem é importante: as rotas são testadas por ordem e ao primeiro match é assumido esse valor
*/
module.exports = {
    GET: {
        //auth
        "/auth/:id": 0,
        //autosEliminacao
        "/autosEliminacao/:id": 0,
        "/autosEliminacao/": 0,
        //chaves
        "/chaves/clavToken": -1,
        "/chaves/:id": 7,
        "/chaves/": 6,
        //classes
        "/classes/titulo": 0,
        "/classes/codigo": 0,
        "/classes/justificacao/:id": 0,
        "/classes/:id/meta": 0,
        "/classes/:id/descendencia": 0,
        "/classes/:id/notasAp": 0,
        "/classes/:id/exemplosNotasAp": 0,
        "/classes/:id/notasEx": 0,
        "/classes/:id/ti": 0,
        "/classes/:id/dono": 0,
        "/classes/:id/participante": 0,
        "/classes/:id/procRel/:idRel": 0,
        "/classes/:id/procRel/": 0,
        "/classes/:id/legislacao": 0,
        "/classes/:id/pca": 0,
        "/classes/:id/df": 0,
        "/classes/:id/": 0,
        "/classes/": 0,
        //docs
        "/docs": -1,
        //documentacaoCientifica
        "/documentacaoCientifica/classes": 0,
        "/documentacaoCientifica/exportar": [4, 5, 6, 7],
        "/documentacaoCientifica/:id/ficheiro": 0,
        "/documentacaoCientifica/:id/": 0,
        "/documentacaoCientifica/": 0,
        //documentacaoApoio
        "/documentacaoApoio/formulario": 0,
        "/documentacaoApoio/classes": 0,
        "/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/ficheiro": 0
        "/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/": 0,
        "/documentacaoApoio/:id/entradas/:idEnt/elementos/": 0,
        "/documentacaoApoio/:id/entradas/:idEnt/": 0,
        "/documentacaoApoio/:id/entradas/": 0,
        "/documentacaoApoio/:id/": 0,
        "/documentacaoApoio/": 0,
        //entidades
        "/entidades/sigla": 0,
        "/entidades/designacao": 0,
        "/entidades/:id/tipologias": 0,
        "/entidades/:id/intervencao/dono": 0,
        "/entidades/:id/intervencao/participante": 0,
        "/entidades/:id/": 0,
        "/entidades/": 0,
        //exemplosNotasAp
        "/exemplosNotasAp/exemploNotaAp": 0,
        "/exemplosNotasAp/": 0,
        //indicadores
        "/indicadores/classesN4": 3.5,
        "/indicadores/classesN3": 3.5,
        "/indicadores/classesN2": 3.5,
        "/indicadores/classesN1": 3.5,
        "/indicadores/classes": 3.5,
        "/indicadores/entidadesAtivas": 3.5,
        "/indicadores/entidades": 3.5,
        "/indicadores/tipologias": 3.5,
        "/indicadores/legVigor": 3.5,
        "/indicadores/leg": 3.5,
        "/indicadores/relstats": 3.5,
        "/indicadores/critstats": 3.5,
        "/indicadores/dfstats": 3.5,
        "/indicadores/relacoes/:relacao": 3.5,
        "/indicadores/df/:df": 3.5,
        "/indicadores/critJust/:critJust": 3.5,
        "/indicadores/critJust/": 3.5,
        "/indicadores/tabela": 3.5,
        //indicePesquisa
        "/indicePesquisa": 0,
        //invariantes
        "/invariantes/testarTodos": 6,
        "/invariantes/": 6,
        //legislacao
        "/legislacao/portarias": 0,
        "/legislacao/numero": 0,
        "/legislacao/:id/processos": 0,
        "/legislacao/:id/": 0,
        "/legislacao/": 0,
        //logs
        "/logs/verbo": 6, 
        "/logs/": 6 ,
        //logsAgregados
        "/logsAgregados/rotas": 6, 
        "/logsAgregados/total": 6,
        "/logsAgregados/": 6,
        //notasAp
        "/notasAp/notaAp": 0,
        "/notasAp/": 0,
        //noticias
        "/noticias/:id": 0,
        "/noticias/": 0,
        //ontologia
        "/ontologia/descricao": 0,
        "/ontologia/data": 0,
        "/ontologia/": 0,
        //parametros
        "/parametros/:parametro": 7.
        "/parametros/": 7,
        //pedidos
        "/pedidos/:codigo": [1, 3, 3.5, 4, 5, 6, 7],
        "/pedidos/": [1, 3, 3.5, 4, 5, 6, 7],
        //pendentes
        "/pendentes/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/pendentes/": [1, 3, 3.5, 4, 5, 6, 7],
        //reload
        "/reload/cache": 7,
        //tabelasSelecao
        "/tabelasSelecao/:id/classes": 0
        "/tabelasSelecao/:id/": 0,
        "/tabelasSelecao/": 0,
        //termosIndice
        "/termosIndice/quantos": 0,
        "/termosIndice/termoIndice": 0,
        "/termosIndice/": 0,
        //tipologias
        "/tipologias/sigla": 0,
        "/tipologias/designacao": 0,
        "/tipologias/:id/intervencao/dono": 0,
        "/tipologias/:id/intervencao/participante": 0,
        "/tipologias/:id/elementos": 0,
        "/tipologias/:id/": 0,
        "/tipologias/": 0,
        //travessiaDeSintese
        "/travessiaDeSintese/reset": 7,
        "/travessiaDeSintese/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/travessiaDeSintese/": [1, 3, 3.5, 4, 5, 6, 7],
        //travessiaEspecial
        "/travessiaEspecial/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/travessiaEspecial/": [1, 3, 3.5, 4, 5, 6, 7],
        //travessiaV2
        "/travessiaV2": [1, 3, 3.5, 4, 5, 6, 7],
        //travessia
        "/travessia/reset": 7,
        "/travessia/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/travessia/": [1, 3, 3.5, 4, 5, 6, 7],
        //users
        "/users/:id": 1,
        "/users/": 5,
        ///vocabularios
        "/vocabularios/:id": 0,
        "/vocabularios/": 0
    },
    POST: {
        //auth
        "/auth/adicionar": 0,
        //autosEliminacao
        "/autosEliminacao/importar": [1, 3, 3.5, 4, 5, 6, 7],
        "/autosEliminacao/": [1, 3, 3.5, 4, 5, 6, 7],
        //chaves
        "/chaves/": -1,
        //documentacaoCientifica
        "/documentacaoCientifica/importar": [4, 5, 6, 7],
        "/documentacaoCientifica/": [4, 5, 6, 7],
        //documentacaoApoio
        "/documentacaoApoio/:id/entradas/:idEnt/": [4, 5, 6, 7],
        "/documentacaoApoio/:id/": [4, 5, 6, 7],
        "/documentacaoApoio/": [4, 5, 6, 7],
        //entidades
        "/entidades": 4,
        //invariantes
        "/invariantes/": 6,
        //legislacao
        "/legislacao/": 4,
        //noticias
        "/noticias/": [4, 5, 6, 7],
        //ontologia
        "/ontologia": 7,
        //pedidos
        "/pedidos/:codigo/distribuicao": [1, 3, 3.5, 4, 5, 6, 7],
        "/pedidos/": [1, 3, 3.5, 4, 5, 6, 7],
        //pendentes
        "/pendentes": [1, 3, 3.5, 4, 5, 6, 7],
        //tabelasSelecao
        "/tabelasSelecao/importar": [1, 3, 3.5, 4, 5, 6, 7],
        //tipologias
        "/tipologias": 4,
        //travessiaDeSintese
        "/travessiaDeSintese": 7,
        //travessia
        "/travessia": 7,
        //users
        "/users/login": -1,
        "/users/callback": -1,
        "/users/recuperar": -1,
        "/users/registarParaEntidade": 5,
        "/users/registarCC": 5
        "/users/registar": 5,
        //vocabularios
        "/vocabularios/termo/:idVC": [1, 3, 3.5, 4, 5, 6, 7],
        "/vocabularios/": [1, 3, 3.5, 4, 5, 6, 7]
    },
    PUT: {
        //chaves
        "/chaves/renovar": -1,
        "/chaves/:id/desativar": 7,
        "/chaves/:id/ativar": 7,
        "/chaves/:id/atualizar": 7,
        //documentacaoCientifica
        "/documentacaoCientifica/:id": [4, 5, 6, 7],
        //documentacaoApoio
        "/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/": [4, 5, 6, 7]
        "/documentacaoApoio/:id/entradas/:idEnt/": [4, 5, 6, 7],
        "/documentacaoApoio/:id/": [4, 5, 6, 7],
        //entidades
        "/entidades/:id/extinguir": 4,
        "/entidades/:id/": 4,
        //legislacao
        "/legislacao/:id": 4,
        //noticias
        "/noticias/:id": [4, 5, 6, 7],
        //parametros
        "/parametros/:parametro": 7,
        //pedidos
        "/pedidos": [1, 3, 3.5, 4, 5, 6, 7],
        //pendentes
        "/pendentes": [1, 3, 3.5, 4, 5, 6, 7],
        //tipologias
        "/tipologias/:id": 4,
        //users
        "/users/:id/desativar": 5
        "/users/:id/nic": 7
        "/users/:id/password": 1
        "/users/:id/": 5,
        //vocabularios
        "/vocabularios/:id": [1, 3, 3.5, 4, 5, 6, 7]
    },
    DELETE: {
        //auth
        "/auth/": 7,
        //chaves
        "/chaves/:id": 7,
        //documentacaoCientifica
        "/documentacaoCientifica/:id": [4, 5, 6, 7],
        //documentacaoApoio
        "/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/": [4, 5, 6, 7],
        "/documentacaoApoio/:id/entradas/:idEnt/": [4, 5, 6, 7],
        "/documentacaoApoio/:id/": [4, 5, 6, 7],
        //logs
        "/logs": 7,
        //logsAgregados
        "/logsAgregados": 7,
        //noticias
        "/noticias/:id": [4, 5, 6, 7],
        //pedidos
        "/pedidos": 7,
        //pendentes
        "/pendentes/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/pendentes/": 7,
        //users
        "/users/:id": 7,
        //vocabularios
        "/vocabularios/termo/:id": [1, 3, 3.5, 4, 5, 6, 7]
    }
}
