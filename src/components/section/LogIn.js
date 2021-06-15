import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/Config";

import { useAuth } from "../../context/authContect";
const LogIn = () => {
  const emailRef = useRef();
  const passwordlRef = useRef();
  const { login } = useAuth();
  const [err, setErr] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordlRef.current.value);
      history.push("/product");
    } catch {
      setErr("Fild Log in pless try again");
    }
  }

  return (
    <div className="container mt-5">
      <Card className="">
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <Form onSubmit={handleSubmit}>
            {err && <Alert variant="danger">{err}</Alert>}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordlRef} required />
            </Form.Group>

            <br></br>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="forgot-password">Forgot password</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-4">
          Need an accont? <Link to="singup">Sing Up</Link>
        </div>
      </Card>
    </div>
  );
};
export default LogIn;
