import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPerson, getPersons, addPersonReset } from "../../store/actions";
import styles from "./PersonPage.module.css";
import Persons from "../../components/Persons/Persons";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PersonForm from "../../components/PersonForm/PersonForm";

const PersonPage = (props) => {
  const [validations, setValidations] = useState(null);
  const personSuccess = useSelector((state) => state.person.personSuccess);
  const error = useSelector((state) => state.person.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(addPersonReset());
  }, [dispatch]);

  const submitHandler = async (validateForm, payload) => {
    const validated = validateForm();
    if (validated) {
      await dispatch(addPerson(payload));
      await dispatch(getPersons());
    }
  };

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Add Person</h1>
          <br />
          <Col lg="5">
            <PersonForm
              setValidations={setValidations}
              submitHandler={submitHandler}
              type="add"
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
              {personSuccess && !validations
                ? "SUCCESS! Person updated."
                : null}
            </span>
          </Col>
        </center>
      </Jumbotron>
      <center>
        <h2>Persons</h2>
      </center>
      <br />
      <Persons />
    </Container>
  );
};

export default PersonPage;
