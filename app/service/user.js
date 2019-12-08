const Service = require('egg').Service

// 抽出容易变化的部分：
const User = 'User';
const cantFindText = '用户不存在';
const hasExistText = '该用户名已被注册';

class UserService extends Service {
  
  /**
   * 创建用户(目前和注册账号的逻辑是一样的)
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this

    const doc = await this.findByUsername(payload.username)
    if (doc) {
      ctx.throw(409, hasExistText)
    }
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model[User].create(payload)
  }

  /**
   * 删除用户
   * @param {*} id 
   */
  async del(id) {
    const { ctx } = this

    // 显示错误更加合理：
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, cantFindText)
    }

    return ctx.model[User].findByIdAndRemove(id)
  }

  /**
   * 修改用户
   * @param {*} payload 
   */
  async update(payload) {
    const { ctx } = this
    const { id } = payload;
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, cantFindText)
    }
    return this.findByIdAndUpdate(id, payload)
  }

  /**
   * 查看单个用户
   */
  async detail(id) {
    const doc = await this.findById(id)
    if (!doc) {
      this.ctx.throw(404, cantFindText)
    }
    return doc
  }

  async page(payload) {
    return await this.ctx.helper.model.page(User, payload)
  }
  
  /**
   * 删除多个用户
   * @param {*} payload 
   */
  async batchDel(payload) {
    return this.ctx.model[User].deleteMany({ _id: { $in: payload } })
  }


  /**
   * 方便调用，简化书写：
   */
  async findById(...args) {
    return this.ctx.model[User].findById(...args)
  }
  async findByIdAndUpdate(...args) {
    return this.ctx.model[User].findByIdAndUpdate(...args)
  }
  async findByUsername(username) {
    return this.ctx.model[User].findOne({ username })
  }
}


module.exports = UserService