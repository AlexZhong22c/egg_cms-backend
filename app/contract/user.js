module.exports = {
  createUserRequest: {
    mobile: { type: 'string', required: true, description: '手机号', example: '15512345678', format: /^1[34578]\d{9}$/, },
    password: { type: 'string', required: true, description: '密码', example: 'Aa111111' },
    realName: { type: 'string', required: true, description: '姓名', example: 'Tom' },
  },
};
