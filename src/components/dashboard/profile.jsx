import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from 'react-avatar';
import Menu from './menu';

function Profile() {
    const [customerData, setCustomerData] = useState({
        customerId: null,
        fullName: '',
        address: '',
        email: '',
        companyName: '',
        status: false
    });
    const [editable, setEditable] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8081/customers/1')
            .then(response => {
                console.log(response.data)
                setCustomerData(response.data);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSaveChanges = () => {
        if (editable == true) {
            console.log('Changes saved!', customerData);
            axios.put(`http://localhost:8081/customers/${customerData.customerId}`, customerData)
                .then(response => {
                    console.log('Customer data updated successfully:', response.data);
                    setEditable(false)
                })
                .catch(error => {
                    console.error('Error updating customer data:', error);
                });
        } else if (editable == false) {
            setEditable(true);
        }

    };

    return (
        <>
            <Menu />
            <div className='text-xl font-archivo'>
                <h2 className='text-6xl flex justify-center mt-[20px] font-archivo'>Your Profile</h2>
                <div className='flex justify-center mt-[70px]'>
                    <div className="avatar font-archivo">
                        <div className="w-30 rounded-full ring">
                            <Avatar name={customerData.fullName} size="250" round={true} color='black' />
                        </div>
                    </div>

                    <div className='grid '>
                        <div className='ml-[60px]'>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={customerData.fullName}
                                onChange={handleChange}
                                className="input input-bordered w-full max-w-xls mt-1"
                                disabled={!editable}
                            />
                        </div>

                        <div className='ml-[60px]'>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={customerData.address}
                                onChange={handleChange}
                                className="input input-bordered w-full max-w-xs mt-1"
                                disabled={!editable}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-[20px] ml-1'>
                    <div >
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={customerData.email}
                            onChange={handleChange}
                            className="input input-bordered w-[120%] max-w-xs mt-1 "
                            disabled={!editable}
                        />
                    </div>

                    <div className='ml-[70px]'>
                        <label>Company Name:</label>
                        <input
                            type="text"
                            name="companyName"
                            value={customerData.companyName}
                            onChange={handleChange}
                            className="input input-bordered w-full max-w-xs mt-1"
                            disabled={!editable}
                        />
                    </div>
                </div>
                <div className='flex justify-center mt-[30px] '>
                    <div className='mr-[50px] mt-[15px]'>
                        <label>Status:</label>
                        <input
                            type="checkbox"
                            name="status"
                            checked={customerData.status}
                            onChange={handleChange}
                            className='w-[25px] h-[25px] ml-1'
                            disabled={!editable}
                        />
                    </div>
                    <button onClick={handleSaveChanges} className='flex btn'>
                        {editable === false ? 'Make Changes' : (
                            <>
                                <svg className="w-5 h-5 mt-[5px] mr-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>


                </div>
            </div>
        </>
    );
}

export default Profile;
