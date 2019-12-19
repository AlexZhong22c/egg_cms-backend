const ObjectIdRegex = /^[a-fA-F0-9]{24}$/;
/**
 *  全局定义
 * @param app
 */
class AppHooks {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
    this.app.validator.addRule('ObjectId', (rule, value) => {
      if (!ObjectIdRegex.test(value)) {
        return 'should be an ObjectId';
      }
    });
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    console.log('========Init Data=========')
    const ctx = await this.app.createAnonymousContext();
    await ctx.model.Article.deleteMany();
    await ctx.model.Category.deleteMany();
    await ctx.model.User.deleteMany();
    const category = await ctx.service.category.add({
      name: '学习类'
    })
    const user = await ctx.service.user.add({
      username: 'cmsAdmin',
      password: 'Aa111111',
      email: '12345@163.com',
    })
    const article = await ctx.service.article.add({
      title: '深入浅出JavaScript',
      content: '这里是正文这里是正文',
      author: user.id,
      category: category.id
    })
    const commentList = await ctx.service.article.addComment({
      id: article.id,
      username: user.username,
      content: '这里是评论的内容，这里是评论的内容'
    })

    const printWithColor = (str) => `\x1B[36m${str}\x1B[0m`
    console.log(printWithColor('testing category id:'), category.id)
    console.log(printWithColor('testing user id:'), user.id)
    console.log(printWithColor('testing article id:'), article.id)
    console.log(printWithColor('testing comment id:'), commentList[0].id)
  }

  async serverDidReady() {

  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppHooks;

