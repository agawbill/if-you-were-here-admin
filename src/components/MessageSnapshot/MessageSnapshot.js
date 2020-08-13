import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import styles from "./MessageSnapshot.module.css";

const MessageSnapshot = (props) => {
  const pendingMessages = useSelector(
    (state) => state.messages.pendingMessages
  );
  const approvedMessages = useSelector(
    (state) => state.messages.approvedMessages
  );
  const messagesFlagged = pendingMessages.filter(
    (message) => message.flagged === true
  ).length;

  const clickHandler = () => {
    props.history.push("/admin/messages");
  };

  return (
    <Card style={{ marginBottom: "15px" }}>
      <Card.Header>
        <b>Messages</b>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Count:</b> {pendingMessages.length + approvedMessages.length}
          <br />
          <b>Pending:</b> {pendingMessages.length}
          <br />
          <b>Flagged:</b> {messagesFlagged}
          <br />
        </Card.Text>
        <Card.Link className={styles.link} onClick={clickHandler}>
          Go to Messages
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default withRouter(MessageSnapshot);
