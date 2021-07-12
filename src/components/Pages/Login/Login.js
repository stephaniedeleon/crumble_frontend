import "./Login.css";

import { Form, FormGroup, FormLabel, Button, Container } from "react-bootstrap";
import { useLogin } from "hooks/useLogin";

export default function Login() {
  const { form, handleOnTextChange, handleOnClickSubmit } = useLogin();

  return (
    <div className="Login">
      <Container className="px-5">
        <Form onSubmit={handleOnClickSubmit}>
          <FormGroup>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
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
              placeholder="Enter Password"
              onChange={handleOnTextChange}
              value={form.password}
              required
            />
          </FormGroup>

          <Button type="submit">Register</Button>
        </Form>
      </Container>
    </div>
  );
}
