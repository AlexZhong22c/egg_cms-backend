const { resDataName, exampleObjectId } = require('../../config/constant')

module.exports = {
  idReq: {
    id: { type: 'ObjectId', description: 'id 唯一键', example: exampleObjectId },
  },
  listBaseReq: {
    fields: { type: 'array', itemType: 'object', required: false, example: [] },
    populateFields: { type: 'array', itemType: 'string', required: false, example: [] }
  },
  batchDelBaseReq: {
    ids: { type: 'array', itemType: 'ObjectId', description: 'ID数组', example: [exampleObjectId, exampleObjectId, exampleObjectId] }
  },
  pageBaseReq: {
    currentPage: { type: 'integer', required: false, example: 1 },
    pageSize: { type: 'integer', required: false ,example: 5 },
    fields: { type: 'array', itemType: 'object', required: false, example: [] },
    populateFields: { type: 'array', itemType: 'string', required: false, example: [] }
  },
  baseRes: {
    code: { type: 'integer', example: 0 },
    [resDataName]: { type: 'string', example: '依情况返回' },
    msg: { type: 'string', example: '操作成功' },
  },
};
