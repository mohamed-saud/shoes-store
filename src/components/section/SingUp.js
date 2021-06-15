import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContect";

const SingUp = () => {
  const emailRef = useRef();
  const passwordlRef = useRef();
  const passwordlConfirmRef = useRef();
  const { singup } = useAuth();
  const [err, setErr] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordlRef !== passwordlConfirmRef) {
      setErr("password in not ecual");
    }
    setErr();
    try {
      await singup(emailRef.current.value, passwordlRef.current.value);
      history.push("/product");
    } catch {
      setErr("can not creat acont");
    }
  }

  return (
    <div className="container mt-5">
      <Card className="">
        <Card.Body>
          <h2 className="text-center mb-4">Sing Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>'Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordlConfirmRef}
                required
              />
            </Form.Group>

            <br></br>
            <Button className="w-100" type="submit">
              Sing Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-4">
          Aredy have an accont? <Link to="login">Log In</Link>
        </div>
      </Card>
    </div>
  );
};
export default SingUp;
