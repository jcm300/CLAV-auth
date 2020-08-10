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
        "/{api_version}/auth/:id": 0,
        //autosEliminacao
        "/{api_version}/autosEliminacao/:id": 0,
        "/{api_version}/autosEliminacao/": 0,
        //chaves
        "/{api_version}/chaves/clavToken": -1,
        "/{api_version}/chaves/:id": 7,
        "/{api_version}/chaves/": 7,
        //classes
        "/{api_version}/classes/titulo": 0,
        "/{api_version}/classes/codigo": 0,
        "/{api_version}/classes/justificacao/:id": 0,
        "/{api_version}/classes/:id/meta": 0,
        "/{api_version}/classes/:id/descendencia": 0,
        "/{api_version}/classes/:id/notasAp": 0,
        "/{api_version}/classes/:id/exemplosNotasAp": 0,
        "/{api_version}/classes/:id/notasEx": 0,
        "/{api_version}/classes/:id/ti": 0,
        "/{api_version}/classes/:id/dono": 0,
        "/{api_version}/classes/:id/participante": 0,
        "/{api_version}/classes/:id/procRel/:idRel": 0,
        "/{api_version}/classes/:id/procRel/": 0,
        "/{api_version}/classes/:id/legislacao": 0,
        "/{api_version}/classes/:id/pca": 0,
        "/{api_version}/classes/:id/df": 0,
        "/{api_version}/classes/:id/": 0,
        "/{api_version}/classes/": 0,
        //colaboracoes
        "/{api_version}/colaboracoes/exportar": [3.5, 4, 5, 6, 7],
        "/{api_version}/colaboracoes/:id/": 0,
        "/{api_version}/colaboracoes/": 0,
        //docs
        "/{api_version}/docs": -1,
        //documentacaoCientifica
        "/{api_version}/documentacaoCientifica/classes": 0,
        "/{api_version}/documentacaoCientifica/exportar": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoCientifica/:id/ficheiro": 0,
        "/{api_version}/documentacaoCientifica/:id/": 0,
        "/{api_version}/documentacaoCientifica/": 0,
        //documentacaoApoio
        "/{api_version}/documentacaoApoio/formulario": 0,
        "/{api_version}/documentacaoApoio/classes": 0,
        "/{api_version}/documentacaoApoio/exportar": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/ficheiro": 0,
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/": 0,
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/elementos/": 0,
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/": 0,
        "/{api_version}/documentacaoApoio/:id/entradas/": 0,
        "/{api_version}/documentacaoApoio/:id/": 0,
        "/{api_version}/documentacaoApoio/": 0,
        //entidades
        "/{api_version}/entidades/sigla": 0,
        "/{api_version}/entidades/designacao": 0,
        "/{api_version}/entidades/:id/tipologias": 0,
        "/{api_version}/entidades/:id/intervencao/dono": 0,
        "/{api_version}/entidades/:id/intervencao/participante": 0,
        "/{api_version}/entidades/:id/": 0,
        "/{api_version}/entidades/": 0,
        //exemplosNotasAp
        "/{api_version}/exemplosNotasAp/exemploNotaAp": 0,
        "/{api_version}/exemplosNotasAp/": 0,
        //ficheirosEstaticos
        "/{api_version}/ficheirosEstaticos/": 0,
        //indicadores
        "/{api_version}/indicadores/classesN4": 3,
        "/{api_version}/indicadores/classesN3": 3,
        "/{api_version}/indicadores/classesN2": 3,
        "/{api_version}/indicadores/classesN1": 3,
        "/{api_version}/indicadores/classes": 3,
        "/{api_version}/indicadores/entidadesAtivas": 3,
        "/{api_version}/indicadores/entidades": 3,
        "/{api_version}/indicadores/tipologias": 3,
        "/{api_version}/indicadores/legVigor": 3,
        "/{api_version}/indicadores/leg": 3,
        "/{api_version}/indicadores/relstats": 3,
        "/{api_version}/indicadores/critstats": 3,
        "/{api_version}/indicadores/dfstats": 3,
        "/{api_version}/indicadores/relacoes/:relacao": 3,
        "/{api_version}/indicadores/df/:df": 3,
        "/{api_version}/indicadores/critJust/:critJust": 3,
        "/{api_version}/indicadores/critJust/": 3,
        "/{api_version}/indicadores/tabela": 3,
        //indicePesquisa
        "/{api_version}/indicePesquisa": 0,
        //invariantes
        "/{api_version}/invariantes/testarTodos": 6,
        "/{api_version}/invariantes/": 6,
        //legislacao
        "/{api_version}/legislacao/portarias": 0,
        "/{api_version}/legislacao/numero": 0,
        "/{api_version}/legislacao/:id/processos": 0,
        "/{api_version}/legislacao/:id/": 0,
        "/{api_version}/legislacao/": 0,
        //logs
        "/{api_version}/logs/:verbo": 6, 
        "/{api_version}/logs/": 6 ,
        //logsAgregados
        "/{api_version}/logsAgregados/rotas": 6, 
        "/{api_version}/logsAgregados/total": 6,
        "/{api_version}/logsAgregados/": 6,
        //notasAp
        "/{api_version}/notasAp/notaAp": 0,
        "/{api_version}/notasAp/": 0,
        //noticias
        "/{api_version}/noticias/exportar": [3.5, 4, 5, 6, 7],
        "/{api_version}/noticias/:id": 0,
        "/{api_version}/noticias/": 0,
        //ontologia
        "/{api_version}/ontologia/descricao": 0,
        "/{api_version}/ontologia/data": 0,
        "/{api_version}/ontologia/": 0,
        //parametros
        "/{api_version}/parametros/:parametro": 7,
        "/{api_version}/parametros/": 7,
        //pedidos
        "/{api_version}/pedidos/:codigo": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/pedidos/": [1, 3, 3.5, 4, 5, 6, 7],
        //pendentes
        "/{api_version}/pendentes/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/pendentes/": [1, 3, 3.5, 4, 5, 6, 7],
        //pgd
        "/{api_version}/pgd/lc": 0,
        "/{api_version}/pgd/rada": 0,
        "/{api_version}/pgd/rada/:idRADA": 0,
        "/{api_version}/pgd/:idPGD": 0,
        "/{api_version}/pgd/": 0,
        //rada
        "/{api_version}/rada/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/rada/": [1, 3, 3.5, 4, 5, 6, 7],
        //reload
        "/{api_version}/reload/cache": 7,
        //tabelasSelecao
        "/{api_version}/tabelasSelecao/:id/classes": 0,
        "/{api_version}/tabelasSelecao/:id/": 0,
        "/{api_version}/tabelasSelecao/": 0,
        //termosIndice
        "/{api_version}/termosIndice/quantos": 0,
        "/{api_version}/termosIndice/termoIndice": 0,
        "/{api_version}/termosIndice/": 0,
        //tipologias
        "/{api_version}/tipologias/sigla": 0,
        "/{api_version}/tipologias/designacao": 0,
        "/{api_version}/tipologias/:id/intervencao/dono": 0,
        "/{api_version}/tipologias/:id/intervencao/participante": 0,
        "/{api_version}/tipologias/:id/elementos": 0,
        "/{api_version}/tipologias/:id/": 0,
        "/{api_version}/tipologias/": 0,
        //travessiaDeSintese
        "/{api_version}/travessiaDeSintese/reset": 7,
        "/{api_version}/travessiaDeSintese/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/travessiaDeSintese/": [1, 3, 3.5, 4, 5, 6, 7],
        //travessiaEspecial
        "/{api_version}/travessiaEspecial/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/travessiaEspecial/": [1, 3, 3.5, 4, 5, 6, 7],
        //travessiaV2
        "/{api_version}/travessiaV2": [1, 3, 3.5, 4, 5, 6, 7],
        //travessia
        "/{api_version}/travessia/reset": 7,
        "/{api_version}/travessia/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/travessia/": [1, 3, 3.5, 4, 5, 6, 7],
        //users
        "/{api_version}/users/:id": 1,
        "/{api_version}/users/": 3.5,
        //vocabularios
        "/{api_version}/vocabularios/:id": 0,
        "/{api_version}/vocabularios/": 0,
        //WARNING: Este tem de ser sempre o último no GET. Usado para permitir o acesso aos ficheiros em public. Se se pretender uma segurança mais apertada teria de serem adicionados os "ficheiros" do public um a um
        "/(.*)": -1
    },
    POST: {
        //auth
        "/{api_version}/auth/adicionar": 0,
        //autosEliminacao
        "/{api_version}/autosEliminacao/importar": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/autosEliminacao/": [5, 6, 7],
        //chaves
        "/{api_version}/chaves/": -1,
        //colaboracoes
        "/{api_version}/colaboracoes/importar": [3.5, 4, 5, 6, 7],
        "/{api_version}/colaboracoes/": [3.5, 4, 5, 6, 7],
        //documentacaoCientifica
        "/{api_version}/documentacaoCientifica/importar": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoCientifica/": [3.5, 4, 5, 6, 7],
        //documentacaoApoio
        "/{api_version}/documentacaoApoio/importar": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/": [3.5, 4, 5, 6, 7],
        //entidades
        "/{api_version}/entidades": 4,
        //invariantes
        "/{api_version}/invariantes/": 6,
        //legislacao
        "/{api_version}/legislacao/": 4,
        //noticias
        "/{api_version}/noticias/importar": [3.5, 4, 5, 6, 7],
        "/{api_version}/noticias/": [3.5, 4, 5, 6, 7],
        //ontologia
        "/{api_version}/ontologia": 7,
        //pedidos
        "/{api_version}/pedidos/:codigo/distribuicao": [3.5, 4, 5, 6, 7],
        "/{api_version}/pedidos/": [1, 3, 3.5, 4, 5, 6, 7],
        //pendentes
        "/{api_version}/pendentes": [1, 3, 3.5, 4, 5, 6, 7],
        //rada
        "/{api_version}/rada/": 5,
        //tabelasSelecao
        "/{api_version}/tabelasSelecao/importar": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/tabelasSelecao/": [5, 6, 7],
        //tipologias
        "/{api_version}/tipologias": 4,
        //travessiaDeSintese
        "/{api_version}/travessiaDeSintese": 7,
        //travessia
        "/{api_version}/travessia": 7,
        //users
        "/{api_version}/users/login": -1,
        "/{api_version}/users/callback": -1,
        "/{api_version}/users/recuperar": -1,
        "/{api_version}/users/registarParaEntidade": 4,
        "/{api_version}/users/registarCC": 4,
        "/{api_version}/users/registar": 4,
        //vocabularios
        "/{api_version}/vocabularios/termo/:idVC": [4, 5, 6, 7],
        "/{api_version}/vocabularios/": [4, 5, 6, 7]
    },
    PUT: {
        //chaves
        "/{api_version}/chaves/renovar": -1,
        "/{api_version}/chaves/:id/desativar": 7,
        "/{api_version}/chaves/:id/ativar": 7,
        "/{api_version}/chaves/:id/atualizar": 7,
        //colaboracoes
        "/{api_version}/colaboracoes/:id/": [3.5, 4, 5, 6, 7],
        //documentacaoCientifica
        "/{api_version}/documentacaoCientifica/:id": [3.5, 4, 5, 6, 7],
        //documentacaoApoio
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/": [3.5, 4, 5, 6, 7],
        //entidades
        "/{api_version}/entidades/:id/extinguir": 4,
        "/{api_version}/entidades/:id/": 4,
        //legislacao
        "/{api_version}/legislacao/:id/revogar": 4,
        "/{api_version}/legislacao/:id": 4,
        //noticias
        "/{api_version}/noticias/:id": [3.5, 4, 5, 6, 7],
        //parametros
        "/{api_version}/parametros/:parametro": 7,
        //pedidos
        "/{api_version}/pedidos": [3.5, 4, 5, 6, 7],
        //pendentes
        "/{api_version}/pendentes": [1, 3, 3.5, 4, 5, 6, 7],
        //tipologias
        "/{api_version}/tipologias/:id": 4,
        //users
        "/{api_version}/users/:id/desativar": 4,
        "/{api_version}/users/:id/nic": 7,
        "/{api_version}/users/:id/password": 1,
        "/{api_version}/users/:id/": 4,
        //vocabularios
        "/{api_version}/vocabularios/:id": [4, 5, 6, 7]
    },
    DELETE: {
        //auth
        "/{api_version}/auth/": 7,
        //chaves
        "/{api_version}/chaves/:id": 7,
        //colaboracoes
        "/{api_version}/colaboracoes/:id/": [3.5, 4, 5, 6, 7],
        //documentacaoCientifica
        "/{api_version}/documentacaoCientifica/:id": [3.5, 4, 5, 6, 7],
        //documentacaoApoio
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/elementos/:idElem/": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/entradas/:idEnt/": [3.5, 4, 5, 6, 7],
        "/{api_version}/documentacaoApoio/:id/": [3.5, 4, 5, 6, 7],
        //logs
        "/{api_version}/logs": 7,
        //logsAgregados
        "/{api_version}/logsAgregados": 7,
        //noticias
        "/{api_version}/noticias/:id": [3.5, 4, 5, 6, 7],
        //pedidos
        "/{api_version}/pedidos": 7,
        //pendentes
        "/{api_version}/pendentes/:id": [1, 3, 3.5, 4, 5, 6, 7],
        "/{api_version}/pendentes/": 7,
        //users
        "/{api_version}/users/:id": 7,
        //vocabularios
        "/{api_version}/vocabularios/termo/:id": [4, 5, 6, 7]
    }
}
