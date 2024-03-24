import React from "react";

function HomePage() {
  return (
    <div>
      <h1 className="bg-blue-100 text-5xl font-bold text-c1 border-b-4 lg:text-4xl mb-6">
        {" "}
        wordscape{" "}
      </h1>
      <h3 className="text-title mb-5">
            Third Heading
        </h3>
      <div className="md:flex h-4 w-full">
        <p className="text-base"> Hello </p>
      </div>
      <p className="mb-5 top-[400px]"> World </p>
    </div>
  );
}

export default HomePage;
