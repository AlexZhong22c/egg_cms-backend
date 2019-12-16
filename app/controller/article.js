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

  /**
   * @summary 删除单个文章
   * @router post /api/article/del
   * @request body idReq *body
   * @response 200 baseRes 操作成功
   */
  async del() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.idReq)
    const payload = ctx.request.body || {}
    await service.article.del(payload.id)
    this.success()
  }

  /**
   * @summary 修改文章
   * @router post /api/article/update
   * @request body updateArticleReq *body
   * @response 200 baseRes 操作成功
   */
  async update() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.updateArticleReq)
    const payload = ctx.request.body || {}
    await service.article.update(payload)
    this.success()
  }

  /**
   * @summary 获取文章列表
   * @router post /api/article/list
   * @request body listBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async list() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.listBaseReq)
    const data = await service.article.list(ctx.request.body)
    this.success({ data })
  }
  /**
   * @summary 获取文章列表(分页)
   * @router post /api/article/page
   * @request body pageBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async page() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.pageBaseReq)
    const data = await service.article.page(ctx.request.body)
    this.success({ data })
  }

  /**
   * @summary 删除所选文章
   * @router post /api/article/batch/del
   * @request body batchDelBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async batchDel() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.batchDelBaseReq)
    const { ids } = ctx.request.body
    await service.article.batchDel(ids)
    this.success()
  }
}


module.exports = ArticleController;
