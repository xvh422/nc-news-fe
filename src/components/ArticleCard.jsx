import {
  capitaliseFirstLetter,
  convertTimestampToDate,
} from "../../utils/utils";
import { Link } from "react-router";

function ArticleCard({ article }) {
  return (
    <li key={article.article_id} className="article-card">
      <div className="article-header">
        <p className="article-author">{article.author}</p>
        <p className="article-date">
          {convertTimestampToDate(article.created_at)}
        </p>
        <p className="article-topic">{capitaliseFirstLetter(article.topic)}</p>
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
        <span>
          <p>Votes: {article.votes}</p>
          <button>Like</button>
          <button>Dislike</button>
        </span>
        <Link to={`/articles/${article.article_id}`}>
          <span>
            <p className="article-comment-count">
              Comments: {article.comment_count}
            </p>
          </span>
        </Link>
      </div>
    </li>
  );
}

export default ArticleCard;
