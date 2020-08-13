import React from "react";
import { useDispatch } from "react-redux";
import styles from "./MessageInfoHeader.module.css";
import {
  approveMessage,
  fetchMessage,
  fetchMessages,
} from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const MessageInfoHeader = (props) => {
  const { message } = props;
  const dispatch = useDispatch();

  const approveHandler = async () => {
    await dispatch(
      approveMessage({ id: props.id, user: props.user, token: props.token })
    );
    await dispatch(fetchMessage(props.id));
    await dispatch(fetchMessages());
  };

  let approved = null;

  const flagged =
    message && message.flagged ? (
      <>
        <b>Flagged:</b>{" "}
        <FontAwesomeIcon icon={faFlag} size={"1x"} style={{ color: "red" }} />
        <br />
      </>
    ) : null;

  const modifiedBy =
    message && message.modifiedBy ? (
      <>
        <b>
          Modified{" "}
          <FontAwesomeIcon
            icon={faEdit}
            size={"1x"}
            style={{ color: "orange" }}
          />{" "}
          by <span className={styles.User}> {message.modifiedBy.email}</span> on{" "}
          {new Date(message.updatedAt).toDateString()}
        </b>
      </>
    ) : null;

  if (message && message.approved) {
    approved = (
      <>
        <b>
          Approved{" "}
          <FontAwesomeIcon
            icon={faCheck}
            size={"1x"}
            style={{ color: "green" }}
          />{" "}
          by <span className={styles.User}>{message.approvedBy.email}</span>
        </b>
        <br />
        <br />
      </>
    );
  } else if (message && !message.approved) {
    approved = (
      <>
        <b>Not approved </b>{" "}
        <FontAwesomeIcon icon={faTimes} size={"lg"} style={{ color: "red" }} />{" "}
        <br />
        <span onClick={() => approveHandler()} className={styles.link}>
          <b>Approve?</b>
        </span>
        <br />
        <br />
      </>
    );
  }

  return (
    <>
      {flagged}
      {approved}
      {modifiedBy}

      <hr />
    </>
  );
};

export default MessageInfoHeader;
