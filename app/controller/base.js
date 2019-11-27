const { Controller } = require('egg');

module.exports = class BaseController extends Controller {
    // 建议error用ctx.throw(status, message)，再让中间件处理错误得到response:
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
}
