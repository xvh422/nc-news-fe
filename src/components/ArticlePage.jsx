import { useParams } from "react-router";
import CommentWrapper from "./CommentWrapper.jsx";
import useApiRequest from "../hooks/useApiRequest.jsx";
import { getArticleById, patchArticleVotes } from "../../utils/api.js";
import {
  capitaliseFirstLetter,
  convertTimestampToDate,
} from "../../utils/utils.js";
import { useEffect, useState } from "react";

function ArticlePage() {
  const { article_id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [votes, setVotes] = useState(0);
  const [isVoteError, setIsVoteError] = useState(false);

  const {
    data: article = {},
    isLoading,
    isError,
  } = useApiRequest(getArticleById, article_id);

  useEffect(() => {
    setVotes(article.votes);
  }, [article.votes]);

  function handleLike() {
    setVotes(votes + 1);
    setIsVoteError(false);
    patchArticleVotes(article.article_id).catch((err) => {
      setIsVoteError(true);
      setVotes((currentVotes) => {
        return currentVotes - 1;
      });
    });
  }

  function handleDislike() {
    setVotes(votes - 1);
    setIsVoteError(false);
    patchArticleVotes(article.article_id, false).catch((err) => {
      setIsVoteError(true);
      setVotes((currentVotes) => {
        return currentVotes + 1;
      });
    });
  }

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
            <span className="article-votes">
              <p>Votes: {votes}</p>
              <button onClick={handleLike}>Like</button>
              <button onClick={handleDislike}>Dislike</button>
              {isVoteError ? <p>Vote failed. Please try again.</p> : null}
            </span>
            <span className="article-comment-count">
              <p>
                Comments: {article.comment_count}
              </p>
            </span>
            <span className="comments-page-select">
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
