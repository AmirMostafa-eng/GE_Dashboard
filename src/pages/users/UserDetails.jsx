// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, User, Copy, Trash2, Save } from "lucide-react";

// Format date helper
function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString)
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
}

// Get status badge styling
function getStatusBadge(status) {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-success text-success-foreground">● Paid</Badge>
      );
    case "Failed":
      return <Badge variant="destructive">● Failed</Badge>;
    case "Pending":
      return (
        <Badge className="bg-warning text-warning-foreground">● Pending</Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function UserDetails({
  isOpen,
  onClose,
  user,
  // onSave,
  onDelete,
}) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedUser, setEditedUser] = useState({
  //   fullName: user?.fullName || "",
  //   email: user?.email || "",
  //   role: user?.role || "User",
  // });

  if (!user) return null;

  // const handleInputChange = (field, value) => {
  //   setEditedUser((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const handleSave = () => {
  //   onSave({ ...user, ...editedUser });
  //   // setIsEditing(false);
  // };

  const handleDelete = () => {
    console.log("Deleting user with ID:", user.id);
    console.log(user);
    onDelete(user.id);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="rounded-2xl">
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-accent-foreground">
          <div className="flex items-center gap-2">
            <User size={20} />
            <DialogTitle className="text-xl font-semibold">
              User Details - #{user.id}
            </DialogTitle>
          </div>
          {/* <button
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button> */}
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex gap-2">
              <div
                size="sm"
                className="bg-secondary text-dark-green px-2 py-1 rounded-xl font-medium"
              >
                ● Overview
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(user.id.toString())}
                className="bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80"
              >
                <Copy size={14} className="mr-1" />
                Copy ID
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                <Trash2 size={14} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* ID */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">ID</div>
              <div className="font-semibold text-foreground">{user.id}</div>
            </div>

            {/* Role */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-[#4a4a4a] mb-1">Role</div>
              <div className="font-semibold text-foreground">
                {user.role === "User" ? "Student" : user.role}
              </div>
            </div>

            {/* Full Name */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Full Name
              </div>
              <div className="font-semibold text-foreground">
                {user.fullName}
              </div>
            </div>

            {/* Email */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="font-semibold text-foreground">{user.email}</div>
            </div>

            {/* Refresh Token Exp */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Refresh Token Exp.
              </div>
              <div className="font-semibold text-foreground">
                {formatDate(user.refereshTokenExpirationTime)}
              </div>
            </div>

            {/* Payments Count */}
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                Payments Count
              </div>
              <div className="font-semibold text-foreground">
                {user.payments?.length || 0}
              </div>
            </div>
          </div>

          {/* Payments Table */}
          {user.payments && user.payments.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Payments</h3>

              <div className="border border-border rounded-lg overflow-hidden">
                {/* Payments Header */}
                <div className="bg-secondary text-secondary-foreground p-3 grid grid-cols-4 gap-4 font-medium">
                  <div>Amount</div>
                  <div>Method</div>
                  <div>Status</div>
                  <div>Date</div>
                </div>

                {/* Payments Body */}
                <div className="bg-white">
                  {user.payments.map((payment, index) => (
                    <div
                      key={payment.id || index}
                      className="p-3 border-b border-border last:border-b-0 grid grid-cols-4 gap-4 items-center"
                    >
                      <div className="font-medium">
                        €{payment.amount?.toFixed(2) || "0.00"}
                      </div>
                      <div className="text-muted-foreground">
                        {payment.paymentMethod || "N/A"}
                      </div>
                      <div>{getStatusBadge(payment.status)}</div>
                      <div className="text-muted-foreground text-sm">
                        {formatDate(payment.paidAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Edit Section */}
          {/* <div className="space-y-4">
            <h3 className="font-medium text-foreground">Quick Edit</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          {/* Full Name */}
          {/* <div className="space-y-2">
                <Label htmlFor="editFullName">Full Name</Label>
                <Input
                  id="editFullName"
                  value={editedUser.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                />
              </div> */}

          {/* Role */}
          {/* <div className="space-y-2">
                <Label htmlFor="editRole">Role</Label>
                <Select
                  value={
                    editedUser.role === "User" ? "Student" : editedUser.role
                  }
                  onValueChange={(value) =>
                    handleInputChange(
                      "role",
                      value === "Student" ? "User" : value
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

          {/* Email */}
          {/* <div className="space-y-2 md:col-span-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div> */}
          {/* </div>
          </div> */}

          {/* Bottom Actions */}
          {/* <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleSave}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <Save size={14} className="mr-1" />
              Save Changes
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
