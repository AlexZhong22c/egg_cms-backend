const Service = require('egg').Service

// 抽出容易变化的部分：
const User = 'User';
const cantFindText = '用户不存在';
const hasExistText = '该用户名已被注册';

class UserService extends Service {
  /**
   * 约定有一组service，和controller层的名字一一对应。
   */
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
    return this.findByIdAndDeleteOrFail(id);
  }

  /**
   * 修改用户
   * @param {*} payload 
   */
  async update(payload) {
    const { id } = payload;
    return this.findByIdAndUpdateOrFail(id, payload)
  }

  /**
   * 查看单个用户
   */
  async detail(id) {
    return this.findByIdOrFail(id);
  }

  async list(payload) {
    return await this.ctx.helper.model.list(User, payload)
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


  async findByIdOrFail(...args) {
    return this.ctx.model[User].findById(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
  async findByIdAndDeleteOrFail(...args) {
    return this.ctx.model[User].findByIdAndDelete(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
  async findByIdAndUpdateOrFail(...args) {
    return this.ctx.model[User].findByIdAndUpdate(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }

  /**
   * 方便调用，简化书写：(当做该实体的内部方法，其他实体最好不要调用这些方法)
   */
  async findByUsername(username) {
    return this.ctx.model[User].findOne({ username })
  }
}


module.exports = UserService