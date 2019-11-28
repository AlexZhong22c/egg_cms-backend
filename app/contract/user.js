const addUserReq = {
  username: { type: 'string', description: '用户名', example: 'cmsAdmin', format: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, },
  password: { type: 'string', description: '密码', example: 'Aa111111' },
  email: { type: 'string', description: '邮箱', example: '12345@163.com' },
};
const updateUserReq = {
  id: { type: 'string', description: '用户的ID', example: '1' },
  password: { type: 'string', required: false, description: '密码', example: 'Aa111111' },
  email: { type: 'string', required: false, description: '邮箱', example: '12345@163.com' },
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
