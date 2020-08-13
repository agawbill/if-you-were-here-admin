import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styles from "./UserForm.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormSpinner from "../../components/UI/FormSpinner/FormSpinner";

const UserForm = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.user.editLoading);

  const { currentUser, id, type, submitHandler, setValidations } = props;

  const dispatch = useDispatch();

  const options = useMemo(
    () => [
      { value: "ADMIN", label: "Admin" },
      { value: "SUPER_ADMIN", label: "Super Admin" },
    ],
    []
  );

  useEffect(() => {
    if (currentUser) {
      setUserEmail(currentUser.email);
      const optionIndex = options.findIndex(
        (option) => option.value === currentUser.role
      );
      setUserRole(options[optionIndex]);
    }
  }, [dispatch, options, currentUser]);

  const validateForm = () => {
    let failures = [];

    if (userEmail === null || userEmail.length < 1 || userRole.length < 1) {
      failures = [...failures, "Make sure no fields are blank"];
    }

    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "i"
    );

    if (!userEmail.match(regex)) {
      failures = [...failures, "Make sure to enter a valid Email"];
    }

    if (failures.length > 0) {
      setValidations(failures);
      return false;
    } else {
      setValidations(null);
      return true;
    }
  };

  const nameHandler = (name, type) => {
    if (type === "first") {
      setFirstName(name);
    } else {
      setLastName(name);
    }
  };

  const emailHandler = (name) => {
    setUserEmail(name);
  };

  const roleHandler = (role) => {
    setUserRole(role);
  };

  const submitForm = async () => {
    const payload =
      type === "edit"
        ? {
            email: userEmail,
            modifiedBy: user.id,
            role: userRole.value,
            token,
            id,
          }
        : {
            firstName,
            lastName,
            email: userEmail,
            role: userRole.value,
            createdBy: user.id,
            token,
          };
    const validated = validateForm();
    await submitHandler(validateForm, payload);
    if (validated && type === "add") {
      setUserEmail("");
      setUserRole("");
      setFirstName("");
      setLastName("");
    }
  };

  let buttonText = loading ? (
    <>
      <FormSpinner /> Submitting...
    </>
  ) : (
    "Submit"
  );

  let nameOption = null;

  if (type === "add") {
    nameOption = (
      <>
        <div className={styles.Option}>
          <b>First Name: </b>
        </div>
        <Form.Control
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => nameHandler(event.target.value, "first")}
          style={{}}
        />
        <br />
        <div className={styles.Option}>
          <b>Last Name: </b>
        </div>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => nameHandler(event.target.value, "last")}
          style={{}}
        />
        <br />
      </>
    );
  } else {
    nameOption = (
      <div className={styles.Option}>
        <b>Name:</b> {currentUser.firstName} {currentUser.lastName}
        <br />
        <br />
      </div>
    );
  }

  return (
    <>
      <Form>
        {nameOption}
        <div className={styles.Option}>
          <b>Email: </b>
        </div>
        <Form.Control
          type="text"
          placeholder="Email"
          value={userEmail}
          disabled={currentUser ? currentUser.providerId : false}
          onChange={(event) => emailHandler(event.target.value)}
        />
        <br />
        <div className={styles.Option}>
          <b>Role: </b>
        </div>
        <Select
          defaultValue={userRole}
          value={userRole}
          options={options}
          onChange={(event) => roleHandler(event)}
        />
      </Form>
      <br />
      <center>
        <Button variant="primary" onClick={() => submitForm()}>
          {buttonText}
        </Button>
      </center>
    </>
  );
};

export default UserForm;
