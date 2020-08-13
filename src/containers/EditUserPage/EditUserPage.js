import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { getUser, editUser, editUserReset } from "../../store/actions";
import styles from "./EditUserPage.module.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import UserForm from "../../components/UserForm/UserForm";
import UserInfoHeader from "../../components/UserInfoHeader/UserInfoHeader";
import Spinner from "../../components/UI/Spinner/Spinner";

const EditUserPage = (props) => {
  const [user, setUser] = useState(null);
  const [validations, setValidations] = useState(null);
  const [passedUser, setPassedUser] = useState(props.location.passedUser);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userSuccess = useSelector((state) => state.user.editUserSuccess);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    return () => dispatch(editUserReset());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser && !passedUser && id) {
      dispatch(getUser(id));
    } else if (!error) {
      const populatedUser = currentUser ? currentUser : passedUser;
      setUser(populatedUser);
    }
  }, [dispatch, id, error, currentUser, passedUser]);

  useEffect(() => {
    if (passedUser && currentUser) {
      setPassedUser(null);
    }
  }, [passedUser, currentUser]);

  const submitHandler = (validateForm, payload) => {
    const validated = validateForm();
    if (validated) {
      dispatch(editUser(payload));
    }
  };

  let userBody = <Spinner />;

  if (user && !loading) {
    userBody = (
      <>
        <UserInfoHeader user={user} />
        <UserForm
          currentUser={user}
          id={id}
          setValidations={setValidations}
          submitHandler={submitHandler}
          type="edit"
        />
        <br />
        <span className={styles.validations}>
          {validations ? (
            <>
              {validations.join(", ")} <br />
            </>
          ) : null}
          {error}
        </span>
        <span className={styles.success}>
          {userSuccess && !validations ? "SUCCESS! User updated." : null}
        </span>
      </>
    );
  }

  if (!currentUser && !passedUser && error) {
    userBody = <span className={styles.validations}>ERROR: {error}</span>;
  }

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Edit Admin</h1>
          <br />
          <Col lg="5">{userBody}</Col>
        </center>
      </Jumbotron>
    </Container>
  );
};

export default withRouter(EditUserPage);
