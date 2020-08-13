import React from "react";
import styles from "./ResourceInfoHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const ResourceInfoHeader = (props) => {
  const { resource } = props;

  const createdBy =
    resource && resource.createdBy ? (
      <>
        <b>
          Created{" "}
          <FontAwesomeIcon
            icon={faPen}
            size={"1x"}
            style={{ color: "green" }}
          />{" "}
          by <span className={styles.User}>{resource.createdBy.email}</span> on{" "}
          {new Date(resource.createdAt).toDateString()}
        </b>
        <br />
      </>
    ) : null;

  const modifiedBy =
    resource && resource.modifiedBy ? (
      <>
        <b>
          Modified{" "}
          <FontAwesomeIcon
            icon={faEdit}
            size={"1x"}
            style={{ color: "orange" }}
          />{" "}
          by <span className={styles.User}> {resource.modifiedBy.email} </span>{" "}
          on {new Date(resource.updatedAt).toDateString()}
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

export default ResourceInfoHeader;
