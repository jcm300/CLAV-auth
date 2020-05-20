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
        },
        "/classes": {
            "/titulo": 0,
            "/codigo": 0,
            "/justificacao": {
                "/:id": 0
            },
            "/:id": {
                "/meta": 0,
                "/descendencia": 0,
                "/notasAp": 0,
                "/exemplosNotasAp": 0,
                "/notasEx": 0,
                "/ti": 0,
                "/dono": 0,
                "/participante": 0,
                "/procRel": {
                    "/:idRel": 0,
                    "/": 0
                },
                "/legislacao": 0,
                "/pca": 0,
                "/df": 0,
                "/": 0
            },
            "/": 0
        },
        "/documentacaoCientifica": {
            "/classes": 0,
            "/exportar": [4, 5, 6, 7],
            "/:id": {
                "/ficheiro": 0,
                "/": 0
            },
            "/": 0
        },
        "/documentacaoApoio": {
            "/formulario": 0,
            "/classes": 0,
            "/:id": {
                "/entradas": {
                    "/:idEnt": {
                        "/elementos": {
                            "/:idElem": {
                                "/ficheiro": 0
                                "/": 0
                            },
                            "/": 0
                        },
                        "/": 0
                    },
                    "/": 0
                },
                "/": 0
            },
            "/": 0
        },
        "/entidades": {
            "/sigla": 0,
            "/designacao": 0,
            "/:id": {
                "/tipologias": 0,
                "/intervencao": {
                    "/dono": 0,
                    "/participante": 0
                },
                "/": 0
            },
            "/": 0
        },
        "exemplosNotasAp": {
            "/exemploNotaAp": 0,
            "/": 0
        },
        "/indicadores": {
            "/classesN4": 3.5,
            "/classesN3": 3.5,
            "/classesN2": 3.5,
            "/classesN1": 3.5,
            "/classes": 3.5,
            "/entidadesAtivas": 3.5,
            "/entidades": 3.5,
            "/tipologias": 3.5,
            "/legVigor": 3.5,
            "/leg": 3.5,
            "/relstats": 3.5,
            "/critstats": 3.5,
            "/dfstats": 3.5,
            "/relacoes": {
                "/:relacao": 3.5
            },
            "/df": {
                "/:df": 3.5
            },
            "/critJust": {
                "/:critJust": 3.5,
                "/": 3.5
            },
            "/tabela": 3.5
        },
        "/indicePesquisa": 0,
        "/invariantes": {
            "/testarTodos": 6,
            "/": 6
        },
        "/legislacao": {
            "/portarias": 0,
            "/numero": 0,
            "/:id": {
                "/processos": 0,
                "/": 0
            },
            "/": 0
        },
        "/logs": {
           "/verbo": 6, 
           "/": 6 
        },
        "/logsAgregados": {
           "/rotas": 6, 
           "/total": 6,
           "/": 6 
        },
        "/notasAp": {
            "/notaAp": 0,
            "/": 0
        },
        "/noticias": {
            "/:id": 0,
            "/": 0
        },
        "/ontologia": {
            "/descricao": 0,
            "/data": 0,
            "/": 0
        },
        "/parametros": {
            "/:parametro": 7.
            "/": 7
        },
        "/pedidos": {
            "/:codigo": [1, 3, 3.5, 4, 5, 6, 7],
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/pendentes": {
            "/:id": [1, 3, 3.5, 4, 5, 6, 7],
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/reload": {
            "/cache": 7
        },
        "/tabelasSelecao": {
            "/:id": {
                "/classes": 0
                "/": 0
            },
            "/": 0
        },
        "/termosIndice": {
            "/quantos": 0,
            "/termoIndice": 0,
            "/": 0
        },
        "/tipologias": {
            "/sigla": 0,
            "/designacao": 0,
            "/:id": {
                "/intervencao": {
                    "/dono": 0,
                    "/participante": 0
                },
                "/elementos": 0,
                "/": 0
            },
            "/": 0
        },
        "/travessiaDeSintese": {
            "/reset": 7,
            "/:id": [1, 3, 3.5, 4, 5, 6, 7],
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/travessiaEspecial": {
            "/:id": [1, 3, 3.5, 4, 5, 6, 7],
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/travessiaV2": [1, 3, 3.5, 4, 5, 6, 7],
        "/travessia": {
            "/reset": 7,
            "/:id": [1, 3, 3.5, 4, 5, 6, 7],
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/users": {
            "/:id": 1,
            "/": 5
        },
        "/vocabularios": {
            "/:id": 0,
            "/": 0
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
        },
        "/documentacaoCientifica": {
            "/importar": [4, 5, 6, 7],
            "/": [4, 5, 6, 7]
        },
        "/documentacaoApoio": {
            "/:id": {
                "/entradas": {
                    "/:idEnt": {
                        "/": [4, 5, 6, 7]
                    }
                },
                "/": [4, 5, 6, 7]
            },
            "/": [4, 5, 6, 7]
        },
        "/entidades": 4,
        "/invariantes": {
            "/": 6
        },
        "/legislacao": {
            "/": 4
        },
        "/noticias": {
            "/": [4, 5, 6, 7]
        },
        "/ontologia": 7,
        "/pedidos": {
            "/:codigo": {
                "/distribuicao": [1, 3, 3.5, 4, 5, 6, 7] 
            },
            "/": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/pendentes": [1, 3, 3.5, 4, 5, 6, 7],
        "/tabelasSelecao": {
            "/importar": [1, 3, 3.5, 4, 5, 6, 7]
        },
        "/tipologias": 4,
        "/travessiaDeSintese": 7,
        "/travessia": 7,
        "/users": {
            "/login": -1,
            "/callback": -1,
            "/recuperar": -1,
            "/registarParaEntidade": 5,
            "/registarCC": 5
            "/registar": 5
        },
        "/vocabularios": {
            "/termo": {
                "/:idVC": [1, 3, 3.5, 4, 5, 6, 7]
            },
            "/": [1, 3, 3.5, 4, 5, 6, 7]
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
        },
        "/documentacaoCientifica": {
            "/:id": [4, 5, 6, 7]
        },
        "/documentacaoApoio": {
            "/:id": {
                "/entradas": {
                    "/:idEnt": {
                        "/elementos": {
                            "/:idElem": {
                                "/": [4, 5, 6, 7]
                            }
                        }
                        "/": [4, 5, 6, 7]
                    }
                },
                "/": [4, 5, 6, 7]
            }
        },
        "/entidades": {
            "/:id": {
                "/extinguir": 4,
                "/": 4
            }
        },
        "/legislacao": {
            "/:id": 4
        },
        "/noticias": {
            "/:id": [4, 5, 6, 7]
        },
        "/parametros": {
            "/:parametro": 7
        },
        "/pedidos": [1, 3, 3.5, 4, 5, 6, 7],
        "/pendentes": [1, 3, 3.5, 4, 5, 6, 7],
        "/tipologias": {
            "/:id": 4
        },
        "/users": {
            "/:id": {
                "/desativar": 5
                "/nic": 7
                "/password": 1
                "/": 5
            }
        },
        "/vocabularios": {
            "/:id": [1, 3, 3.5, 4, 5, 6, 7]
        }
    },
    DELETE: {
        "/auth": {
            "/": 7
        },
        "/chaves": {
            "/:id": 7
        },
        "/documentacaoCientifica": {
            "/:id": [4, 5, 6, 7]
        },
        "/documentacaoApoio": {
            "/:id": {
                "/entradas": {
                    "/:idEnt": {
                        "/elementos": {
                            "/:idElem": {
                                "/": [4, 5, 6, 7]
                            }
                        }
                        "/": [4, 5, 6, 7]
                    }
                },
                "/": [4, 5, 6, 7]
            }
        },
        "/logs": 7,
        "/logsAgregados": 7,
        "/noticias": {
            "/:id": [4, 5, 6, 7]
        },
        "/pedidos": 7,
        "/pendentes": {
            "/:id": [1, 3, 3.5, 4, 5, 6, 7],
            "/": 7
        },
        "/users": {
            "/:id": 7
        },
        "/vocabularios": {
            "/termo": {
                "/:id": [1, 3, 3.5, 4, 5, 6, 7]
            }
        }
    }
}
