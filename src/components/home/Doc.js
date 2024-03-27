import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Doc({ item }) {
  return (
    <Card style={{ width: "300px" }}>
      <Card.Img
        variant="top"
        style={{ width: "300px", height: "300px" }}
        src="https://kenh14cdn.com/2019/8/10/photo-1-1565418850012849840930.jpeg"
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
