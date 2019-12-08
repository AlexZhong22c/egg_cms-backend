const addCategoryReq = {
  name: { type: 'string', description: '分类名', example: '学习类' }
};
const updateCategoryReq = {
  id: { type: 'string', description: 'ID', example: '1' },
  name: { type: 'string', description: '分类名', example: '学习类' }
};
const batchDelCategoryReq = {
  ids: { type: 'array', itemType: 'string', description: 'ID数组', example: ['1', '2', '3'] }
};
const listCategoryReq = {
  fields: { type: 'array', itemType: 'object', required: false, example: [] },
  populateFields: { type: 'array', itemType: 'string', required: false, example: [] }
};
module.exports = {
  addCategoryReq,
  updateCategoryReq,
  batchDelCategoryReq,
  listCategoryReq
};
