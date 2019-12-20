const Service = require('egg').Service

// 抽出容易变化的部分：
const Category = 'Category';
const cantFindText = '此分类不存在';
const hasExistText = '此分类已经存在';

class CategoryService extends Service {
  /**
   * 约定有一组service，和controller层的名字一一对应。
   */
  async add(payload) {
    const { ctx } = this
    const doc = await this._findByName(payload.name)
    if (doc) {
      ctx.throw(409, hasExistText)
    }
    return ctx.model[Category].create(payload)
  }
  async del(id) {
    return this.findByIdAndDeleteOrFail(id);
  }
  async update(payload) {
    const { id } = payload;
    return this.findByIdAndUpdateOrFail(id, payload)
  }
  async list(payload) {
    return await this.ctx.helper.model.list(Category, payload)
  }
  async page(payload) {
    return await this.ctx.helper.model.page(Category, payload)
  }

  async batchDel(payload) {
    return this.ctx.model[Category].deleteMany({ _id: { $in: payload } })
  }

  async findByIdOrFail(...args) {
    return this.ctx.model[Category].findById(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
  async findByIdAndDeleteOrFail(...args) {
    return this.ctx.model[Category].findByIdAndDelete(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
  async findByIdAndUpdateOrFail(...args) {
    return this.ctx.model[Category].findByIdAndUpdate(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }

  /**
   * 方便调用，简化书写：(当做该实体的内部方法，其他实体最好不要调用这些方法)
   */
  async _findByName(name) {
    return this.ctx.model[Category].findOne({ name })
  }
}

module.exports = CategoryService