import React from 'react';
import { useState } from 'react';
import { MdAdd } from "react-icons/md";

function Costbreakdown() {
  const [costdone, setCostdone] = useState(false);
  const [vendors, setVendors] = useState([1, 2, 3, 4, 5])

  const handleAdd1 = () => {
    setVendors(prevVendors => [...prevVendors, vendors.length + 1]);
  };
  const [vendor, setVendor] = useState([1, 2, 3, 4, 5])

  const handleAdd2 = () => {
    setVendor(prevVendors => [...prevVendors, vendor.length + 1]);
  };
  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_13").showModal()}
      >
        <a className="flex">Cost Breakdown </a>{" "}
        {costdone == true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>

      <dialog id="my_modal_13" className="modal flex h-[100%] ml-[50%]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <h3 className='font-bold text-xl'>Cost Calculation</h3>
          <div className="grid w-full gap-4">
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none  focus:border-black" placeholder="Plates" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Printing" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Paper" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Cover Paper" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Inner Paper" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Other Paper" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Lamination" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Binding" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Finishing" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400  focus:outline-none focus:border-black" placeholder="Extra Charges" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 font-bold focus:outline-none focus:border-black" placeholder="Sub Total" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Vat 13%" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 font-bold focus:outline-none focus:border-black" placeholder="Grand Total" />
            <div className='flex gap-[20px] mt-[20px]'>
              <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Prepared By" />
              <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Approved By" />
            </div>
          </div>
          <div className='border border-black h-[250px] mt-[40px] p-[20px]'>
            <div className='flex '>
              <div>
                <h2 className='font-bold'>Billing Information:</h2>
                <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Invoice Issue Date" />
                <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Invoice no." />
              </div>
              <div className='mt-[9px] ml-[20px]'>
                <div className='flex items-center mb-[15px]'>
                  <input type='radio' className="radio" />
                  <label className='text-[17px] ml-[10px]'>Required</label>
                </div>
                <div className='flex items-center mb-[15px]'>
                  <input type='radio' className="radio" />
                  <label className='text-[17px] ml-[10px]'>Approved </label>
                </div>
                <div className='flex items-center'>
                  <input type='radio' className="radio" />
                  <label className='text-[17px] ml-[10px]'>Revise needed</label>
                </div>
              </div>
            </div>
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Customer Name" />
            <input className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black" placeholder="Issue By" />
          </div>
          <div className="p-4 mt-[20px]">
            <h2 className="font-semibold mb-[10px]">Project Details:</h2>
            <div className='flex justify-between'>
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[150px]">Plate Size</th>
                      <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">Plate Type</th>
                      <th className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">Total Plate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='border border-gray-400 p-[10px]'>
                <h4 className='mb-[7px] text-sm'>CUSTOMER PROVIDED</h4>
                <div className='flex items-center mb-[10px]'>
                  <input type='radio' className="radio" />
                  <label className='text-[15px] ml-[10px]'>Plate</label>
                </div>
                <div className='flex items-center mb-[10px]'>
                  <input type='radio' className="radio" />
                  <label className='text-[15px] ml-[10px]'>Paper</label>
                </div>
                <div className='flex items-center mb-[10px]'>
                  <input type='radio' className="radio" />
                  <label className='text-[15px] ml-[10px]'>None</label>
                </div>
                <div className='flex items-center'>
                  <input type='radio' className="radio" />
                  <label className='text-[15px] ml-[10px]'>Printed material</label>
                </div>

              </div>
            </div>

          </div>
          <div className='mt-[20px]'>
            <h2 className="font-semibold mb-[10px]">Paper Used:</h2>
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[100px]"></th>
                    <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[150px]">Full Sheet Size</th>
                    <th className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">Weight</th>
                    <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">Paper Type</th>
                    <th className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">Total Sheets</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Cover Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Inner Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Other Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='mt-[20px]'>
            <h2 className="font-semibold mb-[10px]">Contract job ( out source ):</h2>
            <h3 className="font-semibold mb-[10px]">Lamination/Creasing/Juju/Metal-foiling/Diecuting/Padding/Spot varnishing</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[250px]">Vendors</th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">Details</th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[110px] text-left">Rate</th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[120px] text-left">Amount</th>
                </tr>
              </thead>
              <tbody>


                {vendors.map((vendor, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-[5px]" onClick={handleAdd1}>
              <MdAdd size={30} color="green" />
            </div>
          </div>
          <div className='mt-[5px]'>
            <h2 className="font-semibold mb-[10px]">Delivery details:</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[100px]">Slip no.</th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">Date/Time</th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[110px] text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>


                {vendor.map((vendor, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-[5px]" onClick={handleAdd2}>
              <MdAdd size={30} color="green" />
            </div>
          </div>

        </div>
      </dialog>
    </>
  )
}

export default Costbreakdown