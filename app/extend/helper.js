exports.getUserSession = function() {
  return this.ctx.session.user;
}
exports.setUserSession = function(payload) {
  return this.ctx.session.user = payload;
}

exports.page = async function({ modelName, fields = [], populateFields = [], currentPage = 1, pageSize = 5 }) {
  if (!modelName) throw Error('请传入modelName');

  currentPage = isNaN(currentPage) ? 1 : parseInt(currentPage, 10)
  pageSize = isNaN(pageSize) ? 5 : parseInt(pageSize, 10)
  
  const skip = (currentPage - 1) * pageSize
  let query = {}
  if (fields.length) {
    query['$and'] = fields
  }
  let pointer = this.ctx.model[modelName]
    .find(query).skip(skip).limit(pageSize).sort({ createtime: -1 })
  for (const pfItem of populateFields) {
    pointer = pointer.populate(pfItem)
  }
  const total = await this.ctx.model[modelName].count({})

  return {
    currentPage,
    list: await pointer,
    pageSize,
    total,
  }
}

exports.list = async function ({ modelName, fields = [], populateFields = []}) {
  if (!modelName) throw Error('请传入modelName');

  let query = {}
  if (fields.length) {
    query['$and'] = fields
  }
  let pointer = this.ctx.model[modelName].find(query).sort({ createtime: -1 })
  for (const pfItem of populateFields) {
    pointer = pointer.populate(pfItem)
  }
  return {
    list: await pointer
  }
}
