const { baseSchemaExtend, baseSchemaOptions } = require('./base');

module.exports = app => {
  const mongoose = app.mongoose;
  const CategorySchema = new mongoose.Schema(
    {
      ...baseSchemaExtend,
      name: { type: String, unique: true, required: true },
    },
    baseSchemaOptions
  )

  return mongoose.model('Category', CategorySchema)
}
