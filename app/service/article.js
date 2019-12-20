const Service = require('egg').Service

// 抽出容易变化的部分：
const Article = 'Article';
const User = 'User';
const cantFindText = '此文章不存在';
const cantFindTextOfUser = '用户不存在';

class ArticleService extends Service {
  /**
   * 约定有一组service，和controller层的名字一一对应。
   */
  async add(payload) {
    const { ctx } = this
    return ctx.model[Article].create(payload)
  }

  async update(payload) {
    const { id } = payload;
    return this.findByIdAndUpdateOrFail(id, payload)
  }

  async del(id) {
    return this.findByIdAndDeleteOrFail(id);
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

  async addComment(payload) {
    const { ctx } = this
    const { id, username, content } = payload
    const userDoc = await ctx.model[User].findOne({ username })
      .orFail(() => this.ctx.throw(404, cantFindTextOfUser));
    const comment = {
      commenter: userDoc.id,
      content
    };
    await this.findByIdAndUpdateOrFail(id, {
      $push: { commentList: comment }
    })
    // this.findByIdAndUpdate(id, { $push: { commentList: comment } }, { new: true })
    const doc = await this.findByIdOrFail(id);
    // 这是返回commentList，update article $push好像没有办法返回被操作的那一项comment：
    return doc.commentList;
  }

  async delComment(payload) {
    const { id, commentId } = payload
    await this.findByIdAndUpdateOrFail(id, {
      $pull: { commentList: { _id: commentId } }
    });
    const doc = await this.findByIdOrFail(id);
    return doc.commentList;
  }

  async listComment(payload) {
    const { id } = payload;
    const doc = await this.findByIdOrFail(id);
    return doc.commentList;
  }

  async findByIdOrFail(...args) {
    return this.ctx.model[Article].findById(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
  async findByIdAndDeleteOrFail(...args) {
    return this.ctx.model[Article].findByIdAndDelete(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
  async findByIdAndUpdateOrFail(...args) {
    return this.ctx.model[Article].findByIdAndUpdate(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
}


module.exports = ArticleService
