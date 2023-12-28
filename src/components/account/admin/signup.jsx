import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import TextField from "@mui/material/TextField";
import "./signup.css";
import image from "../../../image/login.jpg";
import { useAuth } from "../../../context/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const token = "";
  const navigate = useNavigate();
  const location = useLocation();
  const idfy = location.pathname === "/usersignup" ? 1 : 0;
  console.log(idfy);
  const [auth, setAuth] = useAuth();
  console.log(auth);
  useEffect(() => {
    if (auth.enum === "") {
      navigate("/login");
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || password === "" || email === "") {
      alert("Fill required details");
    } else {
      await axios
        .post("https://complaint-backend-7u2y.onrender.com/signup", {
          username,
          idfy,
          email,
          password,
          token,
        })
        .then((res) => {
          if (!res.data.success) {
            alert("Email already exist");
          } else {
            console.log(res);
            navigate("/dashboard");
            alert("New admin created");
          }
        })
        .catch((e) => {
          alert("Email already exist");
          console.log(e);
        });
    }
  }

  return (
    <div className="container ">
      <div className="form-body row">
        <div className="left col-6">
          <img style={{ width: "400px", height: "auto" }} src={image} alt="" />
        </div>
        <div className="v-line "></div>
        <div className="right col-5">
          <div className="">
            <h1 className="mb-5" style={{ fontSize: "35px" }}>
              Hello Admin <br />
              please Sign up!
            </h1>
            <div className="login-form">
              <div>
                <input
                  className="inputx "
                  required
                  placeholder="Username"
                  type="text"
                  label="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                />
              </div>
              <div>
                <input
                  style={{ fontSize: "60px" }}
                  className=" inputx mt-4"
                  required
                  placeholder="Email"
                  type="email"
                  label="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                />
                <br />
              </div>
              <div>
                <input
                  required
                  className="border-1 inputx mt-4 mb-4"
                  type="password"
                  placeholder="Password"
                  id="password"
                  label="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    width: "120px",
                    height: "40px",
                    fontSize: "20px",
                    borderRadius: "24px",
                  }}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;