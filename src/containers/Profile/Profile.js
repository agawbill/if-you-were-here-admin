import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleNotificationReset } from "../../store/actions";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Spinner from "../../components/UI/Spinner/Spinner";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const notificationSuccess = useSelector(
    (state) => state.auth.notificationSuccess
  );
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (notificationSuccess || error) {
        dispatch(toggleNotificationReset());
      }
    };
  }, [dispatch, notificationSuccess, error]);

  const notificationLoading = useSelector((state) => state.auth.loading);

  const messageInfoHeader = notificationLoading ? (
    <Spinner />
  ) : (
    <ProfileHeader user={user} token={token} />
  );

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Profile</h1>
        </center>
        <br />
        {messageInfoHeader}
        <b>Name:</b> {user.name}
        <br />
        <b>Email: </b> {user.email}
        <br />
        <b>Role: </b> {user.role}
      </Jumbotron>
    </Container>
  );
};

export default Profile;
