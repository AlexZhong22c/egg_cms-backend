const moment = require('moment')

// 操作成功响应
exports.success = ({ ctx, res = null, msg = '操作成功' }) => {
    ctx.body = {
        code: 0,
        msg
    }
    if (res) {
        ctx.body.data = res;
    }
    ctx.status = 200
}

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')
