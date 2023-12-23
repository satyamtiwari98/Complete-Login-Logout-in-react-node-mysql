import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // The useNavigate hook returns a function that lets you navigate programmatically

  axios.defaults.withCredentials = true; // to force credentials to every Axios requests
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login", data)
      .then((res) => {
        if (res.data.status === "200OK") {
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>SigIn</h2>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
