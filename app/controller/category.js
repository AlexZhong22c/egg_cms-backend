const BaseController = require('./base');
/**
 * @Controller 分类管理
 */
class CategoryController extends BaseController {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建分类
   * @router post /api/category/add
   * @request body addCategoryReq *body
   * @response 200 baseRes 操作成功
   */
  async add() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.addCategoryReq)
    const payload = ctx.request.body || {}
    const data = await service.category.add(payload)
    this.success({ data })
  }

  /**
   * @summary 删除单个分类
   * @router post /api/category/del
   * @request body idReq *body
   * @response 200 baseRes 操作成功
   */
  async del() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.idReq)
    const payload = ctx.request.body || {}
    await service.category.del(payload.id)
    this.success()
  }

  /**
   * @summary 修改分类
   * @router post /api/category/update
   * @request body updateCategoryReq *body
   * @response 200 baseRes 操作成功
   */
  async update() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.updateCategoryReq)
    const payload = ctx.request.body || {}
    await service.category.update(payload)
    this.success()
  }

  /**
   * @summary 获取分类列表
   * @router post /api/category/list
   * @request body listBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async list() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.listBaseReq)
    const data = await service.category.list(ctx.request.body)
    this.success({ data })
  }

  /**
   * @summary 获取分类列表(分页)
   * @router post /api/category/page
   * @request body pageBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async page() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.pageBaseReq)
    const data = await service.category.page(ctx.request.body)
    this.success({ data })
  }

  /**
   * @summary 删除所选分类
   * @router post /api/category/batch/del
   * @request body batchDelBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async batchDel() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.batchDelBaseReq)
    const { ids } = ctx.request.body
    await service.category.batchDel(ids)
    this.success()
  }
}


module.exports = CategoryController;
