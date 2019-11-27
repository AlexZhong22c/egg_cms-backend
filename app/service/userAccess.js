const { Service } = require('egg')
class UserAccessService extends Service {
    async login(payload) {
        const { ctx, service } = this
        const user = await service.user.findByMobile(payload.mobile) 
        if (!user) {
            ctx.throw(404, 'user not found')
        }
        // 求哈希，然后对比：
        let verifyPsw = await ctx.compare(payload.password, user.password)
        if (!verifyPsw) {
            ctx.throw(404, 'user password is wrong')
        }
        // 生成Token令牌
        return { token: await service.actionToken.sign(user._id) }
    }
    async logout() {
    }

    // 当前用户信息：
    async current() {
        const { ctx, service } = this
        // ctx.state.user 可以提取到JWT编码的data
        const _id = ctx.state.user.data._id
        const user = await service.user.find(_id)
        if (!user) {
            ctx.throw(404, 'user is not found')
        }
        return user
    }
}

module.exports = UserAccessService