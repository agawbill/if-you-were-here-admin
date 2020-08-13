import React from "react";
import styles from "./UserInfoHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const userInfoHeader = (props) => {
  const { user } = props;

  const userInfo = user ? (
    <>
      <span style={{ color: user.providerId ? "green" : "red" }}>
        <b>{user.providerId ? "Registered" : "Not Registered"}</b> <br />
      </span>
    </>
  ) : null;

  const createdBy =
    user && user.createdBy ? (
      <>
        <b>
          Created{" "}
          <FontAwesomeIcon
            icon={faPen}
            size={"1x"}
            style={{ color: "green" }}
          />{" "}
          by <span className={styles.User}>{user.createdBy.email}</span> on{" "}
          {new Date(user.createdAt).toDateString()}
        </b>
        <br />
      </>
    ) : null;

  const modifiedBy =
    user && user.modifiedBy ? (
      <>
        <b>
          Modified{" "}
          <FontAwesomeIcon
            icon={faEdit}
            size={"1x"}
            style={{ color: "orange" }}
          />{" "}
          by <span className={styles.User}> {user.modifiedBy.email} </span> on{" "}
          {new Date(user.updatedAt).toDateString()}
        </b>
      </>
    ) : null;

  return (
    <>
      {userInfo}
      <br />
      <div className={styles.Option}>
        {createdBy}
        {modifiedBy}
      </div>
      <hr />
    </>
  );
};

export default userInfoHeader;
