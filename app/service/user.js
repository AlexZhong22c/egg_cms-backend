const Service = require('egg').Service

class UserService extends Service {
  
  /**
   * 创建用户(目前和注册账号的逻辑是一样的)
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this

    const doc = await this.findByUsername(payload.username)
    if (doc) {
      // 可以比400更加准确???????
      ctx.throw(400, '该用户名已被注册')
    }
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.User.create(payload)
  }

  /**
   * 删除用户
   * @param {*} id 
   */
  async delete(id) {
    const { ctx } = this

    // 显示错误更加合理：
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, 'user not found')
    }

    return ctx.model.User.findByIdAndRemove(id)
  }

  /**
   * 修改用户
   * @param {*} payload 
   */
  async update(payload) {
    const { ctx } = this
    const { id, ...rest } = payload;
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, 'user not found')
    }
    return this.findByIdAndUpdate(id, rest)
  }

  /**
   * 查看单个用户
   */
  async detail(id) {
    const doc = await this.findById(id)
    if (!doc) {
      this.ctx.throw(404, 'user not found')
    }
    return doc
  }

  async page(payload) {
    return await this.ctx.helper.page('User', payload)
  }
  
  /**
   * 删除多个用户
   * @param {*} payload 
   */
  async batchDelete(payload) {
    return this.ctx.model.User.deleteMany({ _id: { $in: payload } })
  }

  /**
   * 根据用户名查找
   * @param {*} username 
   */
  async findByUsername(username) {
    return this.ctx.model.User.findOne({ username })
  }

  /**
   * @param {*} id 
   */
  async findById(id) {
    return this.ctx.model.User.findById(id)
  }

  /**
   * @param {*} id 
   * @param {*} rest 
   */
  async findByIdAndUpdate(id, rest) {
    return this.ctx.model.User.findByIdAndUpdate(id, rest)
  }

}


module.exports = UserService