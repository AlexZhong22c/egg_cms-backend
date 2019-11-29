const Service = require('egg').Service

// 抽出容易变化的部分：
const Article = 'Article';
// const cantFindText = '此分类不存在';
// const hasExistText = '此分类已经存在';

class ArticleService extends Service {
  
  /**
   * @param {*} payload 
   */
  async add(payload) {
    const { ctx } = this
    return ctx.model[Article].create(payload)
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
