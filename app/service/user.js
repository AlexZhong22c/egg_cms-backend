const Service = require('egg').Service

class UserService extends Service {
  
  /**
   * 创建用户
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this

    const user = await this.findByMobile(payload.mobile)
    if (user) {
      // 可以比400更加准确???????
      ctx.throw(400, '该手机号码已被注册')
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
    const user = await this.findById(id)
    if (!user) {
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
    const user = await this.findById(id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return this.findByIdAndUpdate(id, rest)
  }

  /**
   * 查看单个用户
   */
  async detail(id) {
    const user = await this.findById(id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return user
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
   * 根据手机号查找
   * @param {*} mobile 
   */
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile })
  }

  /**
   * 查找用户
   * @param {*} id 
   */
  async findById(id) {
    return this.ctx.model.User.findById(id)
  }

  /**
   * 更新用户信息
   * @param {*} id 
   * @param {*} values 
   */
  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values)
  }

}


module.exports = UserService