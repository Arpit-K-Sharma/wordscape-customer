import React, { useEffect, useState } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "axios";

function Customers() {
  const [editingData, setEditingData] = useState(null);
  const [customerDataState, setCustomerDataState] = useState([]);

  function getCustomers() {
    axios
      .get("http://localhost:8081/customers")
      .then((response) => {
        setCustomerDataState(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getCustomers();
  }, []);

  const handleEdit = (e, data) => {
    e.preventDefault();
    const updatedData = customerDataState.map((item) => {
      if (item.customerId === data.customerId) {
        return {
          ...item,
          fullName: e.target.elements.fullName.value,
          address: e.target.elements.address.value,
          email: e.target.elements.email.value,
          companyName: e.target.elements.companyName.value,
          status: e.target.elements.status.checked,
        };
      }
      return item;
    });
    setCustomerDataState(updatedData);
    setEditingData(null);
    console.log("Data saved successfully!");
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const address = e.target.elements.address.value;
    const email = e.target.elements.email.value;
    const companyName = e.target.elements.companyName.value;
    const status = e.target.elements.status.checked;

    axios
      .post("http://localhost:8081/customers", {
        fullName,
        address,
        email,
        companyName,
        status,
      })
      .then((response) => {
        setCustomerDataState((prevData) => [...prevData, response.data]);
        console.log("Customer added successfully!");
        return true;
      })
      .then((status) => {
        if (status) getCustomers();
      })
      .catch((error) => {
        console.error("Error adding customer:", error);
      });
  };

  return (
    <div className="drawer">
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
          <h1 className="text-center mx-auto text-5xl text-archivo">
            Customers
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">Customer ID</th>
                  <th className="w-[150px]">Full Name</th>
                  <th className="w-[120px]">Address</th>
                  <th className="w-[120px]">Email</th>
                  <th className="w-[120px]">Company Name</th>
                  <th className="w-[60px]">Status</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerDataState.map((row) => (
                  <tr key={row.customerId}>
                    <td className="text-wrap">{row.customerId}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.customerId === row.customerId ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="fullName"
                            className="input input-bordered"
                            defaultValue={row.fullName}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.fullName}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.customerId === row.customerId ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="address"
                            className="input input-bordered"
                            defaultValue={row.address}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.address}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.customerId === row.customerId ? (
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
                    <td className="text-wrap">
                      {editingData &&
                      editingData.customerId === row.customerId ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="companyName"
                            className="input input-bordered"
                            defaultValue={row.companyName}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.companyName}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.customerId === row.customerId ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <select
                            name="status"
                            className="input input-bordered"
                          >
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                        </form>
                      ) : (
                        <span>{row.status ? "Active" : "Inactive"}</span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.customerId === row.customerId ? (
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

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">Add Customers</h3>
                <p className="py-4">
                  <form onSubmit={handleAddCustomer}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      name="companyName"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <select
                      name="status"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
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

export default Customers;
