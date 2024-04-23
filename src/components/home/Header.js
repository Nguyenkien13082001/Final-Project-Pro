import React from "react";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./../../img/logoE.png";
import Avatar from "../../img/img_avatar.png";
import "./Header.css"; // Đảm bảo đường dẫn đúng đến file CSS của bạn
import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await apiClient.get("api/get_class_admin");
        setClasses(response.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const handleClicked = async (class_id) => {
    const response = await apiClient.post(`/api/gen_question`, {
      class_ids: [class_id],
      exam_type: "M",
    });
    navigate(`/creattopic/TopicInterface/${response.exam_id}`);
  };

  return (
    <div className="header-nav">
      <Navbar expand="lg" variant="light" className="navbar-custom">
        <Container fluid>
          <Link to="/">
            <img src={logo} alt="logo EduSmart" className="logo" />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Link to="/" className="nav-link-custom">
                Home
              </Link>
              <Link to="/creattopic" className="nav-link-custom">
                Create Topic
              </Link>

              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="nav-link-custom">
                  Mock Exam
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ xl: "start" }}>
                  {classes.length > 0 &&
                    classes.map((cls) => (
                      <Dropdown.Item onClick={() => handleClicked(cls.id)}>
                        Grade {cls.name}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>

              {/* <Dropdown.Item as={Link} to="/class10">
                    Class 10
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/class11">
                    Class 11
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/class12">
                    Class 12
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}

              <Link to="#action2" className="nav-link-custom">
                Class 10
              </Link>
              <Link to="#action2" className="nav-link-custom">
                Class 11
              </Link>
              <Link to="#action2" className="nav-link-custom">
                Class 12
              </Link>
            </Nav>
            {localStorage.getItem("token") ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="dropdown-custom"
                >
                  <img src={Avatar} className="avatar-custom" alt="Profile" />
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ xl: "start" }}>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
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
              <Button variant="outline-primary" className="btn-login-signup">
                <Link to="/login" className="link-login-signup">
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
