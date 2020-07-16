# CLAV-auth
Serviço de Autenticação e de Autorização para a CLAV

**AVISO**: Se usar este serviço em produção então deve gerar novos pares de chaves pública/privadas com um tamanho mínimo de 2048 bits. As chaves são guardadas em `./config/keys` onde uma se chama `apiKey` (`apiKey` (privada) e `apiKey.pub` (pública)) e a outra `userKey` (`userKey` (privada) e `userKey.pub` (pública)).

## Variáveis do serviço

O serviço permite que sejam alterados certos parâmetros diretamente no código (`./config/vars.js`) ou através de variáveis ambiente. Estas variáveis ambiente são:

- `PORT`: porta onde irá correr o serviço (default: `7778`)
- `API_VERSION`: versão do servidor API que será protegido (default: `v2`)
- `API_HOST`: Host do servidor API que será protegido (default: `http://localhost:7779`)

## API do CLAV-auth

<details>
<summary>Verifica autenticação e autorização do pedido</summary>

```http
POST /auth
```
| Parâmetro | Tipo | Local | Descrição |
| :--- | :--- | :--- | :--- |
| `method` | `string` (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) | body | **Required**. Método/Verbo do pedido. |
| `path` | `string` | body | **Required**. Caminho (sem querystring) do pedido. |
| `query` | `object` | body | **Required**. Querystring do pedido. |
| `headers` | `object` | body | **Required**. Cabeçalhos do pedido. |

Resposta:

- `200`: Pode realizar o pedido (possui autenticação e autorização). No body da resposta envia o JWT descodificado e adiciona um campo `idType` (com valores possíveis `User` ou `Chave`)
- `401`: Não tem autenticação para realizar o pedido
- `403`: Não tem autorização para realizar o pedido
- `404`: A rota (path) do pedido não existe
- `422`: Parâmetros em falta/incorretos
- `500`: Erro interno

📄 **Exemplo de uso**

Pedido:
```
curl -H "Content-Type: application/json" -d '{
  "method": "GET",
  "query": { "formato": "normalizado" },
  "path": "/v2/users",
  "headers": {
    "host": "localhost:8000",
    "authorization": "token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmFkY2ZkYzM4YWVmNWNhYTkwZWZjNyIsImxldmVsIjo3LCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJqY20zMDBAbGl2ZS5jb20ucHQiLCJpYXQiOjE1OTAwNTQzODgsImV4cCI6MTU5MDA4MzE4OH0.kVdV9yVzfQnhBMpUZqIEyvZF0UeJHqgpjYhNwZ2M9fRoKKxK1OdyR-Oq6d3BntU68m7xXaWXtTVrFl2_YvkjA2z0MAvSCdxchvvo_BjhnHJNUJe5DwYdiA7qN5hdyei4EPgpzr6Gs8QXPNsKL4RKjEhjfk87c4rAVsz-inzzSWKVmO69KHW855fkM0Cb6g6gzre2CmfIJFuDCMQ0x1FN2-N4e3rrpIy8lHgNehDbGfUUGLcTSeN0V1Xm34EV-T__hsVhcbVn1okNsjqSV9a0lRC0yPe43gWTRrOVYu9dproz0LWU0HY4FRJrQnZYn4_GscyBf3mDbtOlNOpUq8-cxg",
    "accept": "*/*",
    "cache-control": "no-cache",
    "content-length": "88",
    "accept-encoding": "gzip, deflate, br",
    "content-type": "application/x-www-form-urlencoded",
    "connection": "keep-alive"
  }
}' http://localhost:7778/auth
```

Resposta:
```json
{
    "id":"5e2adcfdc38aef5caa90efc7",
    "level":7,
    "entidade":"ent_A3ES",
    "email":"jcm300@live.com.pt",
    "iat":1590054388,
    "exp":1590083188,
    "idType":"User"
}
```
</details>

<details>
<summary>Gerar JWT para um utilizador</summary>

