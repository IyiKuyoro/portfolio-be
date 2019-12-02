module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ArticleAuthors', [{
    articleId: 1,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    articleId: 2,
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('ArticleAuthors', null, {}),
};
