# egg_cms-backend

- [x] **egg-bcrypt**
  - 混淆密码 对比密码
  - `ctx.genHash`
  - `ctx.compare`
- [x] **egg-jwt**
  - `ctx.app.jwt.sign({ data, exp }, ctx.app.config.jwt.secret)`
- [x] **egg-mongoose**
  - 操作数据库
  - `ctx.model`
- [x] **egg-swagger-doc-feat**
  - 根据jsdoc生成路由，swagger+jsdoc调试开发
- [x] **egg-validate**
  - 根据contract模型校验
  - `ctx.validate(ctx.rule.xxx)`
- [x] **egg-cors**
  - 允许跨域(安全问题依照具体项目来优化)

> 以上`this.ctx`简写为`ctx`。

演示了：

- [x] 抽象公共的 success response
- [x] 错误处理中间件拦截error，并记录错误日志
- [x] AppHooks： 在根目录创建app.js
- [x] 自动更新createdAt和updatedAt时间戳
- [x] 封装 获取分页 和 获取列表 接口
- [x] 用`id`代替`_id`返回给client
- [x] 变量名不要包含`delete`，免得解构到了哪一层和js关键字`delete`重名
- [ ] 接入EasyMock

## 路由

```
/auth/login 用户登入 post
/auth/logout 用户登出 post
```

## 状态码

- 401
  - 用户名或密码错误
- 404
  - 根据id去找该条记录，不存在
- 409
  - 该用户名已被注册
  - 此分类名已存在
- 422
  - 报文的格式有问题
  - 调用egg-validate插件校验不通过

## 上传

```shell
# 已安装：
npm i await-stream-ready stream-wormhole image-downloader -s
```

## TODO:

- [ ] 校验密码格式；校验邮箱格式
- [ ] 修改密码或者重置密码没有独立出接口出来


#### egg-validate 添加自定义类型 ObjectId

https://github.com/DG-Wangtao/egg-swagger-doc#contract%E5%AE%9A%E4%B9%89

```js
// app.js:
const ObjectIdRegex = /^[a-fA-F0-9]{24}$/;
// ...
  async willReady() {
      // All plugins have started, can do some thing before app ready
      this.app.validator.addRule('ObjectId', (rule, value) => {
        if (!ObjectIdRegex.test(value)) {
          return 'should be an ObjectId';
        }
      });
  }
```

> 而dto是定义一个对象的形式的格式，同样可被用作type，目前没用到。[参考](https://github.com/Yanshijie-EL/egg-swagger-doc/tree/master/test/fixtures/apps/swagger-doc-test/app/contract/dto)

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7009/
http://127.0.0.1:7009/swagger-ui.html
http://localhost:7009/public/index.html
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.
