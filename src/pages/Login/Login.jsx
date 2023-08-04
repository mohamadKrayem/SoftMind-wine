import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "./Login.scss";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const ref = useRef();

  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuth();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(e) {
    e.preventDefault();
    displayMessage();
  };

  function displayMessage() {
    if(validateEmailAndPassword(email, password)) {
      toast.success("Login successful");
      setAuth({ email, password })
      setSuccess(true);
    } else {
      toast.error("Invalid credentials");
    }
  }

  function validateEmailAndPassword(email, password) {
    return (
      email === "test@test.com" &&
      password === "password"
    )
  }

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    }

    return () => {} 
  }, [success]);

  return (
    <div className="userform g-font">
      <div className="logo"></div>
      <div className="login-block">
        <h1>Login</h1>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              ref={ref}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>

        <div className="divider">
          <span>Or</span>
          <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
