const uuidv4 = require('uuid/v4');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [{
    id: 1,
    uuid: uuidv4(),
    title: 'Demo Article 1',
    slug: 'demo-article-1-1234',
    category: 'tech',
    imageUrl: null,
    imagePublicId: null,
    link: null,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      + ' Proin neque ligula, fermentum eu libero ut, dapibus molestie lectus.'
      + ' Pellentesque iaculis eros et lacus commodo, at molestie nibh ullamcorper.'
      + ' Quisque tincidunt mi lorem, eget consequat velit bibendum eu.'
      + ' Nullam finibus dui quam, eu imperdiet libero elementum vel.'
      + ' Quisque vitae ultricies ante. Aenean sed augue dolor.'
      + ' Donec bibendum nec lorem nec accumsan. Aenean mattis efficitur tellus.'
      + ' Praesent faucibus lorem leo, non sagittis lacus placerat eget.'
      + ' Curabitur eu sodales elit. Duis eu metus dictum nibh varius tempor.'
      + ' Nulla lectus metus, commodo id mi sit amet, faucibus dignissim lectus.'
      + ' Morbi gravida tincidunt venenatis. Sed dui arcu, tempus lacinia ex a,'
      + ' luctus pellentesque sapien. Suspendisse non metus in neque interdum consequat.'
      + ' Pellentesque aliquam vulputate ex quis condimentum.',
    external: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    id: 2,
    uuid: uuidv4(),
    title: 'Demo Article 2',
    slug: 'demo-article-2-12345',
    category: 'tech',
    imageUrl: null,
    imagePublicId: null,
    link: 'https://medium.com/faun/net-core-circleci-config-tutorial-for-the-absolute-devops-novice-e125d5f227c1',
    body: null,
    external: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Articles', null, {}),
};
