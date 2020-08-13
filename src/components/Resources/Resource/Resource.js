import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResource,
  editResource,
  editResourceReset,
} from "../../../store/actions";
import styles from "./Resource.module.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Spinner from "../../UI/Spinner/Spinner";
import ResourceInfoHeader from "../../ResourceInfoHeader/ResourceInfoHeader";
import ResourceForm from "../../ResourceForm/ResourceForm";

const Resource = (props) => {
  const [resource, setResource] = useState(null);
  const [passedResource, setPassedResource] = useState(
    props.location.passedResource
  );
  const [validations, setValidations] = useState(null);
  const currentResource = useSelector(
    (state) => state.resource.currentResource
  );
  const resourceSuccess = useSelector(
    (state) => state.resource.editResourceSuccess
  );
  const error = useSelector((state) => state.resource.error);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    return () => dispatch(editResourceReset());
  }, [dispatch]);

  useEffect(() => {
    if (!currentResource && !passedResource && id) {
      dispatch(getResource(id));
    } else {
      const resource = currentResource ? currentResource : passedResource;
      setResource(resource);
    }
  }, [dispatch, id, passedResource, currentResource]);

  useEffect(() => {
    if (passedResource && currentResource) {
      setPassedResource(null);
    }
  }, [currentResource, passedResource, dispatch]);

  const submitHandler = (validateForm, payload) => {
    const validated = validateForm();
    if (validated) {
      dispatch(editResource(payload));
    }
  };

  let resourceBody = <Spinner />;

  if (resource) {
    resourceBody = (
      <>
        <ResourceInfoHeader resource={resource} />
        <ResourceForm
          resource={resource}
          id={id}
          setValidations={setValidations}
          submitHandler={submitHandler}
          type="edit"
        />
        <br />
        <span className={styles.validations}>
          {validations ? (
            <>
              {validations.join(", ")} <br />{" "}
            </>
          ) : null}
          {error}
        </span>
        <span className={styles.success}>
          {resourceSuccess && !validations
            ? "SUCCESS! Resource updated."
            : null}
        </span>
      </>
    );
  }

  if (!currentResource && !passedResource && error) {
    resourceBody = <span className={styles.validations}>ERROR: {error}</span>;
  }

  return (
    <Container className={styles.ResourcePage}>
      <Jumbotron>
        <Col lg="5" style={{ margin: "0 auto" }}>
          <center>
            <h1>Resource</h1>
            <br />
            {resourceBody}
          </center>
        </Col>
      </Jumbotron>
    </Container>
  );
};

export default withRouter(Resource);
