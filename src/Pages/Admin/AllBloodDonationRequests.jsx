import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

export default function AllBloodDonationRequests() {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role, loading: roleLoading } = useUserRole();

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // ✅ Fetch all donation requests
  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allDonationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationRequests");
      return res.data || [];
    },
  });

  // ✅ Delete mutation (admin only)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donationRequests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allDonationRequests"]);
    },
  });

  // ✅ Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const url = `/donationRequests/${id}/status/admin`;
      await axiosSecure.patch(url, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allDonationRequests"]);
    },
  });

  // ✅ SweetAlert for delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "The request has been deleted.", "success");
          },
          onError: () => {
            Swal.fire("Error!", "Failed to delete the request.", "error");
          },
        });
      }
    });
  };

  // ✅ Apply filter
  const filtered =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  // ✅ Pagination
  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filtered.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-sm mx-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">All Blood Donation Requests</h2>
        <select
          className="select select-bordered select-sm"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(0); // reset to first page when filter changes
          }}
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
      ) : filtered.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Requester</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((r) => (
                  <tr key={r._id}>
                    <td>{r.recipientName}</td>
                    <td>
                      {r.requesterName} <br />
                      <span className="text-xs">{r.requesterEmail}</span>
                    </td>
                    <td>
                      {r.recipientDistrict}, {r.recipientUpazila}
                    </td>
                    <td>{r.donationDate || "-"}</td>
                    <td>{r.donationTime || "-"}</td>
                    <td>{r.bloodGroup}</td>
                    <td>{r.status}</td>
                    <td>
                      {r.status === "inprogress" ? (
                        <>
                          {r.donorName} <br />
                          <span className="text-xs">{r.donorEmail}</span>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="flex flex-wrap gap-1">
                      {/* View button for all roles */}
                      <button
                        className="btn btn-xs"
                        onClick={() =>
                          navigate(`/detailsDonationRequest/${r._id}`)
                        }
                      >
                        View
                      </button>

                      {/* Admin-only actions */}
                      {role === "admin" && (
                        <>
                          <button
                            type="button"
                            className="btn btn-xs"
                            onClick={() =>
                              navigate(`/updateDonationRequest/${r._id}`, {
                                state: { from: location.pathname },
                              })
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => handleDelete(r._id)}
                          >
                            Delete
                          </button>

                          {r.status === "inprogress" && (
                            <>
                              <button
                                className="btn btn-xs btn-success"
                                onClick={() =>
                                  updateStatusMutation.mutate(
                                    { id: r._id, status: "done" },
                                    {
                                      onSuccess: () => {
                                        Swal.fire(
                                          "Updated!",
                                          "The request status is now Done.",
                                          "success"
                                        );
                                      },
                                      onError: () => {
                                        Swal.fire(
                                          "Error!",
                                          "Failed to update status.",
                                          "error"
                                        );
                                      },
                                    }
                                  )
                                }
                              >
                                Done
                              </button>
                              <button
                                className="btn btn-xs btn-warning"
                                onClick={() =>
                                  updateStatusMutation.mutate(
                                    { id: r._id, status: "canceled" },
                                    {
                                      onSuccess: () => {
                                        Swal.fire(
                                          "Updated!",
                                          "The request status is now Canceled.",
                                          "success"
                                        );
                                      },
                                      onError: () => {
                                        Swal.fire(
                                          "Error!",
                                          "Failed to update status.",
                                          "error"
                                        );
                                      },
                                    }
                                  )
                                }
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </>
                      )}

                      {/* Volunteer-only action */}
                      {role === "volunteer" && r.status === "pending" && (
                        <button
                          className="btn btn-xs btn-primary"
                          onClick={() => {
                            Swal.fire({
                              title: "Mark this request as In Progress?",
                              icon: "question",
                              showCancelButton: true,
                              confirmButtonText: "Yes, mark it",
                              cancelButtonText: "Cancel",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                updateStatusMutation.mutate(
                                  { id: r._id, status: "inprogress" },
                                  {
                                    onSuccess: () => {
                                      Swal.fire(
                                        "Updated!",
                                        "The request is now In Progress.",
                                        "success"
                                      );
                                    },
                                    onError: () => {
                                      Swal.fire(
                                        "Error!",
                                        "Failed to update status.",
                                        "error"
                                      );
                                    },
                                  }
                                );
                              }
                            });
                          }}
                        >
                          Mark In Progress
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ React Paginate Component */}
          <div className="flex justify-center mt-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              containerClassName="join"
              pageClassName="join-item btn btn-sm"
              previousClassName="join-item btn btn-sm"
              nextClassName="join-item btn btn-sm"
              activeClassName="btn-active"
            />
          </div>
        </>
      )}
    </div>
  );
}
