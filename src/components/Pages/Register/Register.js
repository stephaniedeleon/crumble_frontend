import "./Register.css";

import { Form, FormGroup, FormLabel, Button, Container } from "react-bootstrap";
import { useRegister } from "hooks/useRegister";

export default function Register() {
  const {
    form,
    handleOnTextChange,
    handleOnClickSubmit,
  } = useRegister();

  return (
    <div className="Register">
      <Container>
        <Form onSubmit={handleOnClickSubmit}>
          <FormGroup>
            <FormLabel>First Name</FormLabel>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleOnTextChange}
              value={form.firstName}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Last Name</FormLabel>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleOnTextChange}
              value={form.lastName}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleOnTextChange}
              value={form.email}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleOnTextChange}
              value={form.password}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Confirm Password</FormLabel>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleOnTextChange}
              value={form.confirmPassword}
              required
            />
          </FormGroup>

          <FormGroup>
            <Form.Check
              type="checkbox"
              label="Agree To Terms and Services"
              required
            />
          </FormGroup>

          <Button type="submit">Register</Button>
        </Form>
      </Container>
    </div>
  );
}
