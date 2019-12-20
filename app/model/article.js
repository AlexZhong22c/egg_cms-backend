const autopopulate = require('mongoose-autopopulate');
const { baseSchemaExtend, baseSchemaOptions } = require('./base');

module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const { ObjectId } = Schema.Types;

  const commentSchema = new Schema(
    {
      ...baseSchemaExtend,
      commenter: { type: ObjectId, ref: 'User', autopopulate: true },
      content: { type: String, required: true },
    },
    baseSchemaOptions
  );

  const ArticleSchema = new Schema(
    {
      ...baseSchemaExtend,
      title: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: ObjectId, ref: 'User' },
      category: { type: ObjectId, ref: 'Category' },
      commentList: [commentSchema]
    },
    baseSchemaOptions
  )

  ArticleSchema.plugin(autopopulate);

  return mongoose.model('Article', ArticleSchema)
}
