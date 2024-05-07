import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import "./Doc.css"; // Nhập file CSS
import apiClient from "../../api/apiClient";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form"; // Thêm thư viện Form cho dropdown
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Doc() {
  // Khai báo state để lưu trữ danh sách tài liệu
  const [documents, setDocuments] = useState([]);

  const [classes, setClasses] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState(""); // State mới cho lớp đã chọn

  // Dùng useEffect để gọi API khi component được mount
  useEffect(() => {
    // Hàm để lấy dữ liệu từ API
    const fetchAllDocuments = async () => {
      try {
        const response = await apiClient.get("/api/get_all_documents");
        setDocuments(response.documents); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchAllDocuments(); // Gọi hàm lấy dữ liệu
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

  const handleViewDocument = (url) => {
    window.open(url, "_blank"); // Mở URL trong tab mới
  };

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

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await apiClient.get(
          `/api/get_document_by_class?class_id=${selectedClassId}`
        );
        setDocuments(response.documents); // Đảm bảo phản hồi phù hợp với cấu trúc này
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (selectedClassId) {
      fetchDocuments();
    } else {
      // Tùy bạn có thể chọn hiển thị tất cả tài liệu hoặc không hiển thị tài liệu nào nếu không chọn lớp
      setDocuments([]);
    }
  }, [selectedClassId]); // Thêm classId vào mảng phụ thuộc để re-fetch khi nó thay đổi

  return (
    <div>
      <Form.Group className="custom-form-group" controlId="classSelect">
        <Form.Control
          as="select"
          className="custom-select-control"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option className="Chooseclass" value="0">
            All Class
          </option>
          {classes.map((cls) => (
            <option className="Chooseclass" key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <div className="doc-container">
        {documents.map((doc) => (
          <div key={doc.document_id} className="doc-item">
            <Card className="doc-card">
              <Card.Img
                variant="top"
                className="doc-card-img"
                src={doc.thumbnail} // Sử dụng thumbnail từ API
                onClick={() => handleViewDocument(doc.url)}
              />
              <hr />
              <Card.Body style={{ paddingTop: 0 }}>
                <Card.Text style={{ fontSize: "14px" }} title={doc.created_at}>
                  Created At: {""}
                  {doc.created_at}
                </Card.Text>
                <Card.Title style={{ fontSize: "16px" }} title={doc.name}>
                  {doc.name}
                </Card.Title>

                <div
                  className="btnviewdoc"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  <Button
                    style={{ width: "100px" }}
                    className="btn-view-doc"
                    variant="outline-primary"
                    onClick={() => handleViewDocument(doc.url)}
                  >
                    View
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
