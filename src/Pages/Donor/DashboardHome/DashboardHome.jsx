import { FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function DashboardHome() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole(user?.email); // check role
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch only the donor's own requests
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donationRequests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/donationRequests", {
        params: { requesterEmail: user.email }, // fetch only their own
      });
      return data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3); // only 3 most recent posts
    },
    enabled: !!user?.email && role === "donor",
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/donationRequests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["donationRequests", user?.email]);
      Swal.fire("Deleted!", "Your request has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete request", "error");
    },
  });

  // Status update mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      console.log("Updating status:", id, status); // debug

      // Only allow "done" or "canceled"
      if (!["done", "canceled"].includes(status)) {
        throw new Error("Invalid status. Allowed: done, canceled");
      }

      try {
        const { data } = await axiosSecure.patch(
          `/donationRequests/${id}/status/donor`,
          { status },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Backend response:", data); // debug
        return data;
      } catch (err) {
        console.error(
          "Status update error:",
          err.response?.data || err.message
        );

        // Show backend message if available
        const message =
          err.response?.data?.error || err.message || "Failed to update status";
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      console.log("Status update success:", data);
      queryClient.invalidateQueries(["donationRequests", user?.email]);
      Swal.fire(
        "Updated!",
        data.message || "Status changed successfully",
        "success"
      );
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      Swal.fire("Error", error.message || "Failed to update status", "error");
    },
  });

  // Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Status change handler
  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  // Role check: only donors can view
  if (role !== "donor") {
    return (
      <div className="p-6 text-center text-red-500">
        Access denied. Only donors can view this page.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Welcome, <span className="text-red-600">{user?.displayName}</span> 👋
      </h1>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Your Recent Requests</h2>

        {isLoading && (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-red-500">Failed to load donation requests.</p>
        )}

        {!isLoading && requests.length === 0 && (
          <p className="text-gray-600">
            You have not made any donation requests yet.
          </p>
        )}

        {requests.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
            <table className="table table-zebra w-full">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td className="font-medium">{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{req.donationDate || "-"}</td>
                    <td>{req.donationTime || "-"}</td>
                    <td>
                      <span className="badge badge-outline badge-primary">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          req.status === "pending"
                            ? "badge-warning"
                            : req.status === "inprogress"
                            ? "badge-info"
                            : req.status === "done"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === "inprogress" ? (
                        <>
                          <p className="font-medium">{req.donorName}</p>
                          <p className="text-xs text-gray-500">
                            {req.donorEmail}
                          </p>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="flex gap-2 justify-center">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, "done")}
                            className="btn btn-xs btn-success tooltip"
                            data-tip="Mark as Done"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
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
                          navigate(`/detailsDonationRequest/${req._id}`)
                        }
                        className="btn btn-xs btn-info tooltip"
                        data-tip="View Details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/updateDonationRequest/${req._id}`)
                        }
                        className="btn btn-xs btn-primary tooltip"
                        data-tip="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
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
        )}

        {requests.length > 0 && (
          <div className="mt-4 text-center">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => navigate("/dashboard/My-donation-request")}
            >
              View My All Requests
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
