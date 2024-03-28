import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavbarHome() {
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
    <div className="Nav">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <img
            style={{ width: "60px", height: "60px" }}
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/12/Icon-Truong-Dai-hoc-Greenwich-Viet-Nam.png"
            alt=""
          />
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
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>

            <Form className="d-flex">
              <Form.Control
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

            <Button style={{ marginLeft: "15px" }} variant="outline-success">
              Log in/Sign up
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
