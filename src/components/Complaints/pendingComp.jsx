import { CardActionArea } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import CompaintCard from "./CompaintCard";
import { FormDialog } from "../Main/main";
import "./complaint.css";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import NoRecord from "../Main/NoRecord";

const Pendingcomplaints = () => {
  const navigate = useNavigate();
  const [compData, setCompData] = useState([]);
  const [search, setSearch] = useState("");
  const [auth, setAuth] = useAuth();
  const temp = [];

  const fun = () => {
    axios
      .get("https://complaint-backend-7u2y.onrender.com/pending", {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((res) => {
        // set(res.data);
        for (var i = 0; i < res.data.length; i++) {
          temp[i] = res.data[i];
        }
        temp.sort((a, b) => parseInt(b.appId, 10) - parseInt(a.appId, 10));

        setCompData(temp);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fun();
  }, [auth]);

  return (
    <>
      <div style={{ marginLeft: "150px", marginRight: "150px" }} className="">
        <div className="">
          <FormDialog />
        </div>
        {auth.enum === 0 ? (
          compData.length <= 0 ? (
            <NoRecord />
          ) : (
            <div className="mb-5 search-center">
              <input
                type="text"
                className="search "
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {compData
                .filter((complaint) => {
                  if (search === "") {
                    return complaint;
                  } else if (
                    complaint.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return complaint;
                  }
                })
                .map((comp) => {
                  return <CompaintCard e={comp} />;
                })}
            </div>
          )
        ) : (
          navigate("*")
        )}
      </div>
    </>
  );
};
export default Pendingcomplaints;
