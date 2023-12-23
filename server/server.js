import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

app.post("/login", (req, res) => {
  const sql = "SELECT * from login WHERE email=? AND password=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json({ message: "Server Side Error" });
    if (data.length > 0) {
      const name = data[0].name;
      const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ status: "200OK" });
    } else {
      return res.json({ message: "User Doesnot exist" });
    }
  });
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
