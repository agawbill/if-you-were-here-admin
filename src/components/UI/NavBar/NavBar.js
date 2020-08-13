import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/actions";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/admin">
        IYWH Admin
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin/messages">
            Messages
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/persons">
            Persons
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/resources">
            Resources
          </Nav.Link>
          {currentUser.role === "SUPER_ADMIN" ? (
            <Nav.Link as={Link} to="/admin/users">
              Admins
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Dropdown>
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            style={{ backgroundColor: "rgba(52, 52, 52, 0.8)" }}
          >
            <Navbar.Text>User:</Navbar.Text> {currentUser.email}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/admin/profile">
              Profile
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} onClick={() => dispatch(logout())}>
              Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
