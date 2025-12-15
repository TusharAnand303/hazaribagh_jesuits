import React from "react";
import Breadcrumb from "../components/Breadcrumb";

const Legacy = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Legacy", path: "about/legacy" },
  ];

  return (
    <div className="min-h-screen bg-cream text-navy">
      {/* PAGE HEADER */}
      <header className="p-6 mt-24 sm:ml-24">
        <h1 className="sm:text-4xl text-2xl font-bold">
          Legacy
        </h1>
      </header>

      <Breadcrumb items={breadcrumbItems} />

      <main className="container mx-auto px-6 py-10">
        <div className="bg-white p-8 rounded-xl shadow-lg text-gray-800 text-center">

          <p className="text-lg font-medium text-gray-600">
            No data Added Yet.
          </p>

        </div>
      </main>
    </div>
  );
};

export default Legacy;