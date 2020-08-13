import React, { useReducer, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MessageForm.module.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormSpinner from "../UI/FormSpinner/FormSpinner";
import { editMessage } from "../../store/actions";

const initialState = {
  who: { name: "", id: "" },
  identity: { name: "", id: "" },
  message: "",
};

const formReducer = (formState, action) => {
  switch (action.type) {
    case "who":
      return {
        ...formState,
        who: {
          ...formState.who,
          ...action.value,
        },
      };
    case "identity":
      return {
        ...formState,
        identity: {
          ...formState.identity,
          ...action.value,
        },
      };
    case "message":
      return {
        ...formState,
        message: action.value,
      };
    case "reset":
      return {
        ...initialState,
      };

    default:
      break;
  }
};

const MessageForm = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const persons = useSelector((state) => state.persons.persons).sort(
    (a, b) => a.position - b.position
  );
  const editLoading = useSelector((state) => state.message.editLoading);

  const dispatch = useDispatch();

  const { setValidations, message, token, id, user } = props;

  useEffect(() => {
    if (message) {
      dispatchForm({
        type: "message",
        value: message.message,
      });
      dispatchForm({
        type: "who",
        value: { name: message.who.name, id: message.who._id },
      });
      dispatchForm({
        type: "identity",
        value: { name: message.identity.name, id: message.identity._id },
      });
    }
    return () => dispatchForm({ type: "reset" });
  }, [id, message]);

  const onChangeEditor = (event, editor) => {
    const data = editor.getData();
    dispatchForm({
      type: "message",
      value: data,
    });
  };

  const onChangePersonHandler = (type, value) => {
    const [name, id] = value.split(",");
    dispatchForm({
      type,
      value: { name, id },
    });
  };

  const validateForm = () => {
    let failures = [];

    if (!formState.message || !formState.who.id || !formState.identity.id) {
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

  const submitHandler = async () => {
    const validated = validateForm();
    if (validated) {
      await dispatch(
        editMessage({
          message: formState.message,
          who: formState.who.id,
          identity: formState.identity.id,
          token,
          id,
          flagged: message.flagged,
          approved: message.approved,
          approvedBy: message.approvedBy,
          modifiedBy: user.id,
        })
      );
    }
  };

  const whoDropdown = (
    <select
      onChange={(event) => onChangePersonHandler("who", event.target.value)}
    >
      {persons.map((person, index) => (
        <option
          key={index}
          selected={formState.who.id === person._id ? "selected" : null}
          value={`${person.name},${person._id}`}
        >
          {person.name}
        </option>
      ))}
    </select>
  );

  const identityDropdown = (
    <select
      onChange={(event) =>
        onChangePersonHandler("identity", event.target.value)
      }
    >
      {persons.map((person, index) => (
        <option
          selected={formState.identity.id === person._id ? "selected" : null}
          key={index}
          value={`${person.name},${person._id}`}
        >
          {person.name}
        </option>
      ))}
    </select>
  );

  const buttonText = editLoading ? <FormSpinner /> : "Submit";

  return (
    <>
      <Form>
        <Col sm="13">
          <b>Who:</b> {whoDropdown}
          <br />
          <br />
        </Col>
        <Col sm="13">
          <b>Message:</b>
          <div className={styles.MessageWrapper}>
            <CKEditor
              editor={BalloonEditor}
              data={formState.message}
              config={{
                toolbar: ["bold", "italic", "|", "undo", "redo"],
              }}
              onChange={onChangeEditor}
            />
          </div>
          <br />
        </Col>
        <Col sm="13">
          <b>Identity:</b> {identityDropdown}
          <br />
        </Col>
      </Form>
      <center>
        <br />
        <Button
          variant="primary"
          disabled={editLoading ? true : false}
          onClick={() => submitHandler()}
        >
          {buttonText}
        </Button>
      </center>
    </>
  );
};

export default MessageForm;
