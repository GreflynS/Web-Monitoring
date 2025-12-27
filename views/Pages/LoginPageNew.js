import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../stores";
import { Button, Card, Form, Container, Col } from "react-bootstrap";
import "./LoginPage.css";
import Swal from "sweetalert2";

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    general: "",
  });

  const [resetKey, setResetKey] = React.useState(0);
  const [cardClasses, setCardClasses] = React.useState("card-hidden");

  React.useEffect(() => {
    setTimeout(() => setCardClasses(""), 1500);
  }, []);

  const validateInputs = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username wajib diisi.";
    if (!password.trim()) newErrors.password = "Password wajib diisi.";
    return newErrors;
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    if (errors.username || errors.general) {
      setErrors((prev) => ({ ...prev, username: "", general: "" }));
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (errors.password || errors.general) {
      setErrors((prev) => ({ ...prev, password: "", general: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...validationErrors }));
      return;
    }

    try {
      await login(dispatch, { username, password }, history).catch(() => {
        throw new Error("LOGIN_FAILED");
      });

      // Jika sampai sini → login sukses
      // Hapus semua error (termasuk general) agar popup merah tidak muncul
      setErrors({
        username: "",
        password: "",
        general: "",
      });

      // Setelah berhasil, kemungkinan login() sudah memanggil history.push.
      // Jika tidak, kamu bisa redirect manual di sini (opsional).
      // history.push("/dashboard");
    } catch (error) {
      // Kalau sampai sini → login salah / gagal
      setErrors({
        username: "",
        password: "",
        general: "",
      });

      // Reset input
      setUsername("");
      setPassword("");

      // paksa zorm reset total
      setResetKey((prev) => prev + 1);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-background"></div>
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Col lg="5" md="8">
          <Form className="form" onSubmit={handleSubmit}>
            <Card className={`card-login ${cardClasses}`}>
              <Card.Header className="text-center">
                <h3 className="header">
                  Login <hr />
                </h3>
              </Card.Header>

              <Card.Body>
                {/* {errors.general && (
                  <div className="alert alert-danger text-center">
                    {errors.general}
                  </div>
                )} */}

                <Form.Group key={`username-group-${resetKey}`}>
                  <label className="form-label">Username</label>
                  <Form.Control
                    value={username}
                    onChange={handleChangeUsername}
                    placeholder="Enter Username"
                    type="text"
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group key={`password-group-${resetKey}`}>
                  <label className="form-label">Password</label>
                  <Form.Control
                    value={password}
                    onChange={handleChangePassword}
                    placeholder="Enter Password"
                    type="password"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>

              <Card.Footer className="text-center">
                <Button className="btn-login" type="submit">
                  Login
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default LoginPage;
