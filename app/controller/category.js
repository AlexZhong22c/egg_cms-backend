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
   * @router post /api/category/delete
   * @request body idReq *body
   * @response 200 baseRes 操作成功
   */
  async delete() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.idReq)
    const payload = ctx.request.body || {}
    await service.category.delete(payload.id)
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
   * @request body listCategoryReq *body
   * @response 200 baseRes 操作成功
   */
  async list() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.listCategoryReq)
    const data = await service.category.list(ctx.request.body)
    this.success({ data })
  }

  /**
   * @summary 删除所选分类
   * @router post /api/category/batch/delete
   * @request body batchDeleteCategoryReq *body
   * @response 200 baseRes 操作成功
   */
  async batchDelete() {
    const { ctx, service } = this
    const { ids } = ctx.request.body
    await service.category.batchDelete(ids)
    this.success()
  }
}


module.exports = CategoryController;
