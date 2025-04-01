import { useParams } from "react-router";
import CommentWrapper from "./CommentWrapper.jsx";
import useApiRequest from "../hooks/useApiRequest.jsx";
import { getArticleById } from "../../utils/api.js";
import {
  capitaliseFirstLetter,
  convertTimestampToDate,
} from "../../utils/utils.js";

function ArticlePage() {
  const { article_id } = useParams();

  const {
    data: article = {},
    isLoading,
    isError,
  } = useApiRequest(getArticleById, article_id);

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
          </div>
        </section>
      ) : (
        <h2>"Loading..."</h2>
      )}
      <CommentWrapper article_id={article_id} />
    </>
  );
}

export default ArticlePage;
