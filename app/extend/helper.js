async function page(modelName, { fields = [], populateFields = [], currentPage = 1, pageSize = 5 } = {}) {
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
  const total = await this.ctx.model[modelName].countDocuments(query)

  return {
    currentPage,
    list: await pointer,
    pageSize,
    total,
  }
}

async function list(modelName, { fields = [], populateFields = [] } = {}) {
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

module.exports = {
  // 作为针对this指向的适配器；并且作为命名空间：
  get model() {
    return {
      page: page.bind(this),
      list: list.bind(this)
    }
  }
}
