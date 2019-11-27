exports.getUserSession = function() {
  return this.ctx.session.user;
}
exports.setUserSession = function(payload) {
  return this.ctx.session.user = payload;
}
