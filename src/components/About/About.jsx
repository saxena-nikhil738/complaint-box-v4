import React from "react";
import { useAuth } from "../../context/auth";
import Footer from "../Footer/footer";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div>
        <div
          style={{ marginLeft: "150px", marginRight: "150px" }}
          className=" mt-5"
        >
          <h1 className="display-4">About this app</h1>
          <hr />

          <div className="mt-5 row">
            <div className="col-10">
              <div className="p-5">
                <p>
                  <p className="mb-2">
                    <b>Introduction:</b> <hr /> ▪️ Begin with a concise
                    introduction to the complaint box app. <br />
                    ▪️ Highlight the app's role in facilitating communication
                    and feedback.
                  </p>
                  <br />
                  <p className="mb-2">
                    <b>Purpose of the App:</b> <hr /> ▪️ Clearly state the main
                    purpose of the complaint box app. <br /> ▪️ Explain how the
                    app aims to improve communication and address user concerns.{" "}
                  </p>
                  <br />
                  <p className="mb-2">
                    <b>How It Works:</b>
                    <hr /> ▪️ Provide a brief overview of how users can submit
                    complaints through the app.
                    <br /> ▪️ Describe the steps users need to take, from
                    accessing the app to receiving resolution.
                  </p>{" "}
                  <br />
                  <p className="mb-2">
                    <b>Features: </b>
                    <hr /> ▪️ Highlight key features of the complaint box app
                    that make it user-friendly and effective. <br />
                    ▪️ Mention any unique functionalities that set it apart from
                    other platforms.
                  </p>{" "}
                  <br />
                  <p className="mb-2">
                    <b>User Benefits:</b> <hr /> ▪️ Explain the benefits users
                    can expect from using the complaint box app. <br /> ▪️
                    Emphasize how the app streamlines the complaint process and
                    ensures timely responses.
                  </p>{" "}
                  <br />
                  <p className="mb-2">
                    <b>Security and Privacy:</b> <hr /> ▪️ Assure users about
                    the security measures in place to protect their information.{" "}
                    <br /> ▪️ Highlight any privacy features that maintain user
                    confidentiality.
                  </p>
                </p>
                <p className="lead"></p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-5"
          style={{ marginLeft: "30px", marginRight: "30px" }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
