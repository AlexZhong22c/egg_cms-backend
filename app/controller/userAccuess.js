const BaseController = require('./base');
/**
 * @Controller 用户鉴权
 */
class UserAccessController extends BaseController {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 用户登入
   * @router post /auth/login
   * @request body loginReq *body
   * @response 200 baseRes 操作成功
   */
  async login() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.loginReq);
    const payload = ctx.request.body || {}
    const data = await service.userAccess.login(payload)
    this.success({ data })
  }

  /**
   * @summary 用户登出
   * @router post /auth/logout
   * @request body logoutReq *body
   * @response 200 baseRes 操作成功
   */
  async logout() {
    const { service } = this
    await service.userAccess.logout()
    this.success()
  }

  /**
   * @summary 注册用户
   * @description 注册用户，记录用户账户/密码
   * @router post /auth/signin
   * @request body signinReq *body
   * @response 200 baseRes 操作成功
   */
  async signin() {
    const { ctx, service } = this
    ctx.validate(ctx.rule.signinReq)
    const payload = ctx.request.body || {}
    const data = await service.userAccess.signin(payload)
    this.success({data})
  }
}

module.exports = UserAccessController