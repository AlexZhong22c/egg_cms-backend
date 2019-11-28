const { resDataName } = require('../../config/constant')

module.exports = {
  idReq: {
    id: { type: 'string', description: 'id 唯一键', example: '1' },
  },
  baseRes: {
    code: { type: 'integer', example: 0 },
    [resDataName]: { type: 'string', example: '依情况返回' },
    msg: { type: 'string', example: '操作成功' },
  },
};
