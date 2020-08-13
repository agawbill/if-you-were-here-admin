import React from "react";
import Button from "react-bootstrap/Button";

const LoadMoreButton = (props) => {
  let loadMessages = null;

  if (props.show) {
    loadMessages = (
      <Button onClick={() => props.loadMoreMessages(14)}>LOAD MORE</Button>
    );
  }
  return loadMessages;
};

export default LoadMoreButton;
