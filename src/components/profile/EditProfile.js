import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";

export default function EditProfile({ user, onUpdateUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    name: user.Name,
    email: user.Email,
    dob: user.DoB,
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setFormData({
      name: user.Name,
      email: user.Email,
      dob: user.DoB,
    });
  }, [user]);

  const handleSave = async () => {
    if (formData.confirm_password != formData.new_password) {
      toast.error("New password does not match");
    } else {
      try {
        // Kiểm tra mật khẩu cũ

        // Gọi API để cập nhật thông tin người dùng
        await apiClient.post("/edit_user", formData);
        console.log("thành công ", formData);
        onUpdateUser(); // Gọi callback để thông báo cho component cha
        toast.success("Update Success");
        handleClose();
      } catch (error) {
        toast.error(error.response.data.message);
        // toast.error(error.reponse.data.message);
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDob">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formOldPass">
              <Form.Label>OldPass</Form.Label>
              <Form.Control
                type="password"
                name="old_password"
                value={formData.old_password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formNewPass">
              <Form.Label>NewPass</Form.Label>
              <Form.Control
                type="password"
                name="new_password"
                value={formData.new_password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formConfilmPass">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ width: "auto" }}
            variant="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
