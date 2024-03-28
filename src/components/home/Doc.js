import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Doc({ item }) {
  return (
    <Card style={{ width: "300px" }}>
      <Card.Img
        variant="top"
        style={{ height: "300px" }}
        src="https://kenhgiaovien.com/sites/default/files/styles/700xauto/public/de_2-hk2-toan_10-cd-01.jpg"
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}
