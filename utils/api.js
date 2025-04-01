import axios from "axios";

function getAllArticles(page) {
  let url = `https://nc-news-5066.onrender.com/api/articles?limit=10&p=${page}`;
  return axios.get(url).then(({ data }) => {
    //console.log(data);
    return { articles: data.articles, totalCount: data.total_count };
  });
}

function getAllTopics() {
  let url = `https://nc-news-5066.onrender.com/api/topics`;
  return axios.get(url).then(({ data }) => {
    return data.topics;
  });
}

export { getAllArticles, getAllTopics };