```http
POST /user/sign
```
| Parâmetro | Tipo | Local | Descrição |
| :--- | :--- | :--- | :--- |
| `user` | `object` | body | **Required**. Dados do utilizador. |
| `expiresIn` | `string` (`^\d+(ms\|s\|m\|h\|d\|y)$`) | body | **Required**. Duração do JWT. |

Resposta:

- `200`: Devolve o JWT gerado
- `422`: Parâmetros em falta/incorretos
- `500`: Erro interno

📄 **Exemplo de uso**

Pedido:
```
curl -H "Content-Type: application/json" -d '{
  "user": {
    "id": "5e2adcfdc38aef5caa90efc7",
    "name": "jcm",
    "level": 7,
    "entidade": "ent_A3ES",
    "email": "jcm300@live.com.pt"
  },
  "expiresIn": "8h"
}' http://localhost:7778/user/sign
```

Resposta:
```json
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmFkY2ZkYzM4YWVmNWNhYTkwZWZjNyIsImxldmVsIjo3LCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJqY20zMDBAbGl2ZS5jb20ucHQiLCJpYXQiOjE1OTAwNTcyMTIsImV4cCI6MTU5MDA4NjAxMn0.jHWRYJctQgFzJJB4e-NMFVocDDCecyVH8_Vb4GUVyaAjR97MKoC8AcnuVbhPezh5kV9_a4YIlH9fqmyIHEIx1mGEQLUTaqRxeOu7EOHFGdeQWTZjA1qhmMM3iKVMApGnNHrex_Okge68limWJ-cInvdKwHa53E-RYPh2Ym-tMNxtGm9zhSDtCq0il5gkGCPOatFynMTKEPU-YMbg-vEJBmi39W1sElm9DfgWR1UPC7kTZ_Dg0q3-9h2G-MaL-dBMInx-LI2OYNIhSvfvy7x-290_BZJP6B7KrNQH-rQHhNPAFgQip-kR_tuWwEekSBlTIDQKxxy_biRH-Pcle621CQ"
}
```
</details>

<details>
<summary>Verificar o JWT de um utilizador</summary>

```http
POST /user/verify
```
| Parâmetro | Tipo | Local | Descrição |
| :--- | :--- | :--- | :--- |
| `key` | `string` | body | **Required**. JWT a verificar. |

Resposta:

- `200`: Devolve o JWT descodificado
- `422`: Parâmetros em falta/incorretos
- `500`: Erro interno ou JWT inválido/expirado

📄 **Exemplo de uso**

Pedido:
```
curl -H "Content-Type: application/json" -d '{
  "key": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmFkY2ZkYzM4YWVmNWNhYTkwZWZjNyIsImxldmVsIjo3LCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJqY20zMDBAbGl2ZS5jb20ucHQiLCJpYXQiOjE1OTAwNTcyMTIsImV4cCI6MTU5MDA4NjAxMn0.jHWRYJctQgFzJJB4e-NMFVocDDCecyVH8_Vb4GUVyaAjR97MKoC8AcnuVbhPezh5kV9_a4YIlH9fqmyIHEIx1mGEQLUTaqRxeOu7EOHFGdeQWTZjA1qhmMM3iKVMApGnNHrex_Okge68limWJ-cInvdKwHa53E-RYPh2Ym-tMNxtGm9zhSDtCq0il5gkGCPOatFynMTKEPU-YMbg-vEJBmi39W1sElm9DfgWR1UPC7kTZ_Dg0q3-9h2G-MaL-dBMInx-LI2OYNIhSvfvy7x-290_BZJP6B7KrNQH-rQHhNPAFgQip-kR_tuWwEekSBlTIDQKxxy_biRH-Pcle621CQ"
}' http://localhost:7778/user/verify
```

Resposta:
```json
{
    "id": "5e2adcfdc38aef5caa90efc7",
    "level": 7,
    "entidade": "ent_A3ES",
    "email": "jcm300@live.com.pt",
    "iat": 1590057212,
    "exp": 1590086012
}
```
</details>

