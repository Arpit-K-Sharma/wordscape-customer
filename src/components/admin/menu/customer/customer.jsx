import React, { useEffect, useState } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "../../../axiosInstance";
import { FaTrash } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";

function Customers() {
  const [editingData, setEditingData] = useState(null);
  const [customerDataState, setCustomerDataState] = useState([]);
  const [deleteOrder, setDeleteOrder] = useState();
  const [undoOrder, setUndoOrder] = useState();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState();

  function getCustomers() {
    axios
      .get(`/customers?pageNumber=${page}`)
      .then((response) => {
        setCustomerDataState(response.data.response);
        console.log(response.data.response);
        const result = Math.ceil(response.data.totalElements / 10);
        console.log(result);
        setPageLimit(result - 1);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getCustomers();
  }, [page]);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const address = e.target.elements.address.value;
    const email = e.target.elements.email.value;
    const companyName = e.target.elements.companyName.value;
    const status = e.target.elements.status.checked;

    axios
      .post("/customers", {
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

  const handleCancel = (id) => {
    document.getElementById("my_modals_2").showModal();
    setDeleteOrder(id);
  };

  const handleDelete = () => {
    axios
      .put(`http://localhost:8081/customers/deactivate/${deleteOrder}`)
      .then((response) => {
        document.getElementById("my_modals_2").close();
        console.log(response.data);
        getCustomers(); // Refresh the customer list after deletion
      })
      .catch((error) => {
        console.error("Error deactivating customer:", error);
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
                </tr>
              </thead>
              <tbody>
                {customerDataState.map((row) => (
                  <tr key={row.customerId}>
                    <td className="text-wrap">{row.customerId}</td>
                    <td className="text-wrap">
                      <span>{row.fullName}</span>
                    </td>
                    <td className="text-wrap">
                      <span>{row.address}</span>
                    </td>
                    <td className="text-wrap">
                      <span>{row.email}</span>
                    </td>
                    <td className="text-wrap">
                      <span>{row.companyName}</span>
                    </td>
                    <td className="text-wrap">
                      {row.status === true ? (
                        <button
                          className="text-indigo-500 hover:text-[red] mt-[10px]"
                          onClick={() => handleCancel(row.customerId)}
                        >
                          <FaTrash size={20} />
                        </button>
                      ) : (
                        "Inactive"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="join flex  mt-[20px] justify-center">
              <button
                className="join-item btn bg-white"
                onClick={(e) => {
                  if (page > 0) {
                    setPage(page - 1);
                  }
                }}
              >
                «
              </button>
              <button className="join-item btn bg-white">
                Page {page + 1}
              </button>
              <button
                className="join-item btn bg-white"
                onClick={(e) => {
                  if (pageLimit > page) {
                    setPage(page + 1);
                  }
                }}
              >
                »
              </button>
            </div>
            <br></br>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
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

            <dialog id="my_modals_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Alert!</h3>
                <p className="py-4">
                  Do you really want to delete this customer?
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                    <button
                      className="btn ml-[20px] hover:bg-[red] hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                      }}
                    >
                      Yes
                    </button>
                  </form>
                </div>
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
