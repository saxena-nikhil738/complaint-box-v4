import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useState, useEffect } from "react";

export default function NewComplaint() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("pending");
  const [name, setName] = useState();
  const [auth, setAuth] = useAuth();
  const [email, setemail] = useState(auth.email);
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  // const [appId, setAppId] = useState();
  // const [dateTime, setDateTime] = useState();

  // const [note, setNode] = useState("");
  const note = "NULL";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const reset = () => {
    console.log("reset");
    setName("");
    console.log(name, "-");
  };

  useEffect(() => {
    setemail(auth.email);
  });

  async function submit(e) {
    e.preventDefault();
    if (category === undefined) {
      alert("Select category");
    } else if (name === undefined || description === undefined) {
      alert("Fill the required filled");
    } else {
      console.log(description);
      const d = new Date();
      const appId =
        d.getFullYear() +
        "" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "" +
        ("0" + d.getDate()).slice(-2) +
        "" +
        ("0" + d.getHours()).slice(-2) +
        "" +
        ("0" + d.getMinutes()).slice(-2) +
        "" +
        ("0" + d.getSeconds()).slice(-2);

      const dateTime =
        ("0" + d.getDate()).slice(-2) +
        "/" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "/" +
        d.getFullYear();
      await axios
        .post("https://complaint-backend-7u2y.onrender.com/createcomplaint", {
          appId,
          note,
          dateTime,
          name,
          email,
          category,
          description,
          status,
        })
        .then((res) => {
          if (res.data === "info") {
            handleClose();
            alert("Complaint registered");
          }
          setCategory(undefined);
          setDescription(undefined);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <React.Fragment>
      <div className="new-comp">
        {auth.enum === 1 ? (
          <Button
            style={{ outline: "none", height: "30px" }}
            className="ml-5 "
            variant="contained"
            onClick={handleClickOpen}
          >
            New complaint
          </Button>
        ) : (
          ""
        )}

        <Dialog open={open} onClose={handleClose}>
          <div className="complaint-title ">
            <h2 className="p-2">New Complaint</h2>
          </div>

          <DialogContent className="">
            <div className="form-data row w-100 ">
              <p className="name input col-12">
                <div className="row">
                  <span className="col-3 ml-4 mt-3">Name:</span>
                  <input
                    style={{ outline: "none" }}
                    type="text"
                    className="w-75 mt-3 col-8"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </p>

              <p className="email input col-12">
                <div className="row">
                  <span className="col-3 ml-4 mt-3">Email:</span>
                  <input
                    type="email"
                    value={auth.email}
                    disabled
                    className="w-75 mt-3 mb-4 col-8"
                  />
                </div>
              </p>

              <div className="dropdown col-12">
                <p className="row">
                  <span className="col-3 ml-4">Category:</span>
                  <select
                    style={{ outline: "none" }}
                    className="col-5"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="electric">electric</option>
                    <option value="furniture">furniture</option>
                    <option value="plumber">plumber</option>
                    <option value="cleaning">cleaning</option>
                    <option value="data center">data center</option>
                  </select>
                </p>
              </div>
              <p className="name col-12">
                <div className="row">
                  <span className="col-3 ml-4 mt-3">Description:</span>
                  <textarea
                    type="text"
                    style={{ outline: "none" }}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="textarea-1 w-75 mt-3 mb-4 col-8"
                  />
                </div>
              </p>
              <DialogActions className="col-12 ">
                <Button
                  style={{ outline: "none" }}
                  variant="outlined"
                  type="reset"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={submit}>
                  Submit
                </Button>
              </DialogActions>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
