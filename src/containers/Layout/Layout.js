import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./Layout.module.css";
import NavBar from "../../components/UI/NavBar/NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      <Container fluid className={styles.Layout}>
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
