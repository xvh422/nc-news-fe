import { useState } from "react";
import { convertTimestampToDate } from "../../utils/utils";
import { patchCommentVotes } from "../../utils/api";

function CommentCard({ comment }) {
  const [votes, setVotes] = useState(comment.votes);
  const [isVoteError, setIsVoteError] = useState(false);

  function handleLike() {
    setVotes(votes + 1);
    setIsVoteError(false);
    patchCommentVotes(comment.comment_id).catch((err) => {
      setIsVoteError(true);
      setVotes((currentVotes) => {
        return currentVotes - 1;
      });
    });
  }

  function handleDislike() {
    setVotes(votes - 1);
    setIsVoteError(false);
    patchCommentVotes(comment.comment_id, false).catch((err) => {
      setIsVoteError(true);
      setVotes((currentVotes) => {
        return currentVotes + 1;
      });
    });
  }

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
          <p>Votes: {votes}</p>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
          {isVoteError ? <p>Vote failed. Please try again.</p> : null}
        </span>
      </div>
    </li>
  );
}

export default CommentCard;
