import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ResourceForm.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormSpinner from "../UI/FormSpinner/FormSpinner";

const initialState = {
  url: "",
  title: "",
  description: "",
};

const formReducer = (formState, action) => {
  switch (action.type) {
    case "url":
      return {
        ...formState,
        url: action.value,
      };
    case "title":
      return {
        ...formState,
        title: action.value,
      };
    case "description":
      return {
        ...formState,
        description: action.value,
      };
    case "reset":
      return { ...initialState };
    default:
      break;
  }
};

const ResourceForm = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.resource.loading);
  const dispatch = useDispatch();

  const { resource, submitHandler, id, type, setValidations } = props;

  useEffect(() => {
    if (resource) {
      dispatchForm({ type: "url", value: resource.url });
      dispatchForm({ type: "title", value: resource.title });
      dispatchForm({ type: "description", value: resource.description });
    }
    return () => {
      dispatchForm({ type: "reset" });
    };
  }, [dispatch, resource]);

  const validateForm = () => {
    let failures = [];

    const regex = new RegExp(
      "(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (
      formState.url.length === 0 ||
      formState.title.length === 0 ||
      formState.description.length === 0
    ) {
      failures = [...failures, "Make sure no fields are blank"];
    }

    if (!formState.url.match(regex)) {
      failures = [...failures, "Make sure to enter a valid URL"];
    }

    if (failures.length > 0) {
      setValidations(failures);
      return false;
    } else {
      setValidations(null);
      return true;
    }
  };

  const editHandler = (type, value) => {
    if (type === "url") {
      dispatchForm({ type: "url", value });
    } else if (type === "title") {
      dispatchForm({ type: "title", value });
    } else if (type === "description") {
      dispatchForm({ type: "description", value });
    }
  };

  const submitForm = async () => {
    const payload =
      type === "edit"
        ? { ...formState, modifiedBy: user.id, id, token }
        : { ...formState, createdBy: user.id, token };
    await submitHandler(validateForm, payload);
    const validated = validateForm();
    if (type === "add" && validated) {
      await dispatchForm({ type: "reset" });
    }
  };

  let buttonText = loading ? <FormSpinner /> : "Submit";

  return (
    <>
      <Form>
        <div className={styles.Option}>
          <b>URL:</b>
        </div>
        <Form.Control
          type="text"
          placeholder="URL"
          value={formState.url || ""}
          onChange={(event) => editHandler("url", event.target.value)}
        />
        <br />
        <div className={styles.Option}>
          <b>Title:</b>
        </div>
        <Form.Control
          type="text"
          placeholder="Title"
          value={formState.title || ""}
          onChange={(event) => editHandler("title", event.target.value)}
        />
        <br />
        <div className={styles.Option}>
          <b>Description:</b>
        </div>
        <Form.Control
          type="text"
          placeholder="Description"
          value={formState.description || ""}
          onChange={(event) => editHandler("description", event.target.value)}
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

export default ResourceForm;
