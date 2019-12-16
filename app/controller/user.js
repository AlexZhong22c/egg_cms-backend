const BaseController = require('./base');
/**
 * @Controller 用户管理
 */
class UserController extends BaseController {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码
   * @router post /api/user/add
   * @request body addUserReq *body
   * @response 200 baseRes 操作成功
   */
  async add() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.addUserReq)
    const payload = ctx.request.body || {}
    const data = await service.user.add(payload)
    this.success({data})
  }

  /**
   * @summary 删除单个用户
   * @router post /api/user/del
   * @request body idReq *body
   * @response 200 baseRes 操作成功
   */
  async del() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.idReq)
    const payload = ctx.request.body || {}
    await service.user.del(payload.id)
    this.success()
  }

  /**
   * @summary 修改用户
   * @router post /api/user/update
   * @request body updateUserReq *body
   * @response 200 baseRes 操作成功
   */
  async update() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.updateUserReq)
    const payload = ctx.request.body || {}
    await service.user.update(payload)
    this.success()
  }

  /**
   * @summary 获取单个用户信息
   * @router post /api/user/detail
   * @request body idReq *body
   * @response 200 baseRes 操作成功
   */
  async detail() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.idReq)
    const payload = ctx.request.body || {}
    const data = await service.user.detail(payload.id)
    this.success({ data })
  }

  /**
   * @summary 获取用户列表
   * @router post /api/user/list
   * @request body listBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async list() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.listBaseReq)
    const data = await service.user.list(ctx.request.body)
    this.success({ data })
  }

  /**
   * @summary 获取用户列表(分页)
   * @router post /api/user/page
   * @request body pageBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async page() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.pageBaseReq)
    const data = await service.user.page(ctx.request.body)
    this.success({ data })
  }

  /**
   * @summary 删除所选用户
   * @router post /api/user/batch/del
   * @request body batchDelBaseReq *body
   * @response 200 baseRes 操作成功
   */
  async batchDel() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.batchDelBaseReq)
    const { ids } = ctx.request.body
    const result = await service.user.batchDel(ids)
    this.success()
  }
}


module.exports = UserController;
