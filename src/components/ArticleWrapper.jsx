import axios from "axios";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import { getAllArticles, getAllTopics } from "../../utils/api.js";
import { capitaliseFirstLetter } from "../../utils/utils.js";

function ArticleWrapper() {
  const [allArticles, setAllArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTopics, setAllTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getAllArticles(currentPage)
      .then(({ data }) => {
        setAllArticles(data.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [currentPage]);

  useEffect(() => {
    setIsError(false);
    getAllTopics()
      .then(({ data }) => {
        setAllTopics(data.topics);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);

  return (
    <>
      <nav id="articles-navbar">
        <label htmlFor="articles-topic-selector">Topic</label>
        <select name="topics" id="articles-topic-selector">
          <option key="all" value="All">
            All
          </option>
          {allTopics.map((topic) => {
            return (
              <option
                key={topic.slug}
                value={capitaliseFirstLetter(topic.slug)}
              >
                {capitaliseFirstLetter(topic.slug)}
              </option>
            );
          })}
        </select>
        <label htmlFor="articles-order-selector">Order by</label>
        <select name="order-by" id="articles-order-selector">
          <option key="most-popular" value="Most popular">
            Most popular
          </option>
          <option key="newest" value="Newest">
            Newest
          </option>
          <option key="oldest" value="Oldest">
            Oldest
          </option>
          <option key="least-popular" value="Least popular">
            Least popular
          </option>
        </select>
      </nav>
      {isLoading ? <h2>Loading...</h2> : null}
      {isError ? <h2>Something went wrong</h2> : null}
      <ul>
        {allArticles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </ul>
    </>
  );
}

export default ArticleWrapper;
