import React, { useState } from "react";
import { Container, Row, Col, Dropdown, Table, Form, Button } from "react-bootstrap";
// import "./Dashboard.css";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h4>PT. Bina Area Persada</h4>
        </div>
        <div className="user-profile">
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-user" className="user-dropdown">
              User Name
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Lihat Profil</Dropdown.Item>
              <Dropdown.Item href="#">Edit Profil</Dropdown.Item>
              <Dropdown.Item href="#">Pengaturan</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <ul className="menu">
          <li className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`} onClick={() => setActiveMenu("dashboard")}>Dashboard</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeMenu === "dashboard" && (
          <Container>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12} className="mb-4">
                <h5>Patrol</h5>
                <Row>
                  {["Shift 1", "Shift 2", "Shift 3"].map((shift, index) => (
                    <Col md={4} key={index}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>{shift}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Sample Data</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Sample Data</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  ))}
                </Row>
              </Col>

              <Col md={6} className="mb-4">
                <h5>Incident Report</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Incident</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Sample Incident</td>
                      <td>2025-01-22</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>

              <Col md={6} className="mb-4">
                <h5>Matrix Training & Coaching</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Training</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Sample Training</td>
                      <td>2025-01-22</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
