/**
 * 状态码：
 * 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 )
 * 客户端请求参数导致的错误(4xx开始)
 * 422: 报文的格式有问题。
 * @field err.status
 * @field err.message
 * 在内层中触发try catch： ctx.throw(status, message)
 */
module.exports = (option, app) => {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      // 在 app 上触发一个 error 事件，框架会记录一条错误日志
      app.emit('error', err);

      // 从 error 对象上读出各个属性，设置到响应中:
      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容message不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message
      ctx.body = {
        code: status,
        msg: error
      }

      if (status === 422) {
        ctx.body.detail = err.errors
      }

      ctx.status = 200
    }
  }
}