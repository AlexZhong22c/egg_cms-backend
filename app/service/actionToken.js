const { Service } = require('egg')

class ActionTokenService extends Service {
    async sign(id) {
        const { ctx } = this
        return ctx.app.jwt.sign({
            data: {
                id
            },
            exp: Math.floor(Date.now() / 1000 + (60 * 60 * 7))
        }, ctx.app.config.jwt.secret)
    }

}
module.exports = ActionTokenService