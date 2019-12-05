const BaseController = require('./base');
/**
 * @Controller 测试
 */
class TestController extends BaseController {
  /**
   * @summary 请求成功
   * @router post /api/test/good
   * @response 200 baseRes 操作成功
   */
  async good() {
    this.success({data: '依情况返回' })
  }
  
  /**
   * @summary 请求失败
   * @router post /api/test/bad
   * @response 400 baseRes 操作失败
   */
  async bad() {
    // this.ctx.throw(500, '失败40000000000')
    this.ctx.throw(422, '格式有问题')
  }

}


module.exports = TestController;