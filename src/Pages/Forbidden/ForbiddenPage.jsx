import React from "react";
import { FaLock } from "react-icons/fa";

const ForbiddenPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 bg-white rounded-2xl shadow-lg">
        <FaLock className="mx-auto text-6xl text-red-500 mb-6" />
        <h1 className="text-5xl font-bold mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-6">Access Forbidden</h2>
        <p className="text-gray-600 mb-8">
          You do not have permission to access this page.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
