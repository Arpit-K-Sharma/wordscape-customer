import React from 'react';

const FirstForm = ({
    paperTypes,
    outerPaperGSM,
    selectedThickness,
    setSelectedThickness,
}) => {
  return (
    <div className="ml-[31%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <div className="label text-center content-center">
          <span className="label-text">Choose your Paper Size</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {paperTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <div className="label">
          <span className="label-text-alt">Inner Paper Type</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xl mt-5"
          value={selectedThickness}
          onChange={(e) => setSelectedThickness(e.target.value)}
        >
          <option disabled defaultValue>
            Pick one
          </option>
          {outerPaperGSM.map((gsm) => (
            <option key={gsm.id} value={gsm.id}>
              {gsm.thickness} GSM
            </option>
          ))}
        </select>
        <div className="label">
          <span className="label-text-alt">Inner Paper Thickness</span>
        </div>
        <button className="btn btn-primary mt-5">Next</button>
      </label>
    </div>
  );
};

export default FirstForm;