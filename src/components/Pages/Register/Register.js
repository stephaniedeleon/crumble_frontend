import "./Register.css";

import { Form, FormGroup, FormLabel, FormControl, Button, Container } from "react-bootstrap";
import { useRegister } from "hooks/useRegister";
import { Link } from "react-router-dom";

export default function Register() {
  const { form, errors, handleOnTextChange, handleOnClickSubmit } = useRegister();

  return (
    <div className="Register">
      <Container className="card">
        <h2>Sign Up</h2>
        <br />
        <Form onSubmit={handleOnClickSubmit}>
          <FormGroup>
            <FormLabel className="form-label">Email</FormLabel>
            <Form.Control
              type="email"
              name="email"
              className="input-field"
              placeholder="Enter a valid email"
              onChange={handleOnTextChange}
              value={form.email}
              isValid={!errors.email && errors.email !== undefined}
              isInvalid={errors.email}
              required
            />
          </FormGroup>
          <FormControl.Feedback>Looks Good!</FormControl.Feedback>
          <FormControl.Feedback type="isInvalid">
            {errors.email}
          </FormControl.Feedback>

          <div className="split-input-field">
            <FormGroup>
              <FormLabel className="form-label">First Name</FormLabel>
              <Form.Control
                type="text"
                name="firstName"
                className="input-field-split"
                placeholder="First"
                onChange={handleOnTextChange}
                value={form.firstName}
                isValid={!errors.firstName && errors.firstName !== undefined}
                isInvalid={errors.firstName}
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel className="form-label">Last Name</FormLabel>
              <Form.Control
                type="text"
                name="lastName"
                className="input-field-split"
                placeholder="Last"
                onChange={handleOnTextChange}
                value={form.lastName}
                isValid={!errors.lastName && errors.lastName !== undefined}
                isInvalid={errors.lastName}
                required
              />
            </FormGroup>
          </div>

          <FormGroup>
            <FormLabel className="form-label">Password</FormLabel>
            <Form.Control
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter a secure password"
              onChange={handleOnTextChange}
              value={form.password}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel className="form-label">Confirm Password</FormLabel>
            <Form.Control
              type="password"
              name="confirmPassword"
              className="input-field"
              placeholder="Confirm your password"
              onChange={handleOnTextChange}
              value={form.confirmPassword}
              isValid={!errors.confirmPassword && errors.confirmPassword !== undefined}
              isInvalid={errors.confirmPassword}
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

          <Button type="submit" className="register-btn">
            Register
          </Button>
        </Form>
        <div className="footer">
          <p>
            Already have an account? Login <Link to="/login">here.</Link>
          </p>
        </div>
      </Container>
    </div>
  );
}

{
  /* <div className="split-input-field">
<div className="input-field">
  <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleOnInputChange} />
  {errors.firstName && <span className="error">{errors.firstName}</span>}
</div>

<div className="input-field">
  <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleOnInputChange} />
  {errors.lastName && <span className="error">{errors.lastName}</span>}
</div>
</div> */
}
