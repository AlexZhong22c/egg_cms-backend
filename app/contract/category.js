const addCategoryReq = {
  name: { type: 'string', description: '分类名', example: '学习类' }
};
const updateCategoryReq = {
  id: { type: 'string', description: 'ID', example: '1' },
  name: { type: 'string', description: '分类名', example: '学习类' }
};
const batchDeleteCategoryReq = {
  ids: { type: 'array', itemType: 'string', description: 'ID数组', example: ['1', '2', '3'] }
};

module.exports = {
  addCategoryReq,
  updateCategoryReq,
  batchDeleteCategoryReq
};
