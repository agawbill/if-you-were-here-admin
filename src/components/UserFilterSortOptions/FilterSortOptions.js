import React, { useState } from "react";
import SortOption from "./SortOption/SortOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const FilterSortOptions = (props) => {
  const [pendingSortSelected, setPendingSortSelected] = useState(null);
  const [registeredSortSelected, setRegisteredSortSelected] = useState(null);

  const sortHandler = (filter, type) => {
    if (type === "pending") {
      if (pendingSortSelected === filter) {
        setPendingSortSelected(null);
      } else {
        setPendingSortSelected(filter);
      }
    } else {
      if (registeredSortSelected === filter) {
        setRegisteredSortSelected(null);
      } else {
        setRegisteredSortSelected(filter);
      }
    }
  };

  const pendingSortOptions = [
    "Email A-Z",
    "Email Z-A",
    "Last Name A-Z",
    "Last Name Z-A",
  ].map((type, index, array) => {
    const sortOption =
      index === array.length - 1 ? (
        <SortOption
          key={index}
          sortHandler={sortHandler}
          sortSelected={pendingSortSelected}
          filter={type}
          name={"pending"}
        />
      ) : (
        <span key={index}>
          <SortOption
            sortHandler={sortHandler}
            sortSelected={pendingSortSelected}
            filter={type}
            name={"pending"}
          />{" "}
          -{" "}
        </span>
      );
    return sortOption;
  });

  const registeredSortOptions = [
    "Email A-Z",
    "Email Z-A",
    "Last Name A-Z",
    "Last Name Z-A",
  ].map((type, index, array) => {
    const sortOption =
      index === array.length - 1 ? (
        <SortOption
          key={index}
          sortHandler={sortHandler}
          sortSelected={registeredSortSelected}
          filter={type}
          name={"registered"}
        />
      ) : (
        <span key={index}>
          <SortOption
            sortHandler={sortHandler}
            sortSelected={registeredSortSelected}
            filter={type}
            name={"registered"}
          />{" "}
          -{" "}
        </span>
      );
    return sortOption;
  });

  let optionsBody = null;

  if (props.type === "pending") {
    optionsBody = (
      <>
        <FontAwesomeIcon icon={faClock} size="1x" style={{ color: "gray" }} />{" "}
        <b>Order By:</b> {pendingSortOptions}
      </>
    );
  } else {
    optionsBody = (
      <>
        <FontAwesomeIcon icon={faClock} size="1x" style={{ color: "gray" }} />{" "}
        <b>Order By:</b> {registeredSortOptions}
      </>
    );
  }

  return (
    <Row>
      <Col lg={12}>{optionsBody}</Col>
    </Row>
  );
};

export default FilterSortOptions;
