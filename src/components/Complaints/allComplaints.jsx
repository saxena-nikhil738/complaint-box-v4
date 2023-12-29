import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./complaint.css";
import Records from "./records";
import Pagination from "./Pagination";
import { FormDialog } from "../Main/main";
// import "./main.css";
import { useAuth } from "../../context/auth";
import logo from "../../image/no-record.jpg";
import NewComplaint from "./newComplaint";
import NoRecord from "../Main/NoRecord";

const AllComplaints = () => {
  const [compData, setCompData] = useState([]);
  const [status, setStatus] = useState();
  const [auth, setAuth] = useAuth();
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRocordPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = compData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(compData.length / recordsPerPage);
  // const [currentRecords, setCurrentPages] = useState()
  // const [nPages, setNPages] = useState();
  // const [temp, setTemp] = useState([]);
  const temp = [];
  const [search, setSearch] = useState("");
  // const n = recordsPerPage;
  let j = 0;

  async function fun(e) {
    // e.preventDefault();

    try {
      await axios
        .get("https://complaint-backend-7u2y.onrender.com/allcomplaint")
        .then((res) => {
          for (var i = 0; i < res.data?.length; i++) {
            if (auth.enum === 0) {
              temp[j++] = res.data[i];
            } else if (auth.enum === 1) {
              if (auth.email === res.data[i].email) {
                temp[j++] = res.data[i];
              }
            }
          }
          temp.sort((a, b) => parseInt(b.appId, 10) - parseInt(a.appId, 10));
          setCompData(temp);
          // console.log(compData.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    // setNPages(Math.ceil(compData.length / recordsPerPage));
    fun();
  }, [auth]);

  return (
    <>
      <div style={{ marginLeft: "150px", marginRight: "150px" }} className=" ">
        <div className="container">
          <div className="">
            <FormDialog />
          </div>
          <div className=" row middle">
            <div className="col-1"></div>
            <div className="col-8 row">
              <div className="col-3">
                <NewComplaint />
              </div>
              <div className="col-6">
                {currentRecords?.length <= 0 ? (
                  <input
                    className=" search "
                    disabled
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                ) : (
                  <input
                    className=" search "
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>

        <div className=" k">
          <div className=" search-center">
            {/* <Sample /> */}
            <div className="mb-4">
              <Records item={currentRecords} search={search} />
            </div>
            <div className="">
              {currentRecords?.length <= 0 ? (
                <NoRecord />
              ) : currentRecords?.length < 10 ? (
                <Pagination
                  disabled
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              ) : (
                <Pagination
                  disabled
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllComplaints;
