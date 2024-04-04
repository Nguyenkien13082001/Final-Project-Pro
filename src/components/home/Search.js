import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./../../img/logoE.png";
import Avatar from "../../img/img_avatar.png";
import "./../../style/style.css";
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

export default function Search() {
  // const [search, setSearch] = useState();

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setSearch(value);
  // };
  // const handleClick = () => {
  //   alert(search);
  // };

  const [search, setSearch] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch(value);
  };
  const handleClick = () => {
    alert(search);
  };
  return (
    <div className="form_SeachHome">
      <Form.Control
        style={{ width: "50vh" }}
        name="search"
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={handleChange}
      />
      <Button
        className="btn_SeachHome"
        variant="outline-success"
        onClick={handleClick}
      >
        Search
      </Button>
    </div>
  );
}
