import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editMessageReset,
  deleteMessage,
  fetchMessages,
  sortApproved,
  approveMessage,
  sortPending,
} from "../../store/actions";
import Modal from "../../components/UI/Modal/Modal";
import LoadMore from "./LoadMore/LoadMore";
import ListGroup from "react-bootstrap/ListGroup";
import Message from "./Message/Message";

const Messages = (props) => {
  const [show, setShow] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const {
    type,
    filteredApproved,
    pendingMessages,
    filteredPending,
    approvedMessages,
  } = props;

  const dispatch = useDispatch();

  const selectHandler = (id) => {
    setMessageId(id);
    dispatch(editMessageReset());
    setShow(true);
  };

  const resetHandler = () => {
    setShow(false);
  };

  const deleteHandler = async (id, type) => {
    await dispatch(deleteMessage(id, token));
    await dispatch(fetchMessages());
    if (type === "pending") {
      dispatch(sortPending());
    } else if (type === "approved") {
      dispatch(sortApproved());
    }
    setShow(false);
  };

  const approveHandler = async (payload) => {
    await dispatch(approveMessage(payload));
    await dispatch(fetchMessages());
  };

  let messages = null;
  let loadMore = null;

  if (type === "pending") {
    loadMore = (
      <LoadMore
        messages={pendingMessages}
        filteredMessages={filteredPending}
        approveHandler={approveHandler}
        type={type}
      />
    );
    if (filteredPending.length > 0) {
      messages = filteredPending.slice(0, 14).map((msg, index) => {
        return (
          <span key={index}>
            <ListGroup.Item style={{ borderColor: msg.flagged ? "red" : null }}>
              <Message
                entry={msg}
                deleteHandler={selectHandler}
                approveHandler={approveHandler}
                type={type}
              />
            </ListGroup.Item>
            <br />
          </span>
        );
      });
    } else {
      messages =
        pendingMessages && pendingMessages.length > 0
          ? pendingMessages.slice(0, 14).map((msg, index) => {
              return (
                <span key={index}>
                  <ListGroup.Item
                    style={{ borderColor: msg.flagged ? "red" : null }}
                  >
                    <Message
                      entry={msg}
                      type={type}
                      deleteHandler={selectHandler}
                      approveHandler={approveHandler}
                    />
                  </ListGroup.Item>
                  <br />
                </span>
              );
            })
          : "No pending messages yet";
    }
  } else if (type === "approved") {
    loadMore = (
      <LoadMore
        messages={approvedMessages}
        filteredMessages={filteredApproved}
        deleteHandler={selectHandler}
        approveHandler={approveHandler}
        type={type}
      />
    );

    if (filteredApproved.length > 0) {
      messages = filteredApproved.slice(0, 14).map((msg, index) => {
        return (
          <span key={index}>
            <ListGroup.Item style={{ borderColor: msg.flagged ? "red" : null }}>
              <Message
                entry={msg}
                type={type}
                deleteHandler={selectHandler}
                approveHandler={approveHandler}
              />
            </ListGroup.Item>
            <br />
          </span>
        );
      });
    } else {
      messages =
        approvedMessages && approvedMessages.length > 0
          ? approvedMessages.slice(0, 14).map((msg, index) => {
              return (
                <span key={index}>
                  <ListGroup.Item
                    style={{ borderColor: msg.flagged ? "red" : null }}
                  >
                    <Message
                      entry={msg}
                      type={type}
                      deleteHandler={selectHandler}
                      approveHandler={approveHandler}
                    />
                  </ListGroup.Item>
                  <br />
                </span>
              );
            })
          : "No approved messages yet";
    }
  }

  let modalBody = <>Are you sure you want to delete this item?</>;

  return (
    <>
      <Modal
        show={show}
        itemId={messageId}
        cancelHandler={resetHandler}
        acceptHandler={deleteHandler}
        type={type}
        title="Delete"
      >
        {modalBody}
      </Modal>
      <ListGroup>{messages}</ListGroup>
      {loadMore}
    </>
  );
};

export default Messages;
