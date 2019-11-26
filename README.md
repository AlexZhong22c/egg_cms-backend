# cms_usage-demo

- [x] egg-bcrypt
  - [x] ctx.genHash
  - [x] ctx.compare
- [x] egg-jwt
  - [x] ctx.app.jwt.sign({ data, exp }, ctx.app.config.jwt.secret)
- [x] egg-mongoose
  - [x] ctx.model
- [x] egg-swagger-doc-feat: 根据jsdoc生成路由，swagger+jsdoc调试开发
- [x] egg-validate: 根据contract模型校验
  - [x] ctx.validate(ctx.rule.xxx)

> 以上`this.ctx`简写为`ctx`。

## 路由

```
/auth/login 用户登入 post
/auth/logout 用户登出 post
```

## 上传

```shell
# 已安装：
npm i await-stream-ready stream-wormhole image-downloader -s
```

【待续】

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
