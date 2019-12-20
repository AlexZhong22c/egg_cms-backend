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
  - 添加自定义类型`ObjectId`
- [x] **egg-cors**
  - 允许跨域(安全问题依照具体项目来优化)
- [x] **mongoose-autopopulate**
  -  [目前来说，功能足够灵活和强大](https://plugins.mongoosejs.io/plugins/autopopulate)

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

起因是因为发现报错`Cast to ObjectId failed for value ...`，我们加上egg-validate对ObjectId的检查，让它统一到该体系的422错误。

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

#### 为Queries方法封装orFail

> 各种`Model.find**`和`Model.find**And**`方法被归类为Queries方法，Queries方法执行后返回的是`Query对象`(而不是Promise)。 [参考通俗的解释](https://itbilu.com/nodejs/npm/Hyn15of14.html)

我想实现的需求是，执行`Model.find**`之后，如果find找不到对应的document，就去执行我定义的错误回调中的`ctx.throw(404, '该文章不存在')`。

执行`ctx.throw(404, '该文章不存在')`是为了抛出一个错误提示给前端，前端再按照约定在页面上展示给用户，用户就会看到类似“该文章不存在”这样的友好提示。

可以直接用不太优雅的代码来实现：

```js
  async myUpdate(payload) {
    const { ctx } = this
    const { id } = payload;
    const doc = await this.findById(id)
    if (!doc) {
      ctx.throw(404, cantFindText)
    }
    return this.findByIdAndUpdate(id, payload)
  }
```

以上代码实现了需求。但是其实执行了2次`find`；并且每次都要判断`if (!doc)`导致代码很多。

[经过讨论，作者受启发实现orFail接口](https://github.com/Automattic/mongoose/issues/3298) [orFail在官方文档中的位置](https://mongoosejs.com/docs/api.html#query_Query-orFail)

orFail接口在后续的新Mongoose版本中出现了以后，可以这样简单封装：

(像myUpdate这个service一样，其他service取而代之每次调用findByIdAndUpdateOrFail就不用加错误提示代码，清爽多了)

```js
  async myUpdate(payload) {
    const { id } = payload;
    return this.findByIdAndUpdateOrFail(id, payload)
  }

  async findByIdAndUpdateOrFail(...args) {
    return this.ctx.model[User].findByIdAndUpdate(...args)
      .orFail(() => this.ctx.throw(404, cantFindText));
  }
```

这个简单的封装：find方法后接`.orFail`有一个弊端就是：`orFail`被定位为用于一个查询语句的末端，所以没办法再后接`.populate`等方法，例如：

```js
const pointer = this.ctx.model['Article'].findByIdAndUpdate(id, payload);
pointer.populate('commentList.commenter').orFail(/*...*/) // 这样可以
pointer.orFail(/*...*/).populate('commentList.commenter') // 这样不行
```

##### 拓展阅读 Mongoose官方对`Queries查询`的定义

[官方说明Mongoose Queries are Not Promises](https://mongoosejs.com/docs/queries.html#queries-are-not-promises)

[官方对 Queries查询 的接口定义](http://mongoosejs.net/docs/queries.html)

##### 拓展阅读`Modal.exists`

如果在find之前先执行`Model.exists`判断，其实还是等价于用find查了2次。(`Model.exists`的底层实现还是`findOne`)

[Model.exists的模拟实现或者自定义插件实现](https://stackoverflow.com/questions/27482806/check-if-id-exists-in-a-collection-with-mongoose)

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
