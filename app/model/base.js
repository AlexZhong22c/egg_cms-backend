exports.baseSchemaExtend = {
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date, default: Date.now }
};
// 另外，你还可以通过schemas.set复写这些参数：
exports.baseSchemaOptions = {
  timestamps: { createdAt: 'createtime', updatedAt: 'updatetime' },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id
      delete ret.password
    }
  }
};