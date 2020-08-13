import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editMessageReset, fetchMessage } from "../../store/actions";
import { useParams } from "react-router-dom";
import styles from "./FullMessagePage.module.css";
import MessageInfoHeader from "../../components/MessageInfoHeader/MessageInfoHeader";
import MessageForm from "../../components/MessageForm/MessageForm";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Spinner from "../../components/UI/Spinner/Spinner";

const FullMessagePage = (props) => {
  const [validations, setValidations] = useState(null);
  const [message, setMessage] = useState(null);
  const [passedMessage, setPassedMessage] = useState(
    props.location.passedMessage
  );
  const currentMessage = useSelector((state) => state.message.currentMessage);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const editSuccess = useSelector((state) => state.message.editSuccess);
  const approveSuccess = useSelector((state) => state.message.approveSuccess);
  const fetchLoading = useSelector((state) => state.message.editLoading);
  const approveLoading = useSelector((state) => state.message.approveLoading);
  const error = useSelector((state) => state.message.error);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(editMessageReset());
  }, [dispatch]);

  useEffect(() => {
    if (!currentMessage && !passedMessage && id) {
      dispatch(fetchMessage(id));
    } else {
      const populatedMessage = currentMessage ? currentMessage : passedMessage;
      setMessage(populatedMessage);
    }
  }, [dispatch, id, currentMessage, passedMessage]);

  useEffect(() => {
    if (currentMessage && passedMessage) {
      setPassedMessage(null);
    }
  }, [currentMessage, passedMessage]);

  let editMessageForm = null;

  let messageInfoHeader = null;

  if (!currentMessage && !passedMessage && error) {
    editMessageForm = (
      <center>
        <span className={styles.validations}>ERROR: {error}</span>
      </center>
    );
  } else if (fetchLoading) {
    editMessageForm = <Spinner />;
  } else {
    editMessageForm = (
      <>
        <MessageForm
          user={user}
          token={token}
          id={id}
          setValidations={setValidations}
          message={message}
        />
        <br />
        <center>
          <span className={styles.validations}>
            {validations ? (
              <>
                {validations.join(", ")} <br />
              </>
            ) : null}

            {error}
          </span>
          <span className={styles.success}>
            {editSuccess && !validations ? "SUCCESS! Message updated." : null}
            {approveSuccess ? "SUCCESS! Message approved." : null}
          </span>
        </center>
      </>
    );
  }

  if (fetchLoading || approveLoading) {
    messageInfoHeader = <Spinner />;
  } else {
    messageInfoHeader = (
      <MessageInfoHeader user={user} token={token} id={id} message={message} />
    );
  }

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Edit Message</h1>
        </center>
        <br />
        {messageInfoHeader}
        {editMessageForm}
      </Jumbotron>
    </Container>
  );
};

export default withRouter(FullMessagePage);
