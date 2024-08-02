import React from "react";

function HomePage() {
  return (
    <div>
      <h1 className="bg-blue-100 text-5xl font-bold text-c1 border-b-4 lg:text-4xl mb-6 text-center">
        {" "}
        wordscape{" "}
      </h1>
      <h3 className="mb-5 antialiased text-title font-archivo font-thick underline-offset-8 text-center">
        Third Heading
      </h3>
      <div>
        <p className="mb-5 text-4xl font-thick text-center underline-offset-8 bg-slate-500 p-5">
          {" "}
          Hello{" "}
        </p>
      </div>
      <p className="capitalize text-right">capitalized</p>
      <p className="text-xl uppercase text-center">uppercase letters</p>
      <p className="normal-case pl-4">Normal Case</p>
      <p className="truncate">
        So many words gibberish words random stuff random words so that it will
        truncate
      </p>
      <p className="py-6 bg-blue-600 text-center text-xl"> Hello </p>
      <p> Margin Testing </p>
      <p className="mb-2 top-[400px] capitalize mx-5 mb-2"> World </p>
      <div className="whitespace-nowrap w-4">
        <p className="text-center text-4xl pb-5 mx-5">Middle Text</p>
      </div>
    </div>
  );
}

export default HomePage;
