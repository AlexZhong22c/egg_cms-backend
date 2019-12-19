const { exampleObjectId } = require('../../config/constant');

const addCategoryReq = {
  name: { type: 'string', description: '分类名', example: '学习类' }
};
const updateCategoryReq = {
  id: { type: 'ObjectId', description: 'ID', example: exampleObjectId },
  name: { type: 'string', description: '分类名', example: '学习类' }
};

module.exports = {
  addCategoryReq,
  updateCategoryReq
};
