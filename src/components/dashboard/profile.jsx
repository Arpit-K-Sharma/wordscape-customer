import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import Menu from "./menu";

function Profile() {
  const userId = localStorage.getItem('id')
  const [customerData, setCustomerData] = useState({
    customerId: null,
    fullName: "",
    address: "",
    email: "",
    companyName: "",
    status: false,
  });
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/customers/${userId}`)
      .then((response) => {
        console.log(response.data);
        setCustomerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    if (editable == true) {
      console.log("Changes saved!", customerData);
      axios
        .put(
          `http://localhost:8081/customers/${customerData.customerId}`,
          customerData
        )
        .then((response) => {
          console.log("Customer data updated successfully:", response.data);
          setEditable(false);
        })
        .catch((error) => {
          console.error("Error updating customer data:", error);
        });
    } else if (editable == false) {
      setEditable(true);
    }
  };

  return (
    <>
      <Menu />
      <div className="container mx-auto px-4 font-archivo">
        <h2 className="text-2xl flex justify-center mt-2 font-archivo">
          Your Profile
        </h2>
        <div className="flex flex-wrap justify-center mt-14">
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 sm:p-10">
            <div className="avatar font-archivo flex justify-center items-center">
              <div className="w-30 rounded-full mb-5 mt-5">
                <Avatar
                  name={customerData.fullName}
                  size="140"
                  round={true}
                  color="black"
                />
              </div>
            </div>
            <div className="max-sm:p-10">
              <div className="mt-4">
                <label htmlFor="fullName" className="block mb-2">
                  Full Name:
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={customerData.fullName}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-1 mb-6 mr-5"
                  disabled={!editable}
                />
                <label htmlFor="address" className="block mb-2">
                  Address:
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={customerData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-3 mb-6"
                  disabled={!editable}
                />

                <label htmlFor="email" className="block mb-2">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-3 mb-6"
                  disabled={!editable}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="companyName" className="block mb-2">
                  Company Name:
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={customerData.companyName}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-md mt-3 mb-6"
                  disabled={!editable}
                />
                <button
                  onClick={handleSaveChanges}
                  className="btn btn-primar text-white"
                >
                  {editable ? "Save Changes" : "Edit"}
                </button>
              </div>

              {/* <div className="mt-4 flex-row">
                <label htmlFor="status" className="block mb-2">
                  Status:
                </label>
                <input
                  id="status"
                  type="checkbox"
                  name="status"
                  checked={customerData.status}
                  onChange={handleChange}
                  className="w-6 h-6 ml-1"
                  disabled={!editable}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
