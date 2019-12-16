const Service = require('egg').Service

// 抽出容易变化的部分：
const Article = 'Article';
const cantFindText = '此文章不存在';

class ArticleService extends Service {
  
  /**
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this
    return ctx.model[Article].create(payload)
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

  async del(id) {
    const { ctx } = this

    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, cantFindText)
    }

    return ctx.model[Article].findByIdAndRemove(id)
  }

  async batchDel(payload) {
    return this.ctx.model[Article].deleteMany({ _id: { $in: payload } })
  }

  async list(payload) {
    return await this.ctx.helper.model.list(Article, payload)
  }
  async page(payload) {
    return await this.ctx.helper.model.page(Article, payload)
  }

  /**
   * 方便调用，简化书写：
   */
  async findById(...args) {
    return this.ctx.model[Article].findById(...args)
  }
  async findByIdAndUpdate(...args) {
    return this.ctx.model[Article].findByIdAndUpdate(...args)
  }
  async findByName(name) {
    return this.ctx.model[Article].findOne({ name })
  }

}


module.exports = ArticleService
