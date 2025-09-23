import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function MyDonationRequests() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

  // ✅ Fetch requests
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

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donationRequests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donationRequests"]);
      setConfirmId(null);
    },
  });

  // ✅ Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/donationRequests/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donationRequests"]);
    },
  });

  // ✅ Filter user-specific requests
  const myRequests = requests.filter((r) => r.requesterEmail === user?.email);

  const visible = myRequests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

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
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Recipient</th>
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
                  <td className="flex gap-1">
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        navigate(`/detailsDonationRequest/${r._id}`)
                      }
                    >
                      View
                    </button>

                    {r.requesterEmail === user?.email && (
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
                      </>
                    )}

                    {r.status === "inprogress" &&
                      r.donorEmail === user?.email && (
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
                            className="btn btn-xs btn-error"
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
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
    </div>
  );
}
