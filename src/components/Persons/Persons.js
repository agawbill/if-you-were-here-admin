import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Persons.module.css";
import { withRouter } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/UI/Modal/Modal";
import {
  getPersons,
  deletePerson,
  editPersonOrder,
  editPersonReset,
} from "../../store/actions";
import Spinner from "../UI/Spinner/Spinner";

const Persons = (props) => {
  const [show, setShow] = useState(false);
  const [personId, setPersonId] = useState(null);
  const persons = useSelector((state) => state.persons.persons).sort(
    (a, b) => a.position - b.position
  );
  const positionLoading = useSelector((state) => state.person.positionLoading);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersons());
  }, [dispatch]);

  const editHandler = (person) => {
    props.history.push({
      pathname: `persons/${person._id}`,
      passedPerson: person,
    });
  };

  const selectHandler = (id) => {
    setPersonId(id);
    dispatch(editPersonReset());
    setShow(true);
  };

  const deleteHandler = async (id) => {
    await dispatch(deletePerson(id, token));
    await dispatch(getPersons());
    setShow(false);
  };

  const findPersonByPosition = async (position) => {
    try {
      const response = await fetch(`/api/persons/position/${position}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (err) {
      throw new Error(err);
    }
  };

  const positionHandler = async (direction, position) => {
    //find by position ... then update both ids. swap positions. if it's the last, swap with first in list.
    if (direction === "up") {
      const firstPerson = await findPersonByPosition(position);
      const secondPerson =
        position === 1
          ? await findPersonByPosition(persons.length)
          : await findPersonByPosition(position - 1);

      await dispatch(
        editPersonOrder({
          id: firstPerson.data._id,
          position: secondPerson.data.position,
          modifiedBy: user.id,
          token,
        })
      );

      await dispatch(
        editPersonOrder({
          id: secondPerson.data._id,
          position: firstPerson.data.position,
          modifiedBy: user.id,
          token,
        })
      );

      await dispatch(getPersons());
    } else {
      const firstPerson = await findPersonByPosition(position);
      const secondPerson =
        position === persons.length
          ? await findPersonByPosition(1)
          : await findPersonByPosition(position + 1);

      await dispatch(
        editPersonOrder({
          id: firstPerson.data._id,
          position: secondPerson.data.position,
          modifiedBy: user.id,
          token,
        })
      );

      await dispatch(
        editPersonOrder({
          id: secondPerson.data._id,
          position: firstPerson.data.position,
          modifiedBy: user.id,
          token,
        })
      );

      await dispatch(getPersons());
    }
  };

  const resetHandler = () => {
    setShow(false);
  };

  let modalBody = <>Are you sure you want to delete this item?</>;

  let loading = positionLoading ? <Spinner /> : null;

  let personsBody = null;

  if (persons.length > 0) {
    personsBody = persons.map((person, index) => {
      const deleteButton =
        user.role === "SUPER_ADMIN" ? (
          <Button onClick={() => selectHandler(person._id)} variant="danger">
            Delete
          </Button>
        ) : null;
      return (
        <Container key={index}>
          <Row style={{ justifyContent: "center" }}>
            <Col sm="5">
              <ListGroup.Item className={styles.ListContainer}>
                <div className={styles.Name}>{person.name}</div>
                <div className={styles.ButtonsContainer}>
                  <div className={styles.Icons}>
                    <Button
                      variant="secondary"
                      onClick={() => editHandler(person)}
                      className={styles.Icon}
                    >
                      Edit
                    </Button>{" "}
                    {deleteButton}
                  </div>
                  <div className={styles.PositionButtons}>
                    <FontAwesomeIcon
                      icon={faSortUp}
                      onClick={() => positionHandler("up", person.position)}
                      style={{ cursor: "pointer" }}
                    />
                    <FontAwesomeIcon
                      icon={faSortDown}
                      onClick={() => positionHandler("down", person.position)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </ListGroup.Item>
              <br />
            </Col>
          </Row>
        </Container>
      );
    });
  } else {
    personsBody = "No persons yet";
  }

  return (
    <>
      <Modal
        show={show}
        itemId={personId}
        cancelHandler={resetHandler}
        acceptHandler={deleteHandler}
        title="Delete"
      >
        {modalBody}
      </Modal>
      {loading}
      <ListGroup>{personsBody}</ListGroup>
    </>
  );
};

export default withRouter(Persons);
