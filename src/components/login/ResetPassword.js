import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ResetPassword() {
  const location = useLocation();
  console.log("Location:", location);
  const queryParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState(queryParams.get("email"));
  const [code, setCode] = useState(queryParams.get("code"));
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await apiClient.post("/change_password_reset", {
        email: email,
        code: code,
        password: password,
      });
      if (response) {
        toast.success(response.message);
        navigate("/login");
        // handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handlePassChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={handleSubmit}
            style={{ width: "auto" }}
            variant="primary"
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
