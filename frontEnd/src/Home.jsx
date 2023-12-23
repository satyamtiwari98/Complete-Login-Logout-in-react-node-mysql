import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:9000").then((res) => {
      if (res.data.status === "200OK") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.message);
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:9000/logout")
      .then((res) => {
        if (res.data.status === "200OK") {
          location.reload(true);
        } else {
          alert("error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {auth ? (
        <div>
          <h3>You Are Authorized {name}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h3>You Are Not Authorized {message}</h3>
          <h4>Login Now</h4>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
