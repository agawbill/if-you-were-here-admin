import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./User.module.css";
import Button from "react-bootstrap/Button";

const UserSnapshot = (props) => {
  const selectorHandler = (id) => {
    props.history.push({
      pathname: `users/${id}`,
      passedUser: props.user,
    });
  };

  const buttons = (
    <span className={styles.UserButtons}>
      <Button
        style={{ marginRight: "5px" }}
        onClick={() => selectorHandler(props.user._id)}
        variant="secondary"
      >
        Edit
      </Button>
      <Button
        onClick={() => props.deleteHandler(props.user._id)}
        variant="danger"
      >
        Delete
      </Button>
    </span>
  );

  const userBody = (
    <div className={styles.User}>
      <b>Name:</b> {props.user.firstName} {props.user.lastName} <br />
      <b>Email:</b> {props.user.email} <br />
      <b>Role:</b> {props.user.role}
    </div>
  );

  return (
    <>
      {buttons}
      {userBody}
    </>
  );
};

export default withRouter(UserSnapshot);
