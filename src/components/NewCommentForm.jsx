import { useContext, useState } from "react";
import { currentUserContext } from "../contexts/User";
import { postNewComment } from "../../utils/api";
import { useNavigate } from "react-router";

function NewCommentForm({ article, setNewComment, setCommentCount }) {
  const { currentUser } = useContext(currentUserContext);
  const [newCommentText, setNewCommentText] = useState("");
  const [isFormError, setIsFormError] = useState(false);
  const navigate = useNavigate();

  function handleTextChange(event) {
    setNewCommentText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsFormError(false);
    setCommentCount((commentCount) => {
      return Number(commentCount) + 1;
    });
    postNewComment(article.article_id, currentUser.username, newCommentText)
      .then((data) => {
        setNewComment(false);
        navigate(`/articles/${article.article_id}`, { replace: true });
      })
      .catch((err) => {
        setIsFormError(true);
        setCommentCount((commentCount) => {
          return Number(commentCount) - 1;
        });
      });
  }

  return (
    <form onSubmit={handleSubmit} id="new-comment-form">
      <label htmlFor="new-comment-text">Your Comment</label>
      <textarea
        name="new-comment-text"
        id="new-comment-text"
        onChange={handleTextChange}
        value={newCommentText}
      ></textarea>
      <button type="submit">Submit</button>
      {isFormError ? <p>Comment Submission failed. Please Try again.</p> : null}
    </form>
  );
}

export default NewCommentForm;
