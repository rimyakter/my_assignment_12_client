import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import ReactPaginate from "react-paginate"; // <-- import
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function MyDonationRequests() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4; // number of rows per page

  // Fetch all requests
  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationRequests");
      return res.data || [];
    },
  });

  const myRequests = requests.filter((r) => r.requesterEmail === user?.email);
  const visible = myRequests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  // Pagination logic
  const pageCount = Math.ceil(visible.length / itemsPerPage);
  const paginatedRequests = visible.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/donationRequests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["donationRequests"]);
      Swal.fire("Deleted!", "Your request has been removed.", "success");
    },
    onError: () => Swal.fire("Error", "Failed to delete request", "error"),
  });

  // Status update mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/donationRequests/${id}/status/donor`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["donationRequests"]);
      Swal.fire("Updated!", "Status changed successfully", "success");
    },
    onError: () => Swal.fire("Error", "Failed to update status", "error"),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">My Donation Requests</h2>
        <select
          className="select select-bordered select-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-error">Error: {error.message}</p>
      ) : visible.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.map((r) => (
                  <tr key={r._id}>
                    <td>{r.recipientName}</td>
                    <td>
                      {r.recipientDistrict}, {r.recipientUpazila}
                    </td>
                    <td>{r.donationDate || "-"}</td>
                    <td>{r.donationTime || "-"}</td>
                    <td>
                      <span className="badge badge-outline badge-primary">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          r.status === "pending"
                            ? "badge-warning"
                            : r.status === "inprogress"
                            ? "badge-info"
                            : r.status === "done"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.status === "inprogress" ? (
                        <>
                          <p className="font-medium">{r.donorName}</p>
                          <p className="text-xs text-gray-500">
                            {r.donorEmail}
                          </p>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="flex gap-2 justify-center">
                      {r.status === "inprogress" &&
                        r.donorEmail === user?.email && (
                          <>
                            <button
                              onClick={() => handleStatusChange(r._id, "done")}
                              className="btn btn-xs btn-success tooltip"
                              data-tip="Mark as Done"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(r._id, "canceled")
                              }
                              className="btn btn-xs btn-warning tooltip"
                              data-tip="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      <button
                        onClick={() =>
                          navigate(`/detailsDonationRequest/${r._id}`)
                        }
                        className="btn btn-xs btn-info tooltip"
                        data-tip="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/updateDonationRequest/${r._id}`)
                        }
                        className="btn btn-xs btn-primary tooltip"
                        data-tip="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="btn btn-xs btn-error tooltip"
                        data-tip="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-4">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination flex gap-2"}
                pageClassName={"page-item"}
                pageLinkClassName={"btn btn-xs btn-outline btn-primary text-sm"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                previousLinkClassName={"btn btn-xs btn-outline"}
                nextLinkClassName={"btn btn-xs btn-outline"}
                activeLinkClassName={"btn btn-xs btn-primary"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
