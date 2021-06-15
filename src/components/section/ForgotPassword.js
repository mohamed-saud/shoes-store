import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../context/authContect";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const [messag, setMessag] = useState("");
  const { resetpassword } = useAuth();
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessag("");
      await resetpassword(emailRef.current.value);
      setMessag("check your index for further instrucion");
    } catch {
      setErr("can not reset passord");
    }
  }

  return (
    <div className="container mt-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password reset</h2>
          <Form onSubmit={handleSubmit}>
            {err && <Alert variant="danger">{err}</Alert>}
            {messag && <Alert variant="danger">{messag}</Alert>}

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>

            <br></br>
            <Button className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="login">Log in</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-4">
        Need an accont? <Link to="singup">Sing Up</Link>
      </div>
    </div>
  );
};
