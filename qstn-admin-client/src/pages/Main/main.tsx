import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();

  const [whitelist, setWhitelist] = useState([]);
  const [modalFlag, setModalFlag] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  useEffect(() => {}, []);
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    else {
      console.log("ok");
      console.log(JSON.parse(String(localStorage.getItem("token"))).token);
      fetch("https://qstn-admin-server.onrender.com/api/whitelist/get_all", {
        method: "GET",
        headers: {
          Authorization: JSON.parse(String(localStorage.getItem("token")))
            .token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.ok) {
            localStorage.removeItem("token");
            navigate("/");
          }
          setWhitelist(data.whitelistDB);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Wrapper>
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th> Num </th>
              <th> Address </th>
              <th> Status </th>
              <th> Change </th>
              <th> Remove </th>
            </tr>
          </thead>
          <tbody>
            {whitelist?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item["address"]}</td>
                <td>{item["status"] ? "True" : "False"}</td>
                <td>
                  <input
                    type="button"
                    value="change"
                    className="btn-change"
                    onClick={() => {
                      if (
                        window.confirm(
                          `You really change status to ${!item["status"]}`
                        )
                      ) {
                        fetch(
                          "https://qstn-admin-server.onrender.com/api/whitelist/change",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: JSON.parse(
                                String(localStorage.getItem("token"))
                              ).token,
                            },
                            body: JSON.stringify({
                              id: item["_id"],
                              status: !item["status"],
                            }),
                          }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            if (!data.ok) {
                              alert(data.err.message);
                              return;
                            }
                            setWhitelist(data.whitelist);
                          })
                          .catch((err) => alert("Something wrong"));
                      }
                    }}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="remove"
                    className="btn-remove"
                    onClick={() => {
                      if (window.confirm("You hope to remove it really ?")) {
                        fetch(
                          "https://qstn-admin-server.onrender.com/api/whitelist/remove",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: JSON.parse(
                                String(localStorage.getItem("token"))
                              ).token,
                            },
                            body: JSON.stringify({
                              id: item["_id"],
                            }),
                          }
                        )
                          .then((res) => res.json())
                          .then((data) => {
                            console.log(data);
                            setWhitelist(data.user);
                          })
                          .catch((err) => console.log(err));
                      }
                    }}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-singout">
        <button
          className="btn-change"
          onClick={() => {
            setModalFlag(true);
          }}
        >
          Add
        </button>
        <button
          className="btn-remove"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log out
        </button>
        <Link to={"/minters"}>
          <button className="btn-change">Minters</button>
        </Link>
      </div>

      <div
        className="add-modal"
        style={{
          display: modalFlag ? "block" : "none",
        }}
        onClick={(e: any) => {
          if (e.target.className === "add-modal") {
            setModalFlag(false);
          }
        }}
      >
        <div className="modal-body">
          <table
            className="modal-table"
            style={{
              margin: "auto",
            }}
          >
            <thead>
              <tr>
                <th> Address </th>
                <th> Status </th>
                <th> Add </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="default-input"
                    onChange={(e) => {
                      setNewAddress(e.target.value);
                    }}
                  ></input>
                </td>
                <td>
                  <select
                    className="default-select"
                    onChange={(e) => setNewStatus(Boolean(e.target.value))}
                  >
                    <option value={0}>False</option>
                    <option value={1}>True</option>
                  </select>
                </td>
                <td>
                  <input
                    type="button"
                    value="Add"
                    className="btn-change"
                    onClick={() => {
                      if (newAddress === "") {
                        alert("Please enter new address");
                      }
                      const data = {
                        address: newAddress,
                        status: newStatus,
                      };

                      fetch(
                        "https://qstn-admin-server.onrender.com/api/whitelist/create",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: JSON.parse(
                              String(localStorage.getItem("token"))
                            ).token,
                          },
                          body: JSON.stringify(data),
                        }
                      )
                        .then((res) => res.json())
                        .then((data) => {
                          if (!data.ok) {
                            alert(data.err.message);
                            return;
                          }
                          setWhitelist(data.user);
                          setModalFlag(false);
                        });
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(192 192 255);
  position: relative;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .div-table {
    padding-top: 100px;
    table {
      margin: auto;
    }
  }

  table {
    table-layout: fixed;
  }
  .tbl-header {
    /* background-color: rgba(255, 255, 255, 0.3); */
  }
  .tbl-content {
    height: 300px;
    overflow-x: auto;
    margin-top: 0px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 19px;
    color: rgb(13 12 34);
    text-transform: uppercase;
  }
  td {
    padding: 15px;
    vertical-align: middle;
    font-weight: 600;
    font-size: 16px;
    color: rgb(13 12 34);
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  }

  .add-singout {
    position: absolute;
    top: 30px;
    right: 50px;
    button {
      color: #fff;
    }
  }

  .add-modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(100px);
    top: 0;
    padding-top: 100px;
  }
  .btn-remove {
    background-color: #ff512f;
    padding: 8px 15px;
    outline: 0;
    border: 0;
    margin: 5px;
    color: white;
  }

  .btn-change {
    background-color: #1845ad;
    padding: 8px 15px;
    border: 0;
    outline: 0;
    color: white;
  }

  .default-input {
    background-color: transparent;
    border: 1px solid block;
    padding: 8px 15px 8px 5px;
    outline: 0;
  }
  .default-select {
    background-color: transparent;
    padding: 8px 15px 8px 5px;
    border: 1px solid block;
    option {
      color: black;
    }
  }
`;

export default Main;
