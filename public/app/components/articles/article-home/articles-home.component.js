var articlesHome = {
  templateUrl: './app/components/articles/article-home/articles-home.html',
  controller: ArticlesHomeController,
  bindings: {
    articles: '<',
    pageSettings: '<',
    title: '=?'
  }
};

angular.module('articles')
  .component('articlesHome', articlesHome);