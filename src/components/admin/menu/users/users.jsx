import React, { useEffect, useState } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "../../../axiosInstance";

function Users() {
  const [editingData, setEditingData] = useState(null);
  const [userDataState, setUserDataState] = useState([]);

  function getUsers() {
    axios
      .get("/users")
      .then((response) => {
        setUserDataState(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (e, data) => {
    e.preventDefault();
    const updatedData = userDataState.map((item) => {
      if (item.userId === data.userId) {
        return {
          ...item,
          username: e.target.elements.username.value,
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
          status: e.target.elements.status.checked,
        };
      }
      return item;
    });
    setUserDataState(updatedData);
    setEditingData(null);
    console.log("Data saved successfully!");
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = parseFloat(e.target.elements.password.value);
    const email = e.target.elements.email.value;
    // const status = e.target.elements.status.checked;
    axios
      .post("/users", {
        username,
        password,
        email,
      })
      .then((response) => {
        setUserDataState((prevData) => [...prevData, response.data]);
        console.log("Paper added successfully!");
        document.getElementById("my_modal_3").close();
        return true;
      })
      .then((status) => {
        if (status) getUsers();
      })
      .catch((error) => {
        console.error("Error adding paper:", error);
      });
  };

  return (
    <div className="drawer font-archivo">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn mx-1 my-1 drawer-button mt-8 ml-5"
        >
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
            alt="menu--v1"
          />
        </label>
        <div className="p-7 text-zinc-800">
          <h1 className="text-center mx-auto text-5xl text-archivo">Staffs</h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">User ID</th>
                  <th className="w-[100px]">Username</th>
                  <th className="w-[80px]">Email</th>
                  <th className="w-[80px]">Password</th>
                  <th className="w-[80px]">Status</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userDataState.map((row) => (
                  <tr key={row.userId}>
                    <td className="text-wrap">{row.userId}</td>
                    <td className="text-wrap">
                      {editingData && editingData.userId === row.userId ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="username"
                            className="input input-bordered"
                            defaultValue={row.username}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.username}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData && editingData.userId === row.userId ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="email"
                            name="email"
                            className="input input-bordered"
                            defaultValue={row.email}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.email}</span>
                      )}
                    </td>
                    <td>******</td>
                    <td className="text-wrap">
                      {/* {row.status ? "Active" : "Inactive"} */}
                      Active
                    </td>
                    <td>
                      {editingData && editingData.userId === row.userId ? (
                        <button className="btn btn-neutral" type="submit">
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-neutral"
                          onClick={() => setEditingData(row)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br></br>
            <button
              className="btn mx-[45%] text-white bg-zinc-800"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Staffs
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">Add Users</h3>
                <p className="py-4">
                  <form onSubmit={handleAddUser}>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <button className="btn mt-5 btn-ghost mx-[115px]">
                      Add
                    </button>
                  </form>
                </p>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default Users;
