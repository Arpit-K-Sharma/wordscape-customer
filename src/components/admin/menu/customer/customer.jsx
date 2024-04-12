import React from "react";
import { NavLink } from "react-router-dom";

const customerData = [
  {
    s_n: 1,
    name: "John Doe",
    address: "123 Main Street, Anytown, CA 12345",
    email: "john.doe@example.com",
    password: "hashed_password", // Assuming password is stored securely hashed
    phone_number: "(555) 555-1234",
    status: "Active",
  },
  {
    s_n: 2,
    name: "Jane Smith",
    address: "456 Elm Street, Anytown, CA 98765",
    email: "jane.smith@example.com",
    password: "hashed_password",
    phone_number: "(555) 555-5678",
    status: "Inactive",
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
                    {/* Avoid displaying actual password */}
                    <td>{"*".repeat(customer.password.length)}</td>{" "}
                    {/* Placeholder for password */}
                    <td>{customer.phone_number}</td>
                    <td>{customer.status}</td>
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
      <div className="drawer-side font-archivo">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-zinc-700 text-white">
          {/* Sidebar content here */}
          <li className="mt-[40px]">
            <img
              width="120"
              height="120"
              src="https://img.icons8.com/external-photo3ideastudio-solid-photo3ideastudio/64/FFFFFF/external-knot-china-photo3ideastudio-solid-photo3ideastudio.png"
              alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
              className="mx-auto my-1 mb-5"
            />
          </li>
          <li>
            <NavLink to="/admin/dashboard">
              <p className="text-xl font-light">Main Dashboard</p>
            </NavLink>
          </li>
          <br></br>
          <li>
            <NavLink to="/admin/paper">
              <p className="text-xl mb-3 font-light">Paper</p>
            </NavLink>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Binding</p>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Lamination</p>
          </li>
          <li>
            <NavLink to="/admin/customer">
              <p className="text-xl mb-3 font-light">Customer</p>
            </NavLink>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Order</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminCustomer;
