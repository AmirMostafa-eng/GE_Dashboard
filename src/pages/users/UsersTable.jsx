import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

export default function UserTable({ users, onView, onDelete }) {
  // Get last payment status
  function getLastPaymentStatus(payments) {
    if (!payments || payments.length === 0) return null;

    const lastPayment = payments.reduce((latest, payment) => {
      return payment.id > latest.id ? payment : latest;
    }, payments[0]);

    return lastPayment.status;
  }

  // Get status badge styling
  function getStatusBadge(status) {
    if (!status) {
      return (
        <Badge variant="outline" className="bg-muted text-muted-foreground">
          No Payments
        </Badge>
      );
    }

    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-success text-success-foreground">Paid</Badge>
        );
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "Pending":
        return (
          <Badge className="bg-warning text-warning-foreground">Pending</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  // Get role badge styling
  function getRoleBadge(role) {
    return role === "Admin" ? (
      <Badge className="bg-primary text-primary-foreground">Admin</Badge>
    ) : (
      <Badge variant="secondary">Student</Badge>
    );
  }

  return (
    <tbody>
      {users.map((user) => (
        <tr
          key={user.id}
          className="border-b border-border hover:bg-muted/30 transition-colors bg-white"
        >
          {/* ID */}
          <td className="px-4 lg:px-6 py-4">
            <span className="font-mono text-foreground text-sm">
              #{user.id}
            </span>
          </td>

          {/* Full Name */}
          <td className="px-4 lg:px-6 py-4">
            <span className="font-medium text-foreground whitespace-nowrap">
              {user.fullName}
            </span>
          </td>

          {/* Email */}
          <td className="px-4 lg:px-6 py-4 min-w-[200px]">
            <span className="text-muted-foreground text-sm" title={user.email}>
              {user.email}
            </span>
          </td>

          {/* Role */}
          <td className="px-4 lg:px-6 py-4">{getRoleBadge(user.role)}</td>

          {/* Payments Count */}
          <td className="px-4 lg:px-6 py-4">
            <span className="font-medium text-foreground">
              {user.payments ? user.payments.length : 0}
            </span>
          </td>

          {/* Last Payment Status */}
          <td className="px-4 lg:px-6 py-4">
            {getStatusBadge(getLastPaymentStatus(user.payments))}
          </td>

          {/* Actions */}
          <td className="px-4 lg:px-6 py-4">
            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onView(user)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
              >
                <Eye size={12} className="mr-1" />
                <span className="hidden sm:inline">View</span>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(user.id)}
              >
                <Trash2 size={12} className="mr-1" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
