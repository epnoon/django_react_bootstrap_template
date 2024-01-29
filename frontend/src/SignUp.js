import React from "react";
import { useState } from "react";
import FormErrors from "./FormErrors";
import { postSignUp, URLs } from "./lib/allauth";
import { Navigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [response, setResponse] = useState({ fetching: false, data: null });

  function submit(event) {
    event.preventDefault();
    setResponse({ ...response, fetching: true });
    postSignUp({
      first_name: firstName,
      last_name: lastName,
      email,
      password1,
      password2,
    })
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

    console.log(response?.data?.location);
  if (response?.data?.location === URLs.CONFIRM_EMAIL) {
    return <Navigate to="/confirm-email/" />;
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2 className="mb-4 text-center">Sign up</h2>
          <FormErrors errors={response?.data?.form?.errors} />

          <Form onSubmit={submit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formFirstName" className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />

                  <FormErrors
                    errors={response?.data?.form?.fields?.first_name?.errors}
                  />
                </Form.Group>
              </Col>{" "}
              <Col xs={12} md={6}>
                <Form.Group controlId="formLastName" className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />

                  <FormErrors
                    errors={response?.data?.form?.fields?.last_name?.errors}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formEmail" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormErrors
                errors={response?.data?.form?.fields?.email?.errors}
              />
            </Form.Group>

            <Form.Group controlId="formPassword1" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="new-password"
                type="password"
                placeholder="Enter your password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
              <FormErrors
                errors={response?.data?.form?.fields?.password1?.errors}
              />
            </Form.Group>

            <Form.Group controlId="formPassword2" className="mb-2">
              <Form.Label>Password (again)</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password again"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <FormErrors
                errors={response?.data?.form?.fields?.password2?.errors}
              />
            </Form.Group>

            <Button
              className="mt-2"
              variant="primary"
              type="submit"
              disabled={response.fetching}
            >
              {response.fetching ? "Signing Up..." : "Sign Up"}
            </Button>

            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to="/login">Login here.</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
