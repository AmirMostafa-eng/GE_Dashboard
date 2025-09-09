import { useState, useMemo } from "react";
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
import mockUsers from "./UsersData";
import UserTable from "./UsersTable";

export default function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All Roles" ||
        (roleFilter === "Student" && user.role === "User") ||
        (roleFilter === "Admin" && user.role === "Admin");

      return matchesSearch && matchesRole;
    });
  }, [searchTerm, roleFilter]);

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
    console.log("View user:", user);
    // Implement view user modal
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user:", userId);
      // Implement delete user logic
    }
  };

  return (
    <div className="bg-background min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white shadow p-6 border border-border">
        <div className="flex items-center gap-2">
          <Users size={32} />
          <h1 className="text-3xl font-bold ">Manage Users</h1>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="ml-2 text-sm font-medium bg-white text-foreground px-2 py-1 rounded border">
            DE
          </span>
        </div>
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
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
        </div>
      </div>

      {/* Users Table */}
      <div className="mx-4 lg:mx-10">
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
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-32">
                    Last Payment
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-40">
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
        </div>
      </div>
    </div>
  );
}
