const { baseSchemaExtend, baseSchemaOptions } = require('./base');

module.exports = app => {
  //先得到mongoose的模块,通过它可以定义骨架模型和model
  const mongoose = app.mongoose;
  //先定义Schema ，通过它可以定义集合里文档的属性名和类型
  //用户集合的模型骨架
  const UserSchema = new mongoose.Schema(
    {
      ...baseSchemaExtend,
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      avatar: { type: String, default: 'https://avatars1.githubusercontent.com/u/22023108' }
    },
    baseSchemaOptions
  )
  //返回一个用户模型，用户模型是可以对数据库进行增删改查的
  return mongoose.model('User', UserSchema)
}

