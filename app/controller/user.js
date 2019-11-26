const Controller = require('egg').Controller;
/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /api/user/add
   * @request body addUserReq *body
   * @response 200 baseResponse 操作成功
   */
  async add() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.addUserReq)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.user.add(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 删除单个用户
   * @router post /api/user/delete
   * @request body deleteUserReq *body
   * @response 200 baseResponse 操作成功
   */
  async delete() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.request.body;
    // 调用 Service 进行业务处理
    await service.user.delete(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  /**
   * @summary 修改用户
   * @router post /api/user/update
   * @request body updateUserReq *body
   * @response 200 baseResponse 操作成功
   */
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.updateUserReq)
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.user.update(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  /**
   * @summary 获取单个用户信息
   * @router get /api/user/{id}
   * @request path string *id
   * @response 200 baseResponse 操作成功
   */
  async detail() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.user.detail(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  
  /**
   * @summary 获取所有用户(分页/模糊)
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 操作成功
   */
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.user.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 删除所选用户
   * @router delete /api/user/{id}
   * @request path string *id
   * @response 200 baseResponse 操作成功
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.user.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
}


module.exports = UserController;
