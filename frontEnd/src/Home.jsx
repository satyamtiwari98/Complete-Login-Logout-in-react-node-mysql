import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // A <Link> is an element that lets the user navigate to another page by clicking or tapping on it.

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true; // to force credentials to every Axios requests
  useEffect(() => {
    axios
      .get("http://localhost:9000")
      .then((res) => {
        if (res.data.status === "200OK") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
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
