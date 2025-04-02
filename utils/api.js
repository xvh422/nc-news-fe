import axios from "axios";

function getAllTopics() {
  let url = `https://nc-news-5066.onrender.com/api/topics`;
  return axios.get(url).then(({ data }) => {
    return data.topics;
  });
}

function getUserByUsername(username) {
  let url = `https://nc-news-5066.onrender.com/api/users/${username}`;
  return axios.get(url).then(({ data }) => {
    return data.user;
  });
}

function getAllArticles(page) {
  let url = `https://nc-news-5066.onrender.com/api/articles?limit=10&p=${page}`;
  return axios.get(url).then(({ data }) => {
    return { articles: data.articles, totalCount: data.total_count };
  });
}

function getArticleById(article_id) {
  let url = `https://nc-news-5066.onrender.com/api/articles/${article_id}`;
  return axios.get(url).then(({ data }) => {
    return data.article;
  });
}

function patchArticleVotes(article_id, increase = true) {
  let url = `https://nc-news-5066.onrender.com/api/articles/${article_id}`;
  const requestBody = { inc_votes: increase ? 1 : -1 };
  return axios.patch(url, requestBody).then(({ data }) => {
    return data.article;
  });
}

function getCommentsByArticleId(article_id, page) {
  let url = `https://nc-news-5066.onrender.com/api/articles/${article_id}/comments?limit=10&p=${page}`;
  return axios.get(url).then(({ data }) => {
    return data.comments;
  });
}

export {
  getAllTopics,
  getUserByUsername,
  getAllArticles,
  getArticleById,
  patchArticleVotes,
  getCommentsByArticleId,
};
