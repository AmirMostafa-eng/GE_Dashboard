import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import mockUsers from "./UsersData";
import UserTable from "./UsersTable";
import axios from "axios";
import UserDetails from "./UserDetails"; // Add this import
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const getUsers = async () => {
    const tokenData =
      JSON.parse(sessionStorage.getItem("tokens")) ||
      JSON.parse(localStorage.getItem("tokens"));
    const fetchedUsers = await axios.get("/api/user/get-users", {
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
    });
    setUsers(fetchedUsers.data);
    console.log(fetchedUsers.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All Roles" ||
        (roleFilter === "User" && user.role === "User") ||
        (roleFilter !== "Admin" && user.role !== "Admin") ||
        (roleFilter === "Admin" && user.role === "Admin");

      return matchesSearch && matchesRole;
    });
  }, [searchTerm, roleFilter, users]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (value) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  const handleDelete = (userId) => {
    console.log("Deleting user with ID:", userId);
    setSelectedUser(users.find((user) => user.id === userId));
    setIsDeleteOpen(true);
  };

  const confirmDelete = async (userId) => {
    console.log("Deleting user with ID:", userId);
    try {
      const tokenData =
        JSON.parse(sessionStorage.getItem("tokens")) ||
        JSON.parse(localStorage.getItem("tokens"));

      await axios.delete(`/api/user/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
      await getUsers(); // Refresh the list
      setIsDeleteOpen(false);
      toast.success("User deleted successfully");
      setIsUserDetailsOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  // const handleSaveUser = (updatedUser) => {
  //   setUsers((prev) =>
  //     prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
  //   );
  //   setSelectedUser(updatedUser); // Update selected user too
  // };

  const handleCloseDialog = () => {
    setIsUserDetailsOpen(false);
    setSelectedUser(null);
  };

  // const handleDeleteFromDialog = async (userId) => {
  //   try {
  //     const tokenData = JSON.parse(localStorage.getItem("tokens"));
  //     await axios.delete(`/api/user/delete-user/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${tokenData.accessToken}`,
  //       },
  //     });
  //     setUsers((prev) => prev.filter((user) => user.id !== userId));
  //     setIsUserDetailsOpen(false);
  //     setSelectedUser(null);
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <div className="bg-background min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white shadow p-6 border border-border">
        <div className="flex items-center gap-2">
          {/* <Users size={32} /> */}
          <lord-icon
            src="https://cdn.lordicon.com/hhljfoaj.json"
            trigger="loop"
            delay="500"
            colors="primary:#000000,secondary:#2e5d36,tertiary:#ffc738"
            style={{ width: "35px", height: "35px" }}
          ></lord-icon>
          <h1 className="text-3xl font-bold ">Manage Users</h1>
        </div>
        {/* <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="ml-2 text-sm font-medium bg-white text-foreground px-2 py-1 rounded border">
            DE
          </span>
        </div> */}
      </div>

      {/* Search and Filters */}
      <div className="mx-4 lg:mx-10 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative bg-white">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground bg-white"
                size={20}
              />
              <Input
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="w-full sm:w-48 bg-white">
            <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="All Roles">All Roles</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
        </div>
      </div>

      {/* Users Table */}
      <div className="mx-4 lg:mx-10 rounded-xl overflow-hidden">
        <div className="shadow-sm rounded-lg border border-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary text-secondary-foreground">
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-20">
                    ID
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium min-w-[120px]">
                    Full Name
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium min-w-[200px]">
                    Email
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-24">
                    Role
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-24">
                    Payments
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium min-w-34">
                    Last Payment
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-36">
                    Actions
                  </th>
                </tr>
              </thead>
              <UserTable
                users={currentUsers}
                onView={handleView}
                onDelete={handleDelete}
              />
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 bg-white border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredUsers.length)} of{" "}
              {filteredUsers.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>

          {/* User Details Dialog */}
          <UserDetails
            isOpen={isUserDetailsOpen}
            onClose={handleCloseDialog}
            user={selectedUser}
            // onSave={handleSaveUser}
            onDelete={handleDelete}
          />
          {/* user delete */}
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </p>
              </div>
              <DialogFooter>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsDeleteOpen(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete(selectedUser.id)}
                    className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
