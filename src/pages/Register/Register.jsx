import "../Login/Login.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });
  const { email, password, password2 } = formData;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const ref = useRef();
  const { setAuth } = useAuth();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  function onSubmit(e){
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { email, password };
      toast.success("Registration successful");
      setAuth(userData);
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    return () => {};
  }, [success]);

  return (
    <div className="g-font">
      <div className="logo"></div>
      <div className="login-block">
        <h1>Register</h1>
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <div className="divider">
          <span>Or</span>
          <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
