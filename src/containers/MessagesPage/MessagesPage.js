import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MessagesPage.module.css";
import Messages from "../../components/Messages/Messages";
import FilterSort from "../FilterSort/FilterSort";
import {
  sortReset,
  approveMessageReset,
  deleteMessageReset,
} from "../../store/actions";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

const MessagePage = () => {
  const [messageType, setMessageType] = useState("pending");
  const approveSuccess = useSelector((state) => state.message.approveSuccess);
  const deleteSuccess = useSelector((state) => state.message.deleteSuccess);
  const pendingMessages = useSelector(
    (state) => state.messages.pendingMessages
  );
  const filteredPending = useSelector(
    (state) => state.messages.filteredPending
  );
  const approvedMessages = useSelector(
    (state) => state.messages.approvedMessages
  );
  const filteredApproved = useSelector(
    (state) => state.messages.filteredApproved
  );
  const error = useSelector((state) => state.message.error);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(approveMessageReset());
      dispatch(deleteMessageReset());
    };
  }, [dispatch]);

  const messageTypeHandler = (type) => {
    setMessageType(type);
    dispatch(sortReset());
  };

  let [pendingClasses, allClasses] = [styles.link, styles.link];

  if (messageType === "pending") {
    [pendingClasses, allClasses] = [styles.selected, styles.link];
  } else if (messageType === "approved") {
    [pendingClasses, allClasses] = [styles.link, styles.selected];
  }

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Messages</h1>
          <br />
          <center>
            <span
              className={pendingClasses}
              onClick={() => messageTypeHandler("pending")}
            >
              Pending
            </span>{" "}
            |{" "}
            <span
              className={allClasses}
              onClick={() => messageTypeHandler("approved")}
            >
              Approved
            </span>
          </center>
        </center>
        <br />
        <FilterSort type={messageType} />
        <br />
        <center>
          <span className={styles.validations}>{error}</span>
          <span className={styles.success}>
            {approveSuccess ? "SUCCESS! Message approved." : null}
            {deleteSuccess ? "SUCCESS! Message removed." : null}
          </span>
        </center>
      </Jumbotron>
      <Messages
        pendingMessages={pendingMessages}
        approvedMessages={approvedMessages}
        filteredApproved={filteredApproved}
        filteredPending={filteredPending}
        type={messageType}
      />
    </Container>
  );
};

export default MessagePage;
