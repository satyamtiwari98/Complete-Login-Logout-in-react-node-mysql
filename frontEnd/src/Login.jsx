import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
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
    <div>
      <h2>SigIn</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <strong>Email</strong>
        </label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>
          <strong>Password</strong>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
