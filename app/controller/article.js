const BaseController = require('./base');
/**
 * @Controller 文章管理
 */
class ArticleController extends BaseController {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建文章
   * @router post /api/article/add
   * @request body addArticleReq *body
   * @response 200 baseRes 操作成功
   */
  async add() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.addArticleReq)
    const payload = ctx.request.body || {}
    const data = await service.article.add(payload)
    this.success({ data })
  }
}


module.exports = ArticleController;
