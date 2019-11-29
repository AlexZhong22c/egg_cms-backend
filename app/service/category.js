const Service = require('egg').Service

class CategoryService extends Service {
  
  /**
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this

    const doc = await this.findByName(payload.name)
    if (doc) {
      // 可以比400更加准确???????
      ctx.throw(400, '此分类已经存在')
    }
    return ctx.model.Category.create(payload)
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
      ctx.throw(404, 'category not found')
    }

    return ctx.model.Category.findByIdAndRemove(id)
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
      ctx.throw(404, 'category not found')
    }
    return this.findByIdAndUpdate(id, rest)
  }

  /**
   * @param {*} payload 
   */
  async batchDelete(payload) {
    return this.ctx.model.Category.deleteMany({ _id: { $in: payload } })
  }

  /**
   * @param {*} name 
   */
  async findByName(name) {
    return this.ctx.model.Category.findOne({ name })
  }

  /**
   * @param {*} id 
   */
  async findById(id) {
    return this.ctx.model.Category.findById(id)
  }

  /**
   * @param {*} id 
   * @param {*} rest 
   */
  async findByIdAndUpdate(id, rest) {
    return this.ctx.model.Category.findByIdAndUpdate(id, rest)
  }

}


module.exports = CategoryService