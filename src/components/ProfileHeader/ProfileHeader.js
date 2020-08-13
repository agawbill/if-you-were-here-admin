import React from "react";
import { useDispatch } from "react-redux";
import styles from "./ProfileHeader.module.css";
import { toggleNotification } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MessageInfoHeader = (props) => {
  const { error } = props;
  const dispatch = useDispatch();

  const toggleHandler = async () => {
    await dispatch(
      toggleNotification({
        id: props.user.id,
        notifications: !props.user.notifications,
        token: props.token,
      })
    );
  };

  let userInfoHeader = null;

  if (props.user && props.user.notifications) {
    userInfoHeader = (
      <>
        <span className={styles.On}>ON</span>{" "}
        <FontAwesomeIcon
          icon={faCheck}
          size={"1x"}
          style={{ color: "green" }}
        />{" "}
        <br />
        <span onClick={() => toggleHandler()} className={styles.link}>
          <b>Turn Off?</b>
        </span>
      </>
    );
  } else if (props.user && !props.user.notifications) {
    userInfoHeader = (
      <>
        <span className={styles.Off}>OFF</span>{" "}
        <FontAwesomeIcon icon={faTimes} size={"lg"} style={{ color: "red" }} />{" "}
        <br />
        <span onClick={() => toggleHandler()} className={styles.link}>
          <b>Turn On?</b>
        </span>
      </>
    );
  }

  return (
    <>
      <b>Notifications:</b> {userInfoHeader}
      <center>
        <span className={styles.validations}>{error}</span>
      </center>
      <hr />
    </>
  );
};

export default MessageInfoHeader;
