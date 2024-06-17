import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import Avatar from "react-avatar";
import Menu from "./menu";

function Profile() {
  const userId = localStorage.getItem("id");
  const [customerData, setCustomerData] = useState({
    customerId: null,
    fullName: "",
    address: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    status: false,
  });
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    axios
      .get(`/customers/${userId}`)
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
    if (editable) {
      console.log("Changes saved!", customerData);
      axios
        .put(
          `/customers/${customerData.customerId}`,
          customerData
        )
        .then((response) => {
          console.log("Customer data updated successfully:", response.data);
          setEditable(false);
        })
        .catch((error) => {
          console.error("Error updating customer data:", error);
        });
    } else {
      setEditable(true);
    }
  };

  return (
    <>
      <Menu />
      <header className="">
        <section>
          <div className="grid h-screen grid-cols-1 md:grid-cols-2 lg:mt-[-6%]">
            {/* First column for profile details */}

            {/* Second column for large avatar, hidden on small screens */}
            <div className="hidden md:flex w-full justify-center items-center">
              <div className="w-30 rounded-full mb-5 mt-5">
                <Avatar
                  name={customerData.fullName}
                  size="460"
                  round={true}
                  color="black"
                />
              </div>
            </div>
            <div className="container mx-auto px-4 font-archivo flex flex-col justify-center items-center w-full">
              <div className="lg:hidden w-30 rounded-full mb-5 mt-5 ">
                <Avatar
                  name={customerData.fullName}
                  size="120"
                  round={true}
                  color="black"
                />
              </div>
              <div className="max-sm:p-10 w-[100%] lg:pr-[10rem]">
                <h2 className="text-5xl font-semibold flex justify-center mt-2 font-archivo">
                  Your Profile
                </h2>
                <div className="mt-5 mx-auto justify-center align-middle">
                  {/* Input fields */}
                  <label htmlFor="fullName" className="block mb-2">
                    Full Name:
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={customerData.fullName}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-1 mb-6 mr-5"
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
                    className="input input-bordered w-full mt-3 mb-6"
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
                    className="input input-bordered w-full mt-3 mb-6"
                    disabled={!editable}
                  />
                  <label htmlFor="number" className="block mb-2">
                    Phone Number:
                  </label>
                  <input
                    id="number"
                    type="text" // Changed from "number" to "text"
                    name="phoneNumber"
                    value={customerData.phoneNumber}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-3 mb-6"
                    disabled={!editable}
                    maxLength="10" // Ensures the input does not exceed 10 characters
                    pattern="\d*" // Ensures only digits are entered
                    title="Phone number must be 10 digits"
                  />
                  <label htmlFor="companyName" className="block mb-2">
                    Company Name:
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={customerData.companyName}
                    onChange={handleChange}
                    className="input input-bordered w-full mt-3 mb-6"
                    disabled={!editable}
                  />
                </div>
                <div className="flex justify-center mb-6">
                  <button
                    onClick={handleSaveChanges}
                    className="btn btn-primary bg-zinc-800 hover:bg-zinc-800 text-white text-m w-full bg:bg-zinc-800 hover:bg-zinc-600"
                  >
                    {editable ? "Save Changes" : "Update"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}

export default Profile;
