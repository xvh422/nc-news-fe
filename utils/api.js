import axios from "axios";

function getAllArticles(page) {
  let url = `https://nc-news-5066.onrender.com/api/articles?limit=10&p=${page}`;
  return axios.get(url);
}

function getAllTopics() {
    let url = `https://nc-news-5066.onrender.com/api/topics`;
  return axios.get(url);
}

export { getAllArticles, getAllTopics };
