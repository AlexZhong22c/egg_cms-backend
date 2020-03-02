> [该项目对应的前端部分](https://github.com/AlexZhong22c/umi_cms-frontend)

# egg_cms-backend 内容管理系统后端

**功能实现：**

- 用户登入、用户登出
- 用户/文章分类/文章 各个模块 列出列表+分页列表+增删改查

**架构层面 演示：**

- [x] **egg-swagger-doc-feat**
  - 根据jsdoc生成路由，swagger+jsdoc调试开发
- [x] **egg-validate**
  - 根据contract模型校验
  - `ctx.validate(ctx.rule.xxx)`
  - 添加自定义类型`ObjectId`

**工程模块层面 演示：**

- [x] **egg-jwt**
  - `ctx.app.jwt.sign({ data, exp }, ctx.app.config.jwt.secret)`
- [x] **egg-mongoose**
  - 操作数据库
  - `ctx.model`
- [x] **mongoose-autopopulate**
  -  [目前来说，功能足够灵活和强大](https://plugins.mongoosejs.io/plugins/autopopulate)
- [x] **egg-cors**
  - 允许跨域(安全问题依照具体项目来优化)

**api运用层面 演示：**

- [x] **egg-bcrypt**
  - 混淆密码 对比密码
  - `ctx.genHash`
  - `ctx.compare`

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

## TODO:

- [ ] 校验密码格式；校验邮箱格式
- [ ] 修改密码或者重置密码没有独立出接口出来
- [ ] 目前用的是“子文档”来实现文档的嵌套，看看效果怎么样
- [ ] fields字段查询列表要优化一下，正则的效果不太行。比如搜“测试”，只输入“测”搜不出来。
- [ ] 如果操作的项在一条记录的某个字段下，findByIdAndUpdate没法只返回当前操作的项

## Q & A：

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

- [经过讨论，作者受启发实现orFail接口](https://github.com/Automattic/mongoose/issues/3298)
- [orFail在官方文档中的位置](https://mongoosejs.com/docs/api.html#query_Query-orFail)

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

#### 上传图片的组件

```shell
# 已安装：
npm i await-stream-ready stream-wormhole image-downloader -s
```

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
