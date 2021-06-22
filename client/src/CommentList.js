import React from "react";

const CommentList = ({ comments = [] }) => {
  return (
    <ul>
      {comments.map((comment) => {
        let content = comment.content;

        switch (comment.status) {
          case "pending":
            content = "Waiting for approval";
            break;
          case "rejected":
            content = "Comment has been rejected";
            break;
          default:
            break;
        }
        return <li key={comment.id}>{content}</li>;
      })}
    </ul>
  );
};

export default CommentList;
