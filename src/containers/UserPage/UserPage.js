import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserPage.module.css";
import Users from "../../components/Users/Users";
import FilterSortOptions from "../../components/UserFilterSortOptions/FilterSortOptions";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import {
  getUsers,
  deleteUserReset,
  addUser,
  getUserReset,
} from "../../store/actions";
import UserForm from "../../components/UserForm/UserForm";

const UserPage = () => {
  const [userType, setUserType] = useState("pending");
  const [validations, setValidations] = useState(null);
  const userSuccess = useSelector((state) => state.user.userSuccess);
  const deleteSuccess = useSelector((state) => state.user.deleteUserSuccess);
  const error = useSelector((state) => state.user.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(deleteUserReset());
      dispatch(getUserReset());
    };
  }, [dispatch]);

  useEffect(() => {
    setValidations(null);
  }, [userSuccess, deleteSuccess]);

  const userTypeHandler = (type) => {
    setUserType(type);
  };

  const submitHandler = async (validateForm, payload) => {
    const validated = validateForm();
    if (validated) {
      await dispatch(addUser(payload));
      await dispatch(getUsers());
    }
  };

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Add Admin</h1>
          <br />
          <Col lg="5">
            <UserForm
              setValidations={setValidations}
              submitHandler={submitHandler}
              type="add"
            />
          </Col>
        </center>
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
            {userSuccess && !validations ? "SUCCESS! User added." : null}
            {deleteSuccess && !validations ? "SUCCESS! User removed." : null}
          </span>
        </center>
      </Jumbotron>
      <center>
        <h2>Admins</h2>
      </center>
      <br />
      <div style={{ marginBottom: "15px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={userType}
          onSelect={(k) => userTypeHandler(k)}
        >
          <Tab eventKey="pending" title="Pending">
            <div className={styles.SortBox}>
              <center>
                <FilterSortOptions type={userType} />
              </center>
            </div>
            <Users type={userType} />
          </Tab>
          <Tab eventKey="registered" title="Registered">
            <div className={styles.SortBox}>
              <center>
                <FilterSortOptions type={userType} />
              </center>
            </div>
            <Users type={userType} />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default UserPage;
