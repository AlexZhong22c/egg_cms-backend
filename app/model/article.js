const { baseSchemaExtend, baseSchemaOptions } = require('./base');

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;
  const ArticleSchema = new Schema(
    {
      ...baseSchemaExtend,
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: ObjectId, ref: 'User' },
      category: { type: ObjectId, ref: 'Category' }
      // 先不加pv。
      // 先不加comments。
      // name: { type: String, unique: true, required: true },
    },
    baseSchemaOptions
  )

  return mongoose.model('Article', ArticleSchema)
}