<details>
<summary>Gerar JWT para uma Chave API</summary>

```http
POST /apikey/sign
```
| Parâmetro | Tipo | Local | Descrição |
| :--- | :--- | :--- | :--- |
| `apikey` | `object` | body | **Required**. Dados da Chave API. |
| `expiresIn` | `string` (`^\d+(ms\|s\|m\|h\|d\|y)$`) | body | **Required**. Duração do JWT. |

Resposta:

- `200`: Devolve o JWT gerado
- `422`: Parâmetros em falta/incorretos
- `500`: Erro interno

📄 **Exemplo de uso**

Pedido:
```
curl -H "Content-Type: application/json" -d '{
  "apikey": {
    "id": "5e2adcfdc38aef5caa90efc7"
  },
  "expiresIn": "30d"
}' http://localhost:7778/apikey/sign
```

Resposta:
```json
{
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmFkY2ZkYzM4YWVmNWNhYTkwZWZjNyIsImxldmVsIjo3LCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJqY20zMDBAbGl2ZS5jb20ucHQiLCJpYXQiOjE1OTAwNTcyMTIsImV4cCI6MTU5MDA4NjAxMn0.jHWRYJctQgFzJJB4e-NMFVocDDCecyVH8_Vb4GUVyaAjR97MKoC8AcnuVbhPezh5kV9_a4YIlH9fqmyIHEIx1mGEQLUTaqRxeOu7EOHFGdeQWTZjA1qhmMM3iKVMApGnNHrex_Okge68limWJ-cInvdKwHa53E-RYPh2Ym-tMNxtGm9zhSDtCq0il5gkGCPOatFynMTKEPU-YMbg-vEJBmi39W1sElm9DfgWR1UPC7kTZ_Dg0q3-9h2G-MaL-dBMInx-LI2OYNIhSvfvy7x-290_BZJP6B7KrNQH-rQHhNPAFgQip-kR_tuWwEekSBlTIDQKxxy_biRH-Pcle621CQ"
}
```
</details>

<details>
<summary>Verificar o JWT de uma Chave API</summary>

```http
POST /apikey/verify
```
| Parâmetro | Tipo | Local | Descrição |
| :--- | :--- | :--- | :--- |
| `key` | `string` | body | **Required**. JWT a verificar. |

Resposta:

- `200`: Devolve o JWT descodificado
- `422`: Parâmetros em falta/incorretos
- `500`: Erro interno ou JWT inválido/expirado

📄 **Exemplo de uso**

Pedido:
```
curl -H "Content-Type: application/json" -d '{
  "key": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMmFkY2ZkYzM4YWVmNWNhYTkwZWZjNyIsImxldmVsIjo3LCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJqY20zMDBAbGl2ZS5jb20ucHQiLCJpYXQiOjE1OTAwNTcyMTIsImV4cCI6MTU5MDA4NjAxMn0.jHWRYJctQgFzJJB4e-NMFVocDDCecyVH8_Vb4GUVyaAjR97MKoC8AcnuVbhPezh5kV9_a4YIlH9fqmyIHEIx1mGEQLUTaqRxeOu7EOHFGdeQWTZjA1qhmMM3iKVMApGnNHrex_Okge68limWJ-cInvdKwHa53E-RYPh2Ym-tMNxtGm9zhSDtCq0il5gkGCPOatFynMTKEPU-YMbg-vEJBmi39W1sElm9DfgWR1UPC7kTZ_Dg0q3-9h2G-MaL-dBMInx-LI2OYNIhSvfvy7x-290_BZJP6B7KrNQH-rQHhNPAFgQip-kR_tuWwEekSBlTIDQKxxy_biRH-Pcle621CQ"
}' http://localhost:7778/apikey/verify
```

Resposta:
```json
{
    "id": "5e2adcfdc38aef5caa90efc7"
}
```
</details>
