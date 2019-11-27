// controller/userAccess.js
'use strict'
const Controller = require('egg').Controller
/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {

  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 用户登入
   * @router post /auth/login
   * @request body loginRequest *body
   * @response 200 baseRes 操作成功
   */
  async login() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.loginRequest);
    // 组装参数
    const payload = ctx.request.body || {}

    // 调用 Service 进行业务处理
    const res = await service.userAccess.login(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res })
  }

  /**
   * @summary 用户登出
   * @router post /auth/logout
   * @request body loginRequest *body
   * @response 200 baseRes 操作成功
   */
  async logout() {
    const { ctx, service } = this
    // 调用 Service 进行业务处理
    await service.userAccess.logout()
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx })
  }
}

module.exports = UserAccessController