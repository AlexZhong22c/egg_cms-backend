const addArticleReq = {
  title: { type: 'string', description: '标题', example: 'javaScript由浅入深' },
  content: { type: 'string', description: '正文', example: '这里是正文这里是文章正文' },
  author: { type: 'string', required: false, description: '作者id', example: '1' },
  category: { type: 'string', required: false, description: '分类id', example: '2' }
};

// TODO: required属性 待定：
const updateArticleReq = {
  id: { type: 'string', description: 'ID', example: '1' },
  title: { type: 'string', description: '标题', example: 'javaScript由浅入深' },
  content: { type: 'string', description: '正文', example: '这里是正文这里是文章正文' },
  author: { type: 'string', description: '作者id', example: '1' },
  category: { type: 'string', description: '分类id', example: '2' }
};
const batchDeleteArticleReq = {
  ids: { type: 'array', itemType: 'string', description: 'ID数组', example: ['1', '2', '3'] }
};
const listArticleReq = {
  fields: { type: 'array', itemType: 'object', required: false, example: [] },
  populateFields: { type: 'array', itemType: 'string', required: false, example: [] }
};
module.exports = {
  addArticleReq,
  updateArticleReq,
  batchDeleteArticleReq,
  listArticleReq
};
