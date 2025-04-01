import { useState } from "react";
import { getCommentsByArticleId } from "../../utils/api.js";
import useApiRequest from "../hooks/useApiRequest.jsx";
import CommentCard from "./CommentCard.jsx";

function CommentWrapper({ article_id }) {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: comments = [],
    isLoading,
    isError,
  } = useApiRequest(getCommentsByArticleId, article_id, currentPage);

  console.log(comments);

  return (
    <>
      {isError ? <h2>Something Went Wrong</h2> : null}
      {!isLoading ? (
        <ul>
          {comments.map((comment) => {
            return <CommentCard comment={comment} />;
          })}
        </ul>
      ) : null}
    </>
  );
}

export default CommentWrapper;
