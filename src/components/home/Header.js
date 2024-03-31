import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../../img/logoE.png";
import "./../../style/style.css";

export default function Header(li) {
  const [search, setSearch] = useState();
  console.log(search);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch(value);
  };
  const handleClick = () => {
    alert(search);
  };
  return (
    <div className="Nav ">
      <Navbar
        style={{
          padding: 3,
          boxShadow: "1px 3px 8px #333",
        }}
        expand="lg"
        className="bg-body-tertiary ps-5 pe-2 "
      >
        <Container style={{ backgroundColor: "#f8f9fa" }} fluid>
          <img style={{ width: "80px", height: "60px" }} src={logo} alt="" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Create Topic</Nav.Link>
              <Nav.Link href="#action2">Mock Exam</Nav.Link>
              <Nav.Link href="#action2">Class 10</Nav.Link>
              <Nav.Link href="#action2">Class 11</Nav.Link>
              <Nav.Link href="#action2">Class 12</Nav.Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                style={{ backgroundColor: "#00ffcd29" }}
                name="search"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}
              />
              <Button variant="outline-success" onClick={handleClick}>
                Search
              </Button>
            </Form>

            <Button
              href="#"
              style={{ marginLeft: "15px" }}
              variant="outline-success"
            >
              Log in/Sign up
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
