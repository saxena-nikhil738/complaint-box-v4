import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./UserSignup.css";
import image from "../../../image/login.jpg";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const token = "";
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const idfy = location.pathname === "/usersignup" ? 1 : 0;
  console.log(idfy);

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
          console.log(res);
          if (!res.data.success) {
            alert("Email already exist");
          } else {
            navigate("/userlogin");
            alert("User registered");
          }
        })
        .catch((e) => {
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
              Hello User <br />
              please Sign up!
            </h1>
            <div className="login-form">
              <div>
                <input
                  className="inputx"
                  required
                  type="text"
                  placeholder="Username"
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
                  type="email"
                  placeholder="Email"
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
            <Link
              className="mb-5 mt-5"
              style={{ fontSize: "20px" }}
              to={"/userlogin"}
            >
              Have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
