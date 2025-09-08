import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

/**
 * Small actions component so row stays tidy.
 * Uses kiwi accents (green) and a red destructive button for delete.
 */
export default function BannerActions({ onEdit, onDelete }) {
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={onEdit}
        className="border-[#66CC66] text-[#1C1C1E] hover:bg-[#66CC66]/10"
        aria-label="Edit banner"
      >
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={onDelete}
        aria-label="Delete banner"
        className="bg-[#663333] hover:bg-[#5c2b2b] text-white"
      >
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </>
  );
}
