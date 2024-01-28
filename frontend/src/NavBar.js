import React from "react";
import { useUser } from "./UserSession";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

export default function NavBar() {
  const user = useUser();

  const authNav = (
    <>
      <Nav.Link as={Link} to="/logout">
        Logout
      </Nav.Link>
    </>
  );

  const anonNav = (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        Sign up
      </Nav.Link>
    </>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <strong>Simple Regatta</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {user ? authNav : anonNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
