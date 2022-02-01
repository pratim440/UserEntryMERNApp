import React from "react";
import { data } from "./../data";
import axios from "axios";
import { api } from "./../api";
import { toast } from "react-toastify";

function TableList({ users, userDelete }) {
  const handleClick = async (_id) => {
    await axios
      .post(`${api}/user/delete`, { _id })
      .then((res) => {
        userDelete(_id);
        toast.success("Deleted successfully!");
      })
      .catch((err) => toast.error("Something went wrong!"));
  };
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Username</th>
          <th scope='col'>Mobile Number</th>
          <th scope='col'>Email Address</th>
          <th scope='col'>Address</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((item, index) => {
          return (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{item.username}</td>
              <td>{item.mobile}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td
                onClick={() => handleClick(item._id)}
                style={{ color: "red", fontSize: "18px", cursor: "pointer" }}>
                <ion-icon name='trash-outline'></ion-icon>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableList;
