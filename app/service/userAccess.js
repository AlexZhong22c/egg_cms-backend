const { Service } = require('egg')

const cantFindText = '用户不存在';
const hasExistText = '该用户名已被注册';

class UserAccessService extends Service {
    async login(payload) {
        const { ctx, service } = this
        const doc = await this.findByUsername(payload.username) 
        if (!doc) {
            // 提高安全性：
            ctx.throw(401, '用户名或密码错误')
        }
        // 求哈希，然后对比：
        let verifyPsw = await ctx.compare(payload.password, doc.password)
        if (!verifyPsw) {
            ctx.throw(401, '用户名或密码错误')
        }
        // 生成Token令牌
        return { token: await service.actionToken.sign(doc.id) }
    }

    // 前端清一下token就行了??????????
    async logout() {
    }
    /**
     * 注册用户(目前和创建用户的逻辑是一样的)
     * @param {*} payload 
     */
    async signin(payload) {
        const { ctx } = this

        const doc = await this.findByUsername(payload.username)
        if (doc) {
            ctx.throw(409, hasExistText)
        }
        payload.password = await this.ctx.genHash(payload.password)
        return ctx.model.User.create(payload)
    }

    // 当前用户信息：
    async current() {
        const { ctx, service } = this
        // ctx.state.user 可以提取到JWT编码的data
        const id = ctx.state.user.data.id
        const doc = await service.user.findById(id)
        if (!doc) {
            ctx.throw(404, cantFindText)
        }
        return doc
    }

    /**
     * 根据用户名查找
     * @param {*} username 
     */
    async findByUsername(username) {
        return this.ctx.model.User.findOne({ username })
    }
}

module.exports = UserAccessService