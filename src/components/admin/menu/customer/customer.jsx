import React from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";

const customerData = [
  {
    s_n: 1,
    name: "John Doe",
    address: "123 Main Street, Anytown, CA 12345",
    email: "john.doe@example.com",
    password: "hashed_password", // Assuming password is stored securely hashed
    phone_number: "(555) 555-1234",
    status: true,
  },
  {
    s_n: 2,
    name: "Jane Smith",
    address: "456 Elm Street, Anytown, CA 98765",
    email: "jane.smith@example.com",
    password: "hashed_password",
    phone_number: "(555) 555-5678",
    status: false,
  },
];

function AdminCustomer() {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn mx-1 my-1 drawer-button">
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
            alt="menu--v1"
          />
        </label>
        <div className="p-7 text-slate-200">
          <h1 className="text-center mx-auto text-5xl text-archivo">
            Customers
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-200">
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer) => (
                  <tr key={customer.s_n}>
                    <td>{customer.s_n}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.email}</td>
                    <td>{"*".repeat(customer.password.length)}</td>{" "}
                    <td>{customer.phone_number}</td>
                    <td className="text-wrap">{customer.status ? "Active" : "Inactive"}</td>
                    <td>
                        <button className="btn btn-ghost">
                            Edit
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AdminDrawer/>
    </div>
  );
}

export default AdminCustomer;
