module.exports = {
  loginReq: {
    username: { type: 'string', description: '用户名', example: 'cmsAdmin', format: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/ },
    password: { type: 'string', description: '密码', example: 'Aa111111', },
  },
  logoutReq: {
  },
  signinReq: {
    username: { type: 'string', description: '用户名', example: 'cmsAdmin', format: /^[a-zA-Z][a-zA-Z0-9]{4,19}$/, },
    password: { type: 'string', description: '密码', example: 'Aa111111' },
    email: { type: 'string', description: '邮箱', example: '12345@163.com' },
  }
}