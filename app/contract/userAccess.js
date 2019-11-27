module.exports = {
  loginReq: {
    mobile: { type: 'string', description: '手机号', example: '15512345678', format: /^1[34578]\d{9}$/, },
    password: { type: 'string', description: '密码', example: 'Aa111111', },
  },
  logoutReq: {
  }
}