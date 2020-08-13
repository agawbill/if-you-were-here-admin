import React from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = (props) => {
  const loginHandler = () => {
    window.location = "/api/auth/google";
  };
  return (
    <Container>
      <Jumbotron style={{ marginTop: "100px" }}>
        <h1>IYWH Admin Panel</h1>
        <p>
          If you're an admin or super admin for "If You Were Here...", login
          using your registered gmail below. You must reach out to a super admin
          to have your email greenlit before logging in/registering.
        </p>
        <p>
          <br />
          <Button variant="danger" onClick={loginHandler}>
            <FontAwesomeIcon icon={faGoogle} size={"lg"} /> {"  "}
            Login/Register
          </Button>
        </p>
      </Jumbotron>
    </Container>
  );
};

export default withRouter(Login);
