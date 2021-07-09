import React, { useState, useEffect } from "react";

export default function App() {
  const getUsersUrl = "https://gorest.co.in/public-api/users";
  const deleteUserUrl = "https://gorest.co.in/public-api/users/";

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(getUsersUrl)
      .then((resp) => resp.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  const getDate = (timestamp) => {
    return new Date(timestamp).toDateString();
  };

  const deleteEntry = (id) => {
    let url = deleteUserUrl + "/" + id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }).then((resp) => {
      console.log("deleted; ", resp);
    });
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Active</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((entry, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{entry.id}</td>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.gender}</td>
                <td>{entry.active}</td>
                <td>{getDate(entry.created_at)}</td>
                <td>
                  <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
