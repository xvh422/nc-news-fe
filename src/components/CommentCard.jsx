import {
  capitaliseFirstLetter,
  convertTimestampToDate,
} from "../../utils/utils";

function CommentCard({ comment }) {
  return (
    <li key={comment.comment_id} className="comment-card">
      <div className="comment-header">
        <p className="comment-author">{comment.author}</p>
        <p className="comment-date">
          {convertTimestampToDate(comment.created_at)}
        </p>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="comment-footer">
        <span>
          <p>Votes: {comment.votes}</p>
          <button>Like</button>
          <button>Dislike</button>
        </span>
      </div>
    </li>
  );
}

export default CommentCard;
