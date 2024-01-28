import React from "react";
import { useState } from "react";
import FormErrors from "./FormErrors";
import { URLs } from "./lib/allauth";
import { Navigate, Link } from "react-router-dom";
import { usePostLogin } from "./UserSession";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({ fetching: false, data: null });
  const postLogin = usePostLogin();

  function submit() {
    setResponse({ ...response, fetching: true });
    postLogin({ login: email, password })
      .then((data) => {
        setResponse((r) => {
          return { ...r, data };
        });
      })
      .catch((e) => {
        console.error(e);
        window.alert(e);
      })
      .then(() => {
        setResponse((r) => {
          return { ...r, fetching: false };
        });
      });
  }
  if (response?.data?.location === URLs.CONFIRM_EMAIL) {
    return <Navigate to="/confirm-email" />;
  } else if (response?.data?.location === URLs.PROFILE) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Container className="mt-5">
        {response.data?.form?.errors && (
          <Alert variant="danger">
            <FormErrors errors={response.data?.form?.errors} />
          </Alert>
        )}
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h2 className="mb-4 text-center">Login</h2>
            <Form onSubmit={submit}>
              <Form.Group controlId="formEmail" className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                className="btn-block mt-3"
                variant="primary"
                type="submit"
                block
              >
                Login
              </Button>

              <div className="text-center mt-3">
                <Link to="/password/reset">Forgot your password?</Link>
              </div>
              <div className="text-center mt-3">
                <p>
                  No account? <Link to="/signup">Sign up here.</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
