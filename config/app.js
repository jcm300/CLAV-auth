const fs = require('fs')

module.exports = {
    userPrivateKey: fs.readFileSync('./config/keys/userKey'),
    apiPrivateKey: fs.readFileSync('./config/keys/apiKey'),
    userPublicKey: fs.readFileSync('./config/keys/userKey.pub'),
    apiPublicKey: fs.readFileSync('./config/keys/apiKey.pub')
}
