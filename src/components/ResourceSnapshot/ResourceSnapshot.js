import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import styles from "./ResourceSnapshot.module.css";

const ResourceSnapshot = (props) => {
  const resources = useSelector((state) => state.resources.resources);

  const newResources = resources
    .filter((person) => {
      const today = new Date().getTime();
      const dateUpdated = new Date(person.updatedAt);
      return dateUpdated.getTime() > today - 1209600000;
    })
    .map((resource, index, arr) => {
      const mappedResource =
        index === arr.length - 1 ? (
          <span key={index}>{resource.title}</span>
        ) : (
          <span key={index}>{resource.title}, </span>
        );
      return mappedResource;
    });

  const clickHandler = () => {
    props.history.push("/admin/resources");
  };

  return (
    <Card style={{ marginBottom: "15px" }}>
      <Card.Header>
        <b>Resources</b>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Count:</b> {resources.length}
          <br /> <b>New:</b>{" "}
          {newResources.length === 0
            ? "No resource has been modified or added in the last 14 days."
            : newResources}
        </Card.Text>
        <Card.Link className={styles.link} onClick={clickHandler}>
          Go to Resources
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default withRouter(ResourceSnapshot);
