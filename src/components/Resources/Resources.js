import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Resources.module.css";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "../../components/UI/Modal/Modal";
import {
  getResources,
  deleteResource,
  addResourceReset,
} from "../../store/actions";

const Resources = (props) => {
  const [show, setShow] = useState(false);
  const [resourceId, setResourceId] = useState(null);
  const resources = useSelector((state) => state.resources.resources);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { resetValidations } = props;

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  const editHandler = (resource) => {
    props.history.push({
      pathname: `resources/${resource._id}`,
      passedResource: resource,
    });
  };

  const selectHandler = (id) => {
    dispatch(addResourceReset());
    setResourceId(id);
    setShow(true);
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteResource(id, token));
    await dispatch(getResources());
    resetValidations();
    setShow(false);
  };

  const resetHandler = () => {
    setShow(false);
  };

  let modalBody = <>Are you sure you want to delete this item?</>;

  let resourcesBody = null;

  if (resources.length > 0) {
    resourcesBody = resources.map((resource, index) => {
      return (
        <span key={index}>
          <ListGroup.Item className={styles.Resource}>
            <div className={styles.ResourceButtons}>
              <Button variant="secondary" onClick={() => editHandler(resource)}>
                Edit
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => selectHandler(resource._id)}
              >
                Delete
              </Button>
            </div>
            <a href={resource.url} className={styles.ResourceLink}>
              {resource.title}
            </a>
            : {resource.description}
          </ListGroup.Item>
        </span>
      );
    });
  } else {
    resourcesBody = "No resources yet.";
  }

  return (
    <>
      <Modal
        show={show}
        itemId={resourceId}
        cancelHandler={resetHandler}
        acceptHandler={deleteHandler}
        title="Delete"
      >
        {modalBody}
      </Modal>
      <ListGroup>{resourcesBody}</ListGroup>
    </>
  );
};

export default withRouter(Resources);
