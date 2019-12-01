module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ArticleAuthors', [{
    id: 1,
    articleId: 1,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    articleId: 2,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('ArticleAuthors', null, {}),
};
