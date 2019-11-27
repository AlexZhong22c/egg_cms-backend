const { Controller } = require('egg');

module.exports = class BaseController extends Controller {
    get userSession() {
      return this.ctx.session.user;
    }
    success({ msg = '操作成功', data } = {}) {
      const { ctx } = this
      ctx.body = {
          code: 0,
          msg
      }
      if (data) {
        ctx.body.data = data;
      }
      ctx.status = 200
    }
    error(error) {
        console.error(error);
        this.ctx.body = {
            code: 1,
            msg: error.toString()
        }
    }
}
