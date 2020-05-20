module.exports.APIVersion = process.env.API_VERSION || "v2"
module.exports.APIHost = (process.env.API_HOST || "http://localhost:7779") + "/" + module.exports.APIVersion
