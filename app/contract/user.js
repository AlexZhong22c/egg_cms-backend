const addUserReq = {
  mobile: { type: 'string', description: '手机号', example: '15512345678', format: /^1[34578]\d{9}$/, },
  password: { type: 'string', description: '密码', example: 'Aa111111' },
  realName: { type: 'string', description: '姓名', example: 'Tom' },
};
const updateUserReq = {
  id: { type: 'string', description: '用户的ID', example: '1' },
  password: { type: 'string', required: false, description: '密码', example: 'Aa111111' },
  realName: { type: 'string', required: false, description: '姓名', example: 'Tom' },
};
const batchDeleteUserReq = {
  ids: { type: 'array', itemType: 'string', description: '用户的ID数组', example: ['1', '2', '3'] }
};
const pageUserReq = {
  currentPage: { type: 'integer', required: false, example: 1 },
  pageSize: { type: 'integer', required: false ,example: 5 },
  fields: { type: 'array', itemType: 'object', required: false, example: [] },
  populateFields: { type: 'array', itemType: 'string', required: false, example: [] }
};

module.exports = {
  addUserReq,
  updateUserReq,
  batchDeleteUserReq,
  pageUserReq
};
