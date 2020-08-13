import React from "react";
import styles from "./PersonInfoHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const PersonInfoHeader = (props) => {
  const { person } = props;

  const createdBy =
    person && person.createdBy ? (
      <>
        <b>
          Created{" "}
          <FontAwesomeIcon
            icon={faPen}
            size={"1x"}
            style={{ color: "green" }}
          />{" "}
          by <span className={styles.User}>{person.createdBy.email}</span> on{" "}
          {new Date(person.createdAt).toDateString()}
        </b>
        <br />
      </>
    ) : null;

  const modifiedBy =
    person && person.modifiedBy ? (
      <>
        <b>
          Modified{" "}
          <FontAwesomeIcon
            icon={faEdit}
            size={"1x"}
            style={{ color: "orange" }}
          />{" "}
          by <span className={styles.User}> {person.modifiedBy.email} </span> on{" "}
          {new Date(person.updatedAt).toDateString()}
        </b>
      </>
    ) : null;

  return (
    <>
      <div className={styles.Option}>
        {createdBy}
        {modifiedBy}
      </div>
      <hr />
    </>
  );
};

export default PersonInfoHeader;
