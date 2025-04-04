import { getCommentsByArticleId } from "../../utils/api.js";
import useApiRequest from "../hooks/useApiRequest.jsx";
import CommentCard from "./CommentCard.jsx";

function CommentWrapper({ article, currentPage }) {
  if (article.article_id) {
    const {
      data: comments = [],
      isLoading,
      isError,
    } = useApiRequest(getCommentsByArticleId, article.article_id, currentPage);

    return (
      <>
        {isError ? <h2>Something Went Wrong</h2> : null}
        {!isLoading ? (
          <ul>
            {comments.map((comment) => {
              return <CommentCard comment={comment} />;
            })}
          </ul>
        ) : (
          <h2>Loading...</h2>
        )}
      </>
    );
  }
}

export default CommentWrapper;
