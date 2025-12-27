import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { baseAxios } from "stores";
import "./Dashboard.css";

const Dashboard = () => {
  const [namaUser, setNamaUser] = useState("");

  const [jumlahUser, setJumlahUser] = useState(0);
  const [jumlahClient, setJumlahClient] = useState(0);
  const [jumlahCabang, setJumlahCabang] = useState(0);
  const [jumlahRuangan, setJumlahRuangan] = useState(0);
  const [jumlahShift, setJumlahShift] = useState(0);
  const [jumlahPatrol, setJumlahPatrol] = useState(0);
  const [jumlahTraining, setJumlahTraining] = useState(0);
  const [jumlahVisit, setJumlahVisit] = useState(0);

  const fetchCount = async (endpoint, setter) => {
    try {
      const response = await baseAxios.get(endpoint, {
        headers: { token: localStorage.getItem("token") },
      });
      setter(response.data.count || 0);
    } catch (err) {
      console.error(`Error fetch ${endpoint}:`, err);
      setter(0);
    }
  };

  useEffect(() => {
    const storedNama = localStorage.getItem("nama");
    setNamaUser(
      storedNama && storedNama !== "undefined" && storedNama !== "null"
        ? storedNama
        : "User"
    );

    fetchCount("user/getjumlahuser", setJumlahUser);
    fetchCount("client/getjumlahclient", setJumlahClient);
    fetchCount("cabang/getjumlahcabang", setJumlahCabang);
    fetchCount("ruangan/getjumlahruangan", setJumlahRuangan);
    fetchCount("shift/getjumlahshift", setJumlahShift);
    fetchCount("patrol/getjumlahpatrol", setJumlahPatrol);
    fetchCount("training/getjumlahtraining", setJumlahTraining);
    fetchCount("visit/getjumlahvisit", setJumlahVisit);
  }, []);

  const renderCard = (title, count, icon, color) => (
    <Card
      className="dashboard-card shadow-sm text-dark"
      style={{ borderLeft: `6px solid ${color}` }}
    >
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div>
          <h5>{title}</h5>
          <h2>{count}</h2>
        </div>
        <div style={{ fontSize: "2.5rem", color: color }}>
          <i className={`fa ${icon}`} style={{ marginLeft: "-20px" }}></i>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-4 dashboard-container">
      {/* CARD WELCOME */}
      <Card className="welcome-card mb-4 shadow-sm">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "white" }}>
              Hi, {namaUser}
            </h2>
            <p className="mb-0" style={{ color: "white" }}>
              Welcome back! Hope you’re feeling refreshed and ready to make the
              most of your day. Let’s get things done at your own pace.
            </p>
          </div>
        </Card.Body>
      </Card>

      {/* GRID CARD JUMLAH */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          {renderCard("Users", jumlahUser, "fa-users", "#2e72f5")}
        </Col>
        <Col md={3}>
          {renderCard("Staffs", jumlahClient, "fa-user-tie", "#2e72f5")}
        </Col>
        <Col md={3}>
          {renderCard("Branchs", jumlahCabang, "fa-building", "#2e72f5")}
        </Col>
        <Col md={3}>
          {renderCard("Rooms", jumlahRuangan, "fa-door-open", "#2e72f5")}
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={3}>
          {renderCard("Shifts", jumlahShift, "fa-clock", "#2e72f5")}
        </Col>
        <Col md={3}>
          {renderCard("Patrols", jumlahPatrol, "fa-shield-alt", "#2e72f5")}
        </Col>
        <Col md={3}>
          {renderCard(
            "Trainings",
            jumlahTraining,
            "fa-chalkboard-teacher",
            "#2e72f5"
          )}
        </Col>
        <Col md={3}>
          {renderCard("Visits", jumlahVisit, "fa-route", "#2e72f5")}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
