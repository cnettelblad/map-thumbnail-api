import HapiPino from "hapi-pino"

export default {
    plugin: HapiPino,
    options: {
        logPayload: true,
        level: 'debug'
    }
}