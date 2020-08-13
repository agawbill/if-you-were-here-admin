import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import MessageSnapshot from "../../components/MessageSnapshot/MessageSnapshot";
import PersonSnapshot from "../../components/PersonSnapshot/PersonSnapshot";
import ResourceSnapshot from "../../components/ResourceSnapshot/ResourceSnapshot";

const Dashboard = (props) => {
  const snapshots = [
    <MessageSnapshot />,
    <PersonSnapshot />,
    <ResourceSnapshot />,
  ].map((snapshot, index) => (
    <Col lg={4} key={index}>
      {snapshot}
    </Col>
  ));

  return (
    <Container>
      <center>
        <h1>Dashboard</h1>
      </center>
      <br />
      <Row>{snapshots}</Row>
    </Container>
  );
};

export default Dashboard;
