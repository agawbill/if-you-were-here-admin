import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormSpinner from "../FormSpinner/FormSpinner";
import { useSelector } from "react-redux";

const ModalContainer = (props) => {
  const personSuccess = useSelector((state) => state.person.personSuccess);
  const messageSuccess = useSelector((state) => state.message.messageSuccess);
  const resourceSuccess = useSelector(
    (state) => state.resource.deleteResourceSuccess
  );
  const deletePersonLoading = useSelector(
    (state) => state.person.deleteLoading
  );
  const deleteResourceLoading = useSelector(
    (state) => state.resource.deleteLoading
  );
  const deleteMessageLoading = useSelector(
    (state) => state.message.deleteLoading
  );
  const deleteMessageError = useSelector((state) => state.message.error);

  const deletePersonError = useSelector((state) => state.person.error);
  const deleteResourceError = useSelector((state) => state.resource.error);

  let buttonText = "Understood";

  let colorStatus = "primary";

  if (deletePersonLoading || deleteResourceLoading || deleteMessageLoading) {
    buttonText = <FormSpinner />;
  } else if (personSuccess || resourceSuccess || messageSuccess) {
    colorStatus = "success";
    buttonText = "Deleted";
  } else if (deletePersonError || deleteResourceError || deleteMessageError) {
    colorStatus = "danger";
    buttonText = "Failed";
  }

  return (
    <Modal
      show={props.show}
      onHide={props.cancelHandler}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.cancelHandler()}>
          Close
        </Button>
        <Button
          variant={colorStatus}
          onClick={() => props.acceptHandler(props.itemId, props.type)}
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalContainer;
