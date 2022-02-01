import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableList from "../Components/TableList";
import Form from "./../Components/Form";
import axios from "axios";
import { api, config } from "./../api";

function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState([]);
  const [deleteUser, setDeleteUser] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    await axios
      .get(`${api}/admin/checkAdmin`, config)
      .then((res) => {
        console.log("user authenticated");
      })
      .catch((err) => navigate("/login"));
  }, []);
  useEffect(async () => {
    await axios
      .get(`${api}/user/`)
      .then(({ data }) => setUsers(data))
      .catch((e) => console.log(e));
  }, [newUser, deleteUser]);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "33%",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "25px",
        }}>
        <Form formData={(data) => setNewUser(data)} />
      </div>
      <div
        style={{
          width: "67%",
          height: "100vh",
          padding: "35px",
          overflowY: "scroll",
        }}>
        <TableList users={users} userDelete={(_id) => setDeleteUser(_id)} />
      </div>
    </div>
  );
}

export default Home;
