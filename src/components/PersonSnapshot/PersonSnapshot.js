import React from "react";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";
import styles from "./PersonSnapshot.module.css";

const PersonSnapshot = (props) => {
  const persons = useSelector((state) => state.persons.persons);

  const clickHandler = () => {
    props.history.push("/admin/persons");
  };

  const newPersons = persons
    .filter((person) => {
      const today = new Date().getTime();
      const dateUpdated = new Date(person.updatedAt);
      return dateUpdated.getTime() > today - 1209600000;
    })
    .map((person, index, arr) => {
      const mappedPerson =
        index === arr.length - 1 ? (
          <span key={index}>{person.name}</span>
        ) : (
          <span key={index}>{person.name}, </span>
        );
      return mappedPerson;
    });

  return (
    <Card style={{ marginBottom: "15px" }}>
      <Card.Header>
        <b>Persons</b>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Count:</b> {persons.length}
          <br /> <b>New:</b>{" "}
          {newPersons.length === 0
            ? "No person has been modified or added in the last 14 days."
            : newPersons}
        </Card.Text>
        <Card.Link className={styles.link} onClick={clickHandler}>
          Go to Persons
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default withRouter(PersonSnapshot);
