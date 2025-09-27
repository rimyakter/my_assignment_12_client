import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";

export default function AllBloodDonationRequests() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { role, loading: roleLoading } = useUserRole();
  console.log(role);

  const [filter, setFilter] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

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
      setConfirmId(null);
    },
  });

  // ✅ Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      // Single endpoint for admin/volunteer
      const url = `/donationRequests/${id}/status/admin`;
      await axiosSecure.patch(url, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allDonationRequests"]);
    },
  });
  // ✅ Apply filter
  const visible =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">All Blood Donation Requests</h2>
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
              {visible.map((r) => (
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
                          className="btn btn-xs"
                          onClick={() =>
                            navigate(`/updateDonationRequest/${r._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => setConfirmId(r._id)}
                        >
                          Delete
                        </button>

                        {r.status === "inprogress" && (
                          <>
                            <button
                              className="btn btn-xs btn-success"
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  id: r._id,
                                  status: "done",
                                })
                              }
                            >
                              Done
                            </button>
                            <button
                              className="btn btn-xs btn-warning"
                              onClick={() =>
                                updateStatusMutation.mutate({
                                  id: r._id,
                                  status: "canceled",
                                })
                              }
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </>
                    )}

                    {/* Volunteer-only action: pending -> inprogress */}
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
      )}

      {/* Confirmation Modal (admin only) */}
      {role === "admin" && (
        <div className={`modal ${confirmId ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="font-bold">Delete this request?</h3>
            <div className="modal-action">
              <button className="btn" onClick={() => setConfirmId(null)}>
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => deleteMutation.mutate(confirmId)}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
