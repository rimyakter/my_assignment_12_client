import { FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReactPaginate from "react-paginate";

const AllUsersPage = () => {
  const { user } = useAuth(); // logged in admin
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 3;

  // ✅ Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ Mutations
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/users/${id}/status`, { status });
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const makeVolunteerMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/users/${id}/role`, {
        role: "volunteer",
      });
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/users/${id}/role`, { role: "admin" });
    },
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  // ✅ Filter users
  const filteredUsers =
    filter === "all" ? users : users.filter((u) => u.status === filter);

  // ✅ Pagination logic
  const offset = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (isLoading) return <p className="p-6">Loading users...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load users.</p>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-2xl font-semibold mb-4">All Users Page</h1>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        {["all", "active", "blocked"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setCurrentPage(0); // reset page when filter changes
            }}
            className={`btn btn-sm capitalize ${
              filter === f ? "btn-primary" : "btn-outline"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-200 shadow-md rounded-lg pt-4 pb-6">
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-circle w-10 h-10">
                      <img src={u.photoURL} alt={u.name} />
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>
                  <span className="badge badge-primary">{u.role}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      u.status === "active" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="text-center">
                  {/* Dropdown */}
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-ghost btn-sm m-1">
                      <FaEllipsisV />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
                    >
                      {u.status === "active" ? (
                        <li>
                          <button
                            onClick={() =>
                              toggleStatusMutation.mutate({
                                id: u._id,
                                status: "blocked",
                              })
                            }
                          >
                            Block
                          </button>
                        </li>
                      ) : (
                        <li>
                          <button
                            onClick={() =>
                              toggleStatusMutation.mutate({
                                id: u._id,
                                status: "active",
                              })
                            }
                          >
                            Unblock
                          </button>
                        </li>
                      )}
                      {u.role !== "volunteer" && (
                        <li>
                          <button
                            onClick={() => makeVolunteerMutation.mutate(u._id)}
                          >
                            Make Volunteer
                          </button>
                        </li>
                      )}
                      {u.role !== "admin" && (
                        <li>
                          <button
                            onClick={() => makeAdminMutation.mutate(u._id)}
                          >
                            Make Admin
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Pagination Component */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-6">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"flex gap-2"}
              pageClassName={"btn btn-sm"}
              previousClassName={"btn btn-sm"}
              nextClassName={"btn btn-sm"}
              activeClassName={"btn-primary"}
              disabledClassName={"btn-disabled"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;
