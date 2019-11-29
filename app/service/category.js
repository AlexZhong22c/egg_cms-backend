const Service = require('egg').Service

// 抽出容易变化的部分：
const Category = 'Category';
const cantFindText = '此分类不存在';
const hasExistText = '此分类已经存在';

class CategoryService extends Service {
  
  /**
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this

    const doc = await this.findByName(payload.name)
    if (doc) {
      // 可以比400更加准确???????
      ctx.throw(400, hasExistText)
    }
    return ctx.model[Category].create(payload)
  }

  async delete(id) {
    const { ctx } = this

    // 显示错误更加合理：
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, cantFindText)
    }

    return ctx.model[Category].findByIdAndRemove(id)
  }

  async update(payload) {
    const { ctx } = this
    const { id } = payload;
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, cantFindText)
    }
    return this.findByIdAndUpdate(id, payload)
  }
  async list(payload) {
    return await this.ctx.helper.model.list(Category, payload)
  }

  async batchDelete(payload) {
    return this.ctx.model[Category].deleteMany({ _id: { $in: payload } })
  }

  /**
   * 方便调用，简化书写：
   */
  async findById(...args) {
    return this.ctx.model[Category].findById(...args)
  }
  async findByIdAndUpdate(...args) {
    return this.ctx.model[Category].findByIdAndUpdate(...args)
  }
  async findByName(name) {
    return this.ctx.model[Category].findOne({ name })
  }

}


module.exports = CategoryService