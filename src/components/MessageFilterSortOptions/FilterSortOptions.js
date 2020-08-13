import React, { useState } from "react";
import SortOption from "./SortOption/SortOption";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const FilterSortOptions = (props) => {
  const [pendingSortSelected, setPendingSortSelected] = useState(null);
  const [approvedSortSelected, setApprovedSortSelected] = useState(null);

  const sortHandler = (filter, type) => {
    if (type === "pending") {
      if (pendingSortSelected === filter) {
        setPendingSortSelected(null);
      } else {
        setPendingSortSelected(filter);
      }
    } else {
      if (approvedSortSelected === filter) {
        setApprovedSortSelected(null);
      } else {
        setApprovedSortSelected(filter);
      }
    }
  };

  const pendingSortOptions = ["Newest", "Oldest", "Flagged"].map(
    (type, index, array) => {
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
              key={index}
              sortHandler={sortHandler}
              sortSelected={pendingSortSelected}
              filter={type}
              name={"pending"}
            />{" "}
            -{" "}
          </span>
        );
      return sortOption;
    }
  );

  const approvedSortOptions = ["Newest", "Oldest"].map((type, index, array) => {
    const sortOption =
      index === array.length - 1 ? (
        <SortOption
          key={index}
          sortHandler={sortHandler}
          sortSelected={approvedSortSelected}
          filter={type}
          name={"approved"}
        />
      ) : (
        <span key={index}>
          <SortOption
            sortHandler={sortHandler}
            sortSelected={approvedSortSelected}
            filter={type}
            name={"approved"}
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
        <b>Order By:</b> {approvedSortOptions}
      </>
    );
  }

  return (
    <Row>
      <Col lg={4}>
        <Container>{optionsBody}</Container>
      </Col>
    </Row>
  );
};

export default FilterSortOptions;
