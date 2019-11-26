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
const deleteUserReq = {
  id: { type: 'string', description: '用户的ID', example: '1' }
};

module.exports = {
  addUserReq,
  updateUserReq,
  deleteUserReq
};
