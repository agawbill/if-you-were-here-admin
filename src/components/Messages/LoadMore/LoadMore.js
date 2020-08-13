import React, { useState } from "react";
import Message from "../Message/Message";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import ListGroup from "react-bootstrap/ListGroup";

//in the future, if there were to be more than 1000 posts lets say, I would load 500 posts at a time (via the api), and use the
//useEffect hook to call the api to load another 500 posts once messageCutoff reached a certain point (like 470)
//to maximize efficiency and speed

const LoadMore = (props) => {
  const [messagesCutoff, setMessagesCutoff] = useState(14);
  const [filteredCutoff, setFilteredCutoff] = useState(14);

  const [approvedCutoff, setApprovedCutoff] = useState(14);
  const [filteredApprovedCutoff, setFilteredApprovedCutoff] = useState(14);

  //calculate how many messages can be loaded that aren't already displayed
  //if each respective value is greater than 0, the loadmore button should display
  const filteredCalculation = props.filteredMessages
    ? props.filteredMessages.length - filteredCutoff
    : null;
  const messageCalculation = props.messages
    ? props.messages.length - messagesCutoff
    : null;

  const filteredApprovedCalculation = props.filteredMessages
    ? props.filteredMessages.length - filteredApprovedCutoff
    : null;
  const approvedCalculation = props.messages
    ? props.messages.length - approvedCutoff
    : null;

  //calculate the marker (the amount of posts to load... another 14, or if there are less than 14 left to load,
  //the remaining amount) and set the cutoff
  const loadMoreFilteredMessages = (count) => {
    if (props.type === "pending") {
      const marker = filteredCalculation >= count ? count : filteredCalculation;
      setFilteredCutoff((prevState) => prevState + marker);
    } else {
      const marker =
        filteredApprovedCalculation >= count
          ? count
          : filteredApprovedCalculation;
      setFilteredApprovedCutoff((prevState) => prevState + marker);
    }
  };

  const loadMoreMessages = (count) => {
    if (props.type === "pending") {
      const marker = messageCalculation >= count ? count : messageCalculation;
      setMessagesCutoff((prevState) => prevState + marker);
    } else {
      const marker = approvedCalculation >= count ? count : approvedCalculation;
      setApprovedCutoff((prevState) => prevState + marker);
    }
  };

  let loadMessages = null;
  let loadedMessages = null;

  //display the loadmore for unfiltered messages, or display the loadmore (button and messages) for filtered messages.
  if (props.filteredMessages && props.filteredMessages.length > 14) {
    loadMessages =
      props.type === "pending" ? (
        <LoadMoreButton
          show={filteredCalculation > 0}
          loadMoreMessages={loadMoreFilteredMessages}
        />
      ) : (
        <LoadMoreButton
          show={filteredApprovedCalculation > 0}
          loadMoreMessages={loadMoreFilteredMessages}
        />
      );

    const filteredMarker =
      props.type === "pending" ? filteredCutoff : filteredApprovedCutoff;

    loadedMessages = props.filteredMessages
      .slice(14, filteredMarker)
      .map((message, index) => {
        return (
          <span key={index}>
            <ListGroup.Item
              style={{ borderColor: message.flagged ? "red" : null }}
            >
              <Message
                key={index}
                entry={message}
                marker={index + 14}
                deleteHandler={props.deleteHandler}
                approveHandler={props.approveHandler}
                type={props.type}
              ></Message>
            </ListGroup.Item>
            <br />
          </span>
        );
      });
  } else if (props.messages && props.messages.length > 14) {
    loadMessages =
      props.type === "pending" ? (
        <LoadMoreButton
          show={messageCalculation > 0}
          loadMoreMessages={loadMoreMessages}
        />
      ) : (
        <LoadMoreButton
          show={approvedCalculation > 0}
          loadMoreMessages={loadMoreMessages}
        />
      );

    const messagesMarker =
      props.type === "pending" ? messagesCutoff : approvedCutoff;

    loadedMessages = props.messages
      .slice(14, messagesMarker)
      .map((message, index) => {
        return (
          <span key={index}>
            <ListGroup.Item
              style={{ borderColor: message.flagged ? "red" : null }}
            >
              <Message
                key={index}
                entry={message}
                marker={index + 14}
                deleteHandler={props.deleteHandler}
                approveHandler={props.approveHandler}
                type={props.type}
              ></Message>
            </ListGroup.Item>
            <br />
          </span>
        );
      });
  }

  return (
    <>
      <ListGroup>{loadedMessages}</ListGroup>
      <center>{loadMessages}</center>
      <br />
    </>
  );
};

export default LoadMore;
