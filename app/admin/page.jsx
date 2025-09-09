"use client"
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome 🎉</h1>
        <p className="text-gray-600 mb-6">
          This is your new <span className="font-semibold">page</span> component, styled with Tailwind CSS. 
          You can start customizing it right away.
        </p>
        <button className="px-6 py-3 rounded-xl bg-black text-white font-medium shadow-md hover:bg-gray-800 transition">
          Explore the Sidebar!
        </button>
      </div>
    </div>
  );
};

export default Page;
