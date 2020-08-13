import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addResource,
  getResources,
  addResourceReset,
  deleteResourceReset,
} from "../../store/actions";
import styles from "./ResourcePage.module.css";
import Resources from "../../components/Resources/Resources";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ResourceForm from "../../components/ResourceForm/ResourceForm";

const ResourcePage = (props) => {
  const [validations, setValidations] = useState(null);
  const resourceSuccess = useSelector(
    (state) => state.resource.resourceSuccess
  );
  const deleteSuccess = useSelector(
    (state) => state.resource.deleteResourceSuccess
  );
  const error = useSelector((state) => state.resource.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => [
      dispatch(addResourceReset()),
      dispatch(deleteResourceReset()),
    ];
  }, [dispatch]);

  const submitHandler = async (validateForm, payload) => {
    const validated = validateForm();
    if (validated) {
      await dispatch(addResource(payload));
      await dispatch(getResources());
    }
  };

  const resetValidations = () => {
    if (validations) setValidations(null);
  };

  return (
    <Container>
      <Jumbotron>
        <center>
          <h1>Add Resource</h1>
          <br />
          <Col lg="5">
            <ResourceForm
              resource=""
              type="add"
              setValidations={setValidations}
              submitHandler={submitHandler}
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
              {resourceSuccess && !validations
                ? "SUCCESS! Resource added."
                : null}
              {deleteSuccess && !validations
                ? "SUCCESS! Resource removed."
                : null}
            </span>
          </Col>
        </center>
      </Jumbotron>
      <center>
        <h2>Resources</h2>
      </center>
      <br />
      <div style={{ marginBottom: "15px" }}>
        <Resources resetValidations={resetValidations} />
      </div>
    </Container>
  );
};

export default ResourcePage;
