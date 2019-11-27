module.exports = {
  idReq: {
    id: { type: 'string', description: 'id 唯一键', example: '1' },
  },
  baseRes: {
    code: { type: 'integer', example: 0 },
    data: { type: 'string', example: '依情况返回' },
    msg: { type: 'string', example: '操作成功' },
  },
};
