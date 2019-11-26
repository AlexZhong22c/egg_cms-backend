module.exports = {
  baseRequest: {
    id: { type: 'string', description: 'id 唯一键' ,required: true, example: '1' },
  },
  baseResponse: {
    code: { type: 'integer', required: true, example: 0 },
    data: { type: 'string', example: '操作成功' },
    msg: { type: 'string', example: '操作成功' },
  },
};
