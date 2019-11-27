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
  }

  async didReady() {
      // Worker is ready, can do some things
      // don't need to block the app boot.
      console.log('========Init Data=========')
      const ctx = await this.app.createAnonymousContext();
      await ctx.model.User.deleteMany();
      await ctx.service.user.add({
          mobile: '15512345678',
          password: 'Aa111111',
          realName: '22c',
      })
  }

  async serverDidReady() {

  }

  async beforeClose() {
      // Do some thing before app close.
  }
}

module.exports = AppHooks;

