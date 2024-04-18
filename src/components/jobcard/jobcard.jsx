import React, { useRef } from "react";
import { useState } from "react";
import "./jobcard.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const options = {
  serviceRequired: [
    { value: "pre-press", label: "Pre-press" },
    { value: "press", label: "Press" },
    { value: "post-press", label: "Post-press" },
  ],
  deliveryOptions: [
    { value: "collect-1", label: "To be collected" },
    { value: "collect-2", label: "To be sent to" },
  ],
  prePress: [
    { value: "opt-1", label: "PS/PDF" },
    { value: "opt-2", label: "Original Document File" },
  ],
  materialReceived: [
    { value: "service-1", label: "Dummy" },
    { value: "service-2", label: "CD/DVD" },
    { value: "service-3", label: "Flash-drive" },
    { value: "service-4", label: "E-mail" },
  ],
  flapSize: [
    { value: "imposition-1", label: "2" },
    { value: "imposition-2", label: "4" },
    { value: "imposition-3", label: "6" },
    { value: "imposition-4", label: "8" },
    { value: "imposition-5", label: "12" },
    { value: "imposition-6", label: "16" },
  ],
};

export default function JobCard() {
  const componentRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);

  const captureComponent = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "jobCardScreenshot.png"; // Preferred filename for download
      link.click();
    });
  };

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      // Create a FormData object to send the image file to the server
      const formData = new FormData();
      formData.append("image", file);

      // Send the image to the server using Axios
      const apiUrl = "http://localhost:8081/jobCard"; // Replace with your API endpoint for image upload

      axios
        .post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Avatar image updated successfully:", response.data);

          // Set the uploadedImage state with the new avatar image URL
          // setUploadedImage(response.data.avatarImageUrl);
        })
        .catch((error) => {
          console.error("Error uploading avatar image:", error);
          // Optionally, you can show an error message to the user.
        });
    }
  };

  return (
    <div className="screenshot-main" ref={componentRef}>
      <div className="job-container">
        <div className="hero ml-[190px]">
          <h1>Job Card</h1>
        </div>
        <div className="job-f-container">
          <div className="left-side">
            <section className="container mb-20px text-sm">
              <form action="" className="form text-[11px]">
                <label htmlFor="fullName">
                  <b>Order </b>Date / <b>Time</b>{" "}
                </label>
                <input
                  type="date"
                  id="order-date"
                  name="order-date"
                  placeholder="Date"
                />
                <label htmlFor="fullName">
                  <b>Deadline</b>
                </label>
                <input
                  type="date"
                  id="daedline-date"
                  name="deadline-date"
                  placeholder="Date"
                />

                <label htmlFor="email">
                  <b>Job</b> Title
                </label>
                <input
                  type="text"
                  id="job-title"
                  name="jobtitle"
                  placeholder="Job Title"
                />

                <label htmlFor="streetAddress">Company</label>
                <input
                  className="text"
                  type="text"
                  id="streetAddress"
                  name="company-name"
                  placeholder="Street Address"
                />

                <label htmlFor="aptNumber">
                  <b>Contact</b> Person
                </label>
                <input
                  className="text"
                  type="text"
                  id="aptNumber"
                  name="contact-person"
                  placeholder="Contact Person"
                />

                <label htmlFor="firstOption">
                  <b>Service </b>Required
                </label>
                <select id="firstOption" name="firstOption">
                  {options.serviceRequired.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <label htmlFor="deliveryOption">
                  <b>Delivery</b>
                </label>
                <select id="deliveryOption" name="deliveryOption">
                  {options.deliveryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <br />
                <p className="ita">If to be sent to</p>
                <label htmlFor="company">
                  <b>Company</b>
                </label>
                <input
                  className="text"
                  type="text"
                  id="company"
                  name="company-name"
                  placeholder="Company"
                />
                <label htmlFor="venue">
                  <b>Venue</b>
                </label>
                <input
                  className="text"
                  type="text"
                  id="venue"
                  name="venue-name"
                  placeholder="Venue"
                />
                <label htmlFor="contactName">
                  <b>Contact Person</b> Name
                </label>
                <input
                  className="text"
                  type="text"
                  id="contactName"
                  name="contact-name"
                  placeholder="Contact Person Name"
                />
              </form>
              <br></br>
              <br></br>
              <h2 className="text-4xl mr-9">
                <b>Pre-press</b> Unit
              </h2>
              <section className="container">
                <form action="" className="form">
                  <label htmlFor="pre-press">
                    <b>Pre-press</b> Unit
                  </label>
                  <select id="pre-press1">
                    {options.prePress.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="materialReceived">
                    <b>Material</b> Received
                  </label>
                  <select id="materialReceived">
                    {options.materialReceived.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="flapSize">
                    <b>Flap</b> Size
                  </label>
                  <select id="flapSize">
                    {options.flapSize.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="ManualflapSize">
                    <b>Manual</b> Flap Size
                  </label>
                  <input
                    type="text"
                    id="ManualflapSize"
                    name="ManualflapSize"
                    placeholder="Other"
                  />

                  <input
                    type="text"
                    id="paperSize"
                    name="paperSize"
                    placeholder="Paper Size"
                  />
                  <input
                    type="text"
                    id="gutterSize"
                    name="gutterSize"
                    placeholder="Gutter Size"
                  />
                  <input
                    type="text"
                    id="gripSize"
                    name="gripSize"
                    placeholder="Gripper Size"
                  />
                  <input
                    type="text"
                    id="coverPaperSize"
                    name="coverPaperSize"
                    placeholder="Cover Paper Size"
                  />
                  <input
                    type="text"
                    id="innerPaperSize"
                    name="innerPaperSize"
                    placeholder="Inner Paper Size"
                  />

                  <label htmlFor="folderName" />
                  <p>
                    <b>Folder</b> Name
                  </p>
                  <input
                    type="text"
                    id="folderName"
                    name="folderName"
                    placeholder="Folder Name"
                  />
                  <br></br>

                  <label htmlFor="plateProcess" />
                  <p>
                    <b>Plate</b> Process
                  </p>
                  <input
                    type="text"
                    id="plateProcess"
                    name="plateProcess"
                    placeholder="Plate Process"
                  />
                  <br></br>

                  <label htmlFor="plateScreentype" />
                  <p>
                    <b>Plate</b> Screen Type
                  </p>
                  <input
                    type="text"
                    id="plateScreentype"
                    name="plateScreentype"
                    placeholder="Plate Screen Type"
                  />
                </form>

                <label htmlFor="plateDamage">
                  <b>
                    <h2 className="s-1">
                      <b>Plate</b> Damage
                    </h2>
                  </b>
                </label>
                <br></br>
                <input
                  type="radio"
                  id="plateDamageCTP"
                  name="plateDamage"
                  value="CTP"
                />
                <label htmlFor="plateDamageCTP"> On CTP</label>
                <br></br>
                <input
                  type="radio"
                  id="plateDamagePress"
                  name="plateDamage"
                  value="Press"
                />
                <label htmlFor="plateDamagePress" className="mb-20">
                  {" "}
                  On Press
                </label>

                <label htmlFor="plate-remake">
                  <input
                    type="text"
                    id="plate-remake"
                    placeholder="Plate Remake"
                  ></input>
                </label>
              </section>

              <br></br>
              <table className="paper-table">
                <tbody>
                  <tr>
                    <th>Size</th>
                    <th>1 color</th>
                    <th>2 color</th>
                    <th>3 color</th>
                    <th>4 color</th>
                    <th>Special</th>
                    <th>Total</th>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text"></input>
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text"></input>
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text"></input>
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
            <h3>Paper Unit</h3>
            <section className="container">
              <table className="paper-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Full Sheet Size</th>
                    <th>Weight</th>
                    <th>Paper type</th>
                    <th>Total Sheets</th>
                    <th>Wastage</th>
                    <th>Total Cut Sheet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cover Paper</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Inner Paper</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Other Paper</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              <table className="paper-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Cut Sheet Size</th>
                    <th>Wastage</th>
                    <th>Total Cut Sheet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cover Paper</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Inner Paper</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>

                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Other Paper</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="r-form-1 mt-20">
                <label htmlFor="type">Paper Ready By</label>

                <input
                  type="text"
                  id="type"
                  name="type"
                  placeholder="Ready by"
                />

                <label htmlFor="type">Date</label>
                <input type="date" id="type" name="type" placeholder="Type" />

                <label htmlFor="time">Time</label>
                <input type="text" id="type" name="type" placeholder="Time" />
              </div>
              <div className="r-form"></div>
              <form></form>
              <br></br>
            </section>
          </div>
          <div className="right-side">
            <section className="right-container">
              <div className="r-form">
                <label htmlFor="type">Type</label>

                <input type="text" id="type" name="type" placeholder="Type" />

                <label htmlFor="size" className="size-l">
                  Size
                </label>

                <input type="text" id="size" name="size" placeholder="Size" />
              </div>
              <div className="r-container">
                <label htmlFor="number-page">No. of Page</label>

                <input
                  type="number"
                  id="number-page"
                  name="number-page"
                  placeholder="Number of Pages"
                />
              </div>

              <label>
                <input type="radio" name="side" value="single" /> Single Side
              </label>
              <label>
                <input type="radio" name="side" value="both" /> Both Sides
              </label>
            </section>

            <div>
              <section className="right-container">
                <div className="r-form">
                  <label htmlFor="type">Print Run</label>

                  <input type="text" id="type" name="type" placeholder="Type" />
                </div>
              </section>

              <section className="container-1">
                <table className="paper-table">
                  <tbody>
                    <thead>
                      <tr>
                        <th> </th>
                        <th>Type</th>
                        <th>gsm</th>
                        <th>Print Color</th>
                        <th>Lamination</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Paper</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                      <tr>
                        <td>Cover Paper</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                      <tr>
                        <td>Inner Paper</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                      <tr>
                        <td>Other Paper</td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                        <td>
                          <input type="text" />
                        </td>
                      </tr>
                    </tbody>
                  </tbody>
                </table>
              </section>
              <section className="b-container">
                <h2 className="s-1">
                  <b>Bindery</b>
                </h2>

                <div className="bindery-container-1">
                  <label>
                    <input type="radio" name="side" value="centerStitch" />{" "}
                    <b>Center </b>
                    Stitch
                  </label>

                  <label>
                    <input type="radio" name="side" value="perfect" />
                    <b>Perfect</b>
                  </label>

                  <label>
                    <input type="radio" name="side" value="juju" /> <b>Juju</b>
                  </label>

                  <label>
                    <input type="radio" name="side" value="metalFoiling" />{" "}
                    <b>Metal </b>
                    Foiling
                  </label>
                </div>
                <div className="bindery-container-1">
                  <label>
                    <input type="radio" name="side" value="metalFoiling" />{" "}
                    Diecuting
                  </label>
                  <br></br>
                  <label>
                    <input type="radio" name="side" value="centerStitch" />{" "}
                    Perforation
                  </label>

                  <label>
                    <input type="radio" name="side" value="padding" /> Padding
                  </label>

                  <label>
                    <input type="radio" name="side" value="padding" /> Spot
                    Varnishing
                  </label>
                </div>

                <div className="v-form">
                  <label htmlFor="type">
                    <b>Filled In</b> By
                  </label>

                  <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Filled In By"
                  />

                  <label htmlFor="type">
                    <b>Approved</b> By
                  </label>

                  <input
                    type="text"
                    id="type"
                    name="type"
                    placeholder="Approved By"
                  />
                </div>
              </section>
              <div className="r-form">
                <h3>Press Unit</h3>

                <input
                  type="text"
                  id="type"
                  name="type"
                  placeholder="Total Set"
                />
              </div>

              <div className="bindery-container-last"></div>
              <input type="text" id="type" name="type" placeholder="Forma" />

              <input
                type="text"
                id="type"
                name="type"
                placeholder="Work & Turn"
              />

              <table className="paper-table">
                <thead>
                  <tr>
                    <th>Paper Type</th>
                    <th>Size</th>
                    <th>Signature</th>
                    <th>Impressions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <div>
                        <span>Ordered:</span>
                        <input type="text" />
                      </div>
                      <div>
                        <span>Produced:</span>
                        <input type="text" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <button className="submit-btn" type="submit" onClick={handleDownload}>
        Submit
      </button> */}
        <button className="submit-btn" type="submit" onClick={captureComponent}>
          Generate Screenshot
        </button>
        <div className="upload-a">
          <h3>Upload Screenshot to the Database</h3>
        </div>
        <label htmlFor="upload-input">
          <input
            type="file"
            accept="image/*"
            onChange={submitUpload}
            className="submit-btn"
            id="upload-input"
            placeholder="     "
          />
        </label>
      </div>
    </div>
  );
}
