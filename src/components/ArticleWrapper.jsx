import { useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import { getAllArticles, getAllTopics } from "../../utils/api.js";
import { capitaliseFirstLetter } from "../../utils/utils.js";
import useApiRequest from "../hooks/useApiRequest.jsx";

function ArticleWrapper() {
  const [currentPage, setCurrentPage] = useState(1);

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

  const {
    data: { articles = [], totalCount = 0 },
    isLoading,
    isError,
  } = useApiRequest(getAllArticles, currentPage);

  const { data: allTopics } = useApiRequest(getAllTopics);

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
      </nav>
      {isLoading ? <h2>Loading...</h2> : null}
      {isError ? <h2>Something went wrong</h2> : null}
      <ul>
        {articles.map((article) => {
          return <ArticleCard article={article} />;
        })}
      </ul>
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
