import React, { useState, useEffect } from "react";
import { FaDollarSign } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 7;

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const [funds, setFunds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch donations from backend
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await axiosSecure.get("/funds");
        setFunds(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchFunds();
  }, [axiosSecure]);

  // ✅ Pagination setup
  const totalPages = Math.ceil(funds.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFunds = funds.slice(startIndex, endIndex);

  // ✅ Calculate total funds
  const totalFunds = funds.reduce((sum, f) => sum + f.amount, 0);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-sm mx-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Funding Records</h1>
        <Link
          to="/dashboard/fundingPage/giveFund"
          className="btn btn-primary flex items-center gap-2"
        >
          <FaDollarSign /> Give Fund
        </Link>
      </div>

      {/* ✅ Show total funds donated */}
      <div className="mb-4 text-lg font-semibold">
        Total Funds: ${(totalFunds / 100).toFixed(2)}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Fund Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentFunds.map((fund, index) => (
              <tr key={fund._id}>
                <td>{startIndex + index + 1}</td>
                <td>{fund.name}</td>
                <td>{fund.email}</td>
                <td>${(fund.amount / 100).toFixed(2)}</td>{" "}
                {/* ✅ cents → USD */}
                <td>{new Date(fund.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="btn btn-sm btn-outline flex items-center gap-1"
        >
          <BsArrowLeft /> Prev
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="btn btn-sm btn-outline flex items-center gap-1"
        >
          Next <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FundingPage;
