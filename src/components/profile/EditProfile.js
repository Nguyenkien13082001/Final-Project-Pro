import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";
import { format, set } from "date-fns";
import "./InforAcount.css";

export default function EditProfile({ user, onUpdateUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [passwordError, setPasswordError] = useState(false);
  const [dateError, setDateError] = useState(""); // State mới cho lỗi ngày tháng
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
    // if (!validateDate(formData.dob)) {
    //   toast.error("Invalid date format. Please correct it before saving.");
    //   return;
    // }

    if (formData.confirm_password !== formData.new_password) {
      toast.error("New password does not match");
      return;
    } else if (new Date(formData.dob) > new Date()) {
      toast.error("Date of birth cannot be in the future");
    } else {
      try {
        await apiClient.put("/api/update_info", formData);
        onUpdateUser(); // Gọi callback để thông báo cho component cha
        toast.success("Update Success");
        handleClose();
      } catch (error) {
        toast.error(error.response.data.message);
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
                type="date"
                name="dob"
                value={
                  formData.dob
                    ? format(new Date(formData.dob), "yyyy-MM-dd")
                    : ""
                }
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]} // Ngày hiện tại là ngày tối đa, .split("T")[0]: Tách chuỗi tại ký tự 'T' và lấy phần đầu tiên, tức là ngày ("2024-05-06").
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
          <Button
            style={{ width: "auto" }}
            variant="secondary"
            onClick={handleClose}
          >
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
