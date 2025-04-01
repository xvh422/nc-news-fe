import { useParams } from "react-router";
import CommentWrapper from "./CommentWrapper.jsx";
import useApiRequest from "../hooks/useApiRequest.jsx";
import { getArticleById } from "../../utils/api.js";
import {
  capitaliseFirstLetter,
  convertTimestampToDate,
} from "../../utils/utils.js";
import { useState } from "react";

function ArticlePage() {
  const { article_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: article = {},
    isLoading,
    isError,
  } = useApiRequest(getArticleById, article_id);

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

  return (
    <>
      {isError ? <h2>Something Went Wrong</h2> : null}
      {!isLoading ? (
        <section className="article-page">
          <div className="article-header">
            <p className="article-author">{article.author}</p>
            <p className="article-date">
              {convertTimestampToDate(article.created_at)}
            </p>
            <p className="article-topic">
              {capitaliseFirstLetter(article.topic)}
            </p>
          </div>
          <h2>{article.title}</h2>
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-image"
          />
          <p>{article.body}</p>
          <div className="article-footer">
            <span>
              <p>Votes: {article.votes}</p>
              <button>Like</button>
              <button>Dislike</button>
            </span>
            <span>
              <p className="article-comment-count">
                Comments: {article.comment_count}
              </p>
            </span>
            <label htmlFor="comments-order-selector">Order by</label>
            <select name="order-by" id="comments-order-selector">
              <option key="newest" value="Newest">
                Newest
              </option>
              <option key="most-popular" value="Most popular">
                Most popular
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
                Page: {currentPage}/{Math.ceil(article.comment_count / 10)}
              </p>
              <button
                onClick={
                  currentPage < Math.ceil(article.comment_count / 10)
                    ? handleChangePage
                    : null
                }
                value={"next"}
              >
                Next Page
              </button>
            </span>
          </div>
        </section>
      ) : (
        <h2>Loading...</h2>
      )}
      <CommentWrapper article={article} currentPage={currentPage} />
    </>
  );
}

export default ArticlePage;
