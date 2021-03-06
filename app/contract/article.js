const { exampleObjectId } = require('../../config/constant')

const addArticleReq = {
  title: { type: 'string', description: '标题', example: 'javaScript由浅入深' },
  content: { type: 'string', description: '正文', example: '这里是正文这里是文章正文' },
  author: { type: 'ObjectId', required: false, description: '作者id', example: exampleObjectId },
  category: { type: 'ObjectId', required: false, description: '分类id', example: exampleObjectId }
};

// TODO: required属性 待定：
const updateArticleReq = {
  id: { type: 'ObjectId', description: 'ID', example: exampleObjectId },
  title: { type: 'string', description: '标题', example: 'javaScript由浅入深' },
  content: { type: 'string', description: '正文', example: '这里是正文这里是文章正文' },
  author: { type: 'ObjectId', description: '作者id', example: exampleObjectId },
  category: { type: 'ObjectId', description: '分类id', example: exampleObjectId }
};

const addArticleCommentReq = {
  id: { type: 'ObjectId', description: 'ID', example: exampleObjectId },
  username: { type: 'string', description: '用户名', example: 'cmsAdmin' },
  content: { type: 'string', description: '评论的内容', example: '这里是评论的内容，这里是评论的内容' },
};

const delArticleCommentReq = {
  id: { type: 'ObjectId', description: 'ID', example: exampleObjectId },
  commentId: { type: 'ObjectId', description: 'ID', example: exampleObjectId }
};

module.exports = {
  addArticleReq,
  updateArticleReq,
  addArticleCommentReq,
  delArticleCommentReq
};
