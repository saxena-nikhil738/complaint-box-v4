import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UserLogin.css";
import { useAuth } from "../../../context/auth";
import image from "../../../image/login.jpg";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  async function submit(e) {
    e.preventDefault();
    if (email == "" || password === "") {
      alert("Fill required details");
    } else {
      await axios
        .post("https://complaint-backend-7u2y.onrender.com/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.enum === 1) {
            if (res.data !== null) {
              setAuth({
                ...auth,
                username: res.data.username,
                enum: res.data.enum,
                email: res.data.email,
                token: res.data.token,
              });
              console.log(auth);
              localStorage.setItem(
                "auth",
                JSON.stringify({
                  username: res.data.username,
                  email: res.data.email,
                  enum: res.data.enum,
                  token: res.data.token,
                })
              );
              console.log(location);
              // console.log(String(location?.state?.prevUrl));
              navigate(location?.state?.prevUrl || "/");
            }
          } else {
            alert("No such user exist!");
          }
        })

        .catch((error) => {
          console.log(error);
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
              Welcome back <br />
              please Login!
            </h1>
            <div className="login-form">
              <div>
                <input
                  style={{ fontSize: "60px" }}
                  className=" inputx"
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
                  onClick={submit}
                  style={{
                    width: "120px",
                    height: "40px",
                    fontSize: "20px",
                    borderRadius: "24px",
                  }}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Login
                </button>
              </div>
            </div>
            <Link
              className="mb-5 mt-5"
              style={{ fontSize: "20px" }}
              to={"/usersignup"}
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
