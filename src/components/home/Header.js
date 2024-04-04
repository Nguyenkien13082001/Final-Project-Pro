import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../../img/logoE.png";
import Avatar from "../../img/img_avatar.png";
import "./../../style/style.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Header(li) {
  // const [search, setSearch] = useState();

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setSearch(value);
  // };
  // const handleClick = () => {
  //   alert(search);
  // };

  return (
    <div className="Nav ">
      <Navbar
        style={{
          // padding: 3,
          // boxShadow: "1px 3px 8px #333",
          // backgroundColor: "#f8f9fa",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          height: "66px",
          backgroundColor: "#f8f9fa",
          fontSize: "16px",
          boxShadow: "1px 1px 5px #333",
          zIndex: 1000,
        }}
        // // expand="lg"
        // className="bg-body-tertiary ps-5 pe-2 "
      >
        <Container style={{ backgroundColor: "#f8f9fa" }} fluid>
          <Link to="/">
            {" "}
            <img
              style={{ width: "80px", height: "60px" }}
              src={logo}
              alt="logo EduSmart"
            />
          </Link>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/" className="Nav-Link">
                Home
              </Link>
              <Link to="/creattopic" className="Nav-Link">
                Create Topic
              </Link>
              <Link to="#action2" className="Nav-Link">
                Mock Exam
              </Link>
              <Link to="#action2" className="Nav-Link">
                Class 10
              </Link>
              <Link to="#action2" className="Nav-Link">
                Class 11
              </Link>
              <Link to="#action2" className="Nav-Link">
                {" "}
                Class 12
              </Link>
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
            {/* <nav>
              <Button variant="outline-success">
                <Link to="/login">Log in/Sign up</Link>
              </Button>
            </nav> */}

            {/* <Form className="d-flex">
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
            </Form> */}
            {localStorage.getItem("token") ? (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <img src={Avatar} className="avatar" alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/profile"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      window.location.href = "/";
                    }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                style={{
                  marginLeft: "15px",
                  width: "130px",
                  padding: "5px 0",
                }}
                variant="outline-primary"
              >
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "Black",
                    padding: "5px 10px",
                  }}
                >
                  Log in/Sign up
                </Link>
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
