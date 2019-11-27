exports.baseSchemaExtend = {
  createtime: { type: Date, default: Date.now },
  updatetime: { type: Date, default: Date.now }
};
exports.baseSchemaOptions = {
  timestamps: { createdAt: 'createtime', updatedAt: 'updatetime' }
};