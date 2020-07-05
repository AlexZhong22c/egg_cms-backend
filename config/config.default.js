/* eslint valid-jsdoc: "off" */
const { resDataName } = require('./constant')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574475944897_2235';

  // respond时候的包含主要返回内容的json的key:
  config.resDataName = resDataName;

  // add your middleware config here
  config.middleware = ['errorHandler'];

  config.swaggerdoc = {
    dirScanner: './app/controller',
    // 生成api文档的时候用的：
    apiInfo: {
      title: 'cms后台接口',
      description: '这里是描述',
      version: '1.0.0',
    },
    // 这些通常默认就行了：
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,
    // 根据文档自动生成路由：
    routerMap: true,
    enable: true,

    // 自定义类型：
    type: ['ObjectId'],
    itemType: ['ObjectId']
  };

  config.cluster = {
    listen: {
      port: 7009,
      hostname: '127.0.0.1',
    }
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_cms2',
    options: {
      // useMongoClient: true,
      // still use mongoose old api: https://blog.csdn.net/qq_42760049/article/details/98593923
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,

      // autoReconnect: true,
      // reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  // 默认是不能跨域的。现在用了一个egg插件egg-cors跨域，在正式上线的时候会去掉允许跨域。
  // 前端的axios也是给一个config：`withCredentials: true`
  config.security = {
    csrf: false,
    // 这个其实就是控制allow origin那些header:
    domainWhiteList: ['http://localhost:8000']
  }
  config.cors = {
    // 允许浏览器跨域发cookie
    credentials: true
  }

  config.jwt = {
    secret: 'you_guess',
    // FIXME: 调试的时候先临时把它关了：
    enable: true, // default is false
    match: /^\/api/, // optional
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
