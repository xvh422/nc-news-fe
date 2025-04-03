import { useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import { getAllArticles, getAllTopics } from "../../utils/api.js";
import { capitaliseFirstLetter } from "../../utils/utils.js";
import useApiRequest from "../hooks/useApiRequest.jsx";

function ArticleWrapper() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTopic, setCurrentTopic] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState("Newest");

  function handleChangePage(event) {
    switch (event.target.value) {
      case "next":
        setCurrentPage(currentPage + 1);
        break;
      case "previous":
        setCurrentPage(currentPage - 1);
        break;
      default:
        break;
    }
  }

  function handleTopicChange(event) {
    setCurrentTopic(event.target.value);
  }

  function handleOrderChange(event) {
    setSelectedOrder(event.target.value);
  }

  const {
    data: { articles = [], totalCount = 0 },
    isLoading,
    isError,
  } = useApiRequest(getAllArticles, currentPage, currentTopic, selectedOrder);

  const { data: allTopics } = useApiRequest(getAllTopics);

  return (
    <>
      <div id="articles-navbar">
        <label htmlFor="articles-topic-selector">Topic</label>
        <select
          name="topics"
          id="articles-topic-selector"
          onChange={handleTopicChange}
          value={capitaliseFirstLetter(currentTopic)}
        >
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
        <select
          name="order-by"
          id="articles-order-selector"
          onChange={handleOrderChange}
          value={selectedOrder}
        >
          <option key="newest" value="Newest">
            Newest
          </option>
          <option key="most-popular" value="Most Popular">
            Most Popular
          </option>
          <option key="oldest" value="Oldest">
            Oldest
          </option>
          <option key="least-popular" value="Least Popular">
            Least Popular
          </option>
        </select>
        <span className="page-select">
          <button
            onClick={currentPage > 1 ? handleChangePage : null}
            value={"previous"}
          >
            Previous Page
          </button>
          <p>
            Page: {currentPage}/{Math.ceil(totalCount / 10)}
          </p>
          <button
            onClick={
              currentPage < Math.ceil(totalCount / 10) ? handleChangePage : null
            }
            value={"next"}
          >
            Next Page
          </button>
        </span>
      </div>
      {isError ? <h2>Something went wrong</h2> : null}
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {articles.map((article) => {
            return (
              <ArticleCard
                article={article}
                setCurrentTopic={setCurrentTopic}
                setCurrentPage={setCurrentPage}
              />
            );
          })}
        </ul>
      )}
      <footer id="articles-footer">
        <span className="page-select">
          <button
            onClick={currentPage > 1 ? handleChangePage : null}
            value={"previous"}
          >
            Previous Page
          </button>
          <p>
            Page: {currentPage}/{Math.ceil(totalCount / 10)}
          </p>
          <button
            onClick={
              currentPage < Math.ceil(totalCount / 10) ? handleChangePage : null
            }
            value={"next"}
          >
            Next Page
          </button>
        </span>
      </footer>
    </>
  );
}

export default ArticleWrapper;
