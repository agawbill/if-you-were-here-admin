import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPerson, editPersonReset, editPerson } from "../../../store/actions";
import styles from "./Person.module.css";
import PersonInfoHeader from "../../PersonInfoHeader/PersonInfoHeader";
import PersonForm from "../../../components/PersonForm/PersonForm";
import Jumbotron from "react-bootstrap/Jumbotron";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "../../UI/Spinner/Spinner";

const Person = (props) => {
  const [person, setPerson] = useState(null);
  const [passedPerson, setPassedPerson] = useState(props.location.passedPerson);
  const [validations, setValidations] = useState(null);
  const currentPerson = useSelector((state) => state.person.currentPerson);
  const personSuccess = useSelector((state) => state.person.editPersonSuccess);
  const error = useSelector((state) => state.person.error);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!currentPerson && !passedPerson && id) {
      dispatch(getPerson(id));
    } else {
      const populatedPerson = currentPerson ? currentPerson : passedPerson;
      setPerson(populatedPerson);
    }
  }, [dispatch, id, currentPerson, passedPerson]);

  useEffect(() => {
    return () => dispatch(editPersonReset());
  }, [dispatch]);

  useEffect(() => {
    if (currentPerson && passedPerson) {
      setPassedPerson(null);
    }
  }, [currentPerson, passedPerson]);

  const submitHandler = async (validateForm, payload) => {
    const validated = validateForm();
    if (validated) {
      await dispatch(editPerson(payload));
    }
  };

  let personBody = <Spinner />;

  if (person) {
    personBody = (
      <>
        <Col lg="5">
          <PersonInfoHeader person={person} />
          <PersonForm
            currentPerson={person}
            setValidations={setValidations}
            submitHandler={submitHandler}
            id={id}
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
            {personSuccess && !validations ? "SUCCESS! Person updated." : null}
          </span>
        </Col>
      </>
    );
  }

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Person</h1>
          <br />
          {personBody}
        </center>
      </Jumbotron>
    </Container>
  );
};

export default withRouter(Person);
