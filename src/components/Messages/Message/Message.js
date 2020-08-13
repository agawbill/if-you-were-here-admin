import React, { useState } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { withRouter } from "react-router-dom";
import styles from "./Message.module.css";
import Button from "react-bootstrap/Button";
import Spinner from "../../UI/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const Message = (props) => {
  const [count, setCount] = useState(100);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const approveLoading = useSelector((state) => state.message.approveLoading);
  const { approveHandler } = props;

  const selectorHandler = (id) => {
    props.history.push({
      pathname: `messages/${id}`,
      passedMessage: props.entry,
    });
  };

  const selectHandler = (messageLength) => {
    if (count === messageLength) {
      setCount(100);
    } else {
      setCount(messageLength);
    }
  };

  const summaryMessage = (message, count) => {
    const newBody = message.split(" ");

    if (newBody.length <= count) return message;

    const lastEl = newBody[count - 1].split("").slice(-1)[0];
    const punctuation = [".", "!", ",", "?", ";", ":", "&"];

    if (punctuation.indexOf(lastEl) !== -1) {
      return `${newBody.slice(0, count + 1).join(" ")}...`;
    }

    return `${newBody.slice(0, count).join(" ")}...`;
  };

  const date = new Date(props.entry.createdAt).toDateString();

  const flag = props.entry.flagged ? (
    <FontAwesomeIcon icon={faFlag} size={"lg"} />
  ) : null;

  let buttons = null;

  if (props.type === "pending") {
    buttons = (
      <>
        <Button
          variant="success"
          onClick={() => approveHandler({ id: props.entry._id, user, token })}
          className={styles.Icon}
        >
          Approve
        </Button>
        <Button
          onClick={() => selectorHandler(props.entry._id)}
          className={styles.Icon}
          variant="secondary"
        >
          Edit
        </Button>
        <Button
          onClick={() => props.deleteHandler(props.entry._id)}
          className={styles.Icon}
          variant="danger"
        >
          Delete
        </Button>
        <span className={styles.Flag}>{flag}</span>
      </>
    );
  } else {
    buttons = (
      <>
        <Button
          onClick={() => selectorHandler(props.entry._id)}
          className={styles.Icon}
          variant="secondary"
        >
          Edit
        </Button>
        <Button
          onClick={() => props.deleteHandler(props.entry._id)}
          className={styles.Icon}
          variant="danger"
        >
          Delete
        </Button>
      </>
    );
  }

  const messageBody = approveLoading ? (
    <Spinner />
  ) : (
    <div
      className={styles.Message}
      onClick={() => selectHandler(props.entry.message.length)}
    >
      <div className={styles.Icons}>{buttons}</div>
      <p>
        To my{" "}
        <span className={styles.MessageAttribute}> {props.entry.who.name}</span>
        ,
        <br />
        <span className={styles.MessageDate}>{date}</span>
      </p>
      <span className={styles.MessageMessage}>
        {parse(summaryMessage(props.entry.message, count))}
      </span>
      <p>
        From your{" "}
        <span className={styles.MessageAttribute}>
          {props.entry.identity.name}
        </span>
      </p>
    </div>
  );

  return <>{messageBody}</>;
};

export default withRouter(Message);
