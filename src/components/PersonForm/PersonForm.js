import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PersonForm.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormSpinner from "../../components/UI/FormSpinner/FormSpinner";

const PersonForm = (props) => {
  const [personName, setPersonName] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.person.loading);

  const { currentPerson, id, type, submitHandler, setValidations } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentPerson) {
      setPersonName(currentPerson.name);
    }
  }, [dispatch, currentPerson]);

  const validateForm = () => {
    let failures = [];

    if (personName === null || personName.length < 1) {
      failures = [...failures, "Make sure no fields are blank"];
    }

    if (failures.length > 0) {
      setValidations(failures);
      return false;
    } else {
      setValidations(null);
      return true;
    }
  };

  const editHandler = (name) => {
    setPersonName(name);
  };

  const submitForm = async () => {
    const payload =
      type === "edit"
        ? {
            name: personName,
            modifiedBy: user.id,
            position: currentPerson.position,
            token,
            id,
          }
        : { name: personName, createdBy: user.id, token };
    const validated = validateForm();
    await submitHandler(validateForm, payload);
    if (validated && type === "add") {
      setPersonName("");
    }
  };

  let buttonText = loading ? (
    <>
      <FormSpinner /> Submitting...
    </>
  ) : (
    "Submit"
  );

  return (
    <>
      <Form>
        <div className={styles.Option}>
          <b>Name:</b>
        </div>
        <Form.Control
          type="text"
          placeholder="PERSON NAME"
          value={personName || ""}
          onChange={(event) => editHandler(event.target.value)}
        />
      </Form>
      <br />
      <center>
        <Button
          variant="primary"
          disabled={loading ? true : false}
          onClick={() => submitForm()}
        >
          {buttonText}
        </Button>
      </center>
    </>
  );
};

export default PersonForm;
