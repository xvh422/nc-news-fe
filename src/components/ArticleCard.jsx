import { useState } from "react";
import {
  capitaliseFirstLetter,
  convertTimestampToDate,
} from "../../utils/utils";
import { Link } from "react-router";
import { patchArticleVotes } from "../../utils/api";

function ArticleCard({ article, setCurrentTopic, setCurrentPage }) {
  const [votes, setVotes] = useState(article.votes);
  const [isError, setIsError] = useState(false);

  function handleLike() {
    setVotes(votes + 1);
    setIsError(false);
    patchArticleVotes(article.article_id).catch((err) => {
      setIsError(true);
      setVotes((currentVotes) => {
        return currentVotes - 1;
      });
    });
  }

  function handleDislike() {
    setVotes(votes - 1);
    setIsError(false);
    patchArticleVotes(article.article_id, false).catch((err) => {
      setIsError(true);
      setVotes((currentVotes) => {
        return currentVotes + 1;
      });
    });
  }

  function handleTopicClick() {
    setCurrentTopic(article.topic);
    setCurrentPage(1);
  }

  return (
    <li key={article.article_id} className="article-card">
      <div className="article-header">
        <p className="article-author">{article.author}</p>
        <p className="article-date">
          {convertTimestampToDate(article.created_at)}
        </p>
        <Link>
          <p className="article-topic" onClick={handleTopicClick}>
            {capitaliseFirstLetter(article.topic)}
          </p>
        </Link>
      </div>
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
      </Link>
      <div className="article-footer">
        <span className="article-votes">
          <p>Votes: {votes}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
          {isError ? <p>Vote failed. Please try again.</p> : null}
        </span>
        <span className="article-comment-count">
          <Link to={`/articles/${article.article_id}`}>
            <p>Comments: {article.comment_count}</p>
          </Link>
        </span>
      </div>
    </li>
  );
}

export default ArticleCard;
