const { resDataName } = require('../../config/constant')

module.exports = {
  idReq: {
    id: { type: 'string', description: 'id 唯一键', example: '1' },
  },
  listBaseReq: {
    fields: { type: 'array', itemType: 'object', required: false, example: [] },
    populateFields: { type: 'array', itemType: 'string', required: false, example: [] }
  },
  batchDelBaseReq: {
    ids: { type: 'array', itemType: 'string', description: 'ID数组', example: ['1', '2', '3'] }
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
