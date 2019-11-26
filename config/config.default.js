/* eslint valid-jsdoc: "off" */

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
  };

  config.cluster = {
    listen: {
      port: 7009,
      hostname: '127.0.0.1',
    }
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_cms',
    options: {
      // useMongoClient: true,
      // still use mongoose old api: https://blog.csdn.net/qq_42760049/article/details/98593923
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,

      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  config.jwt = {
    secret: 'you_guess',
    // FIXME: 调试的时候先把它关了：
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
