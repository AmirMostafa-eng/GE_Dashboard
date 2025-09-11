import { Badge } from "@/components/ui/badge";
import { Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExamTable({ exams, onView, onEdit, onDelete }) {
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB");
  }

  function getLevelBadge(level) {
    const levelColors = {
      A1: "bg-green-100 text-green-800 border-green-200",
      A2: "bg-blue-100 text-blue-800 border-blue-200",
      B1: "bg-yellow-100 text-yellow-800 border-yellow-200",
      B2: "bg-orange-100 text-orange-800 border-orange-200",
      C1: "bg-purple-100 text-purple-800 border-purple-200",
      C2: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <Badge
        className={`${
          levelColors[level] || "bg-gray-100 text-gray-800"
        } border font-medium`}
      >
        {level}
      </Badge>
    );
  }

  return (
    <tbody>
      {exams.map((exam) => (
        <tr
          key={exam.id}
          className="border-b border-border hover:bg-muted/30 transition-colors bg-white"
        >
          {/* ID */}
          <td className="px-4 lg:px-6 py-4">
            <span className="font-mono text-foreground text-sm">
              #{exam.id}
            </span>
          </td>

          {/* Title */}
          <td className="px-4 lg:px-6 py-4 min-w-[150px]">
            <span className="font-medium text-foreground">{exam.title}</span>
          </td>

          {/* Level */}
          <td className="px-4 lg:px-6 py-4">{getLevelBadge(exam.level)}</td>

          {/* Description */}
          <td className="px-4 lg:px-6 py-4 min-w-[200px]">
            <div className="max-w-xs">
              <span
                className="text-muted-foreground text-sm block truncate"
                title={exam.description}
              >
                {exam.description}
              </span>
            </div>
          </td>

          {/* Created At */}
          <td className="px-4 lg:px-6 py-4">
            <span className="text-muted-foreground text-sm">
              {formatDate(exam.createdAt)}
            </span>
          </td>

          {/* Skills Count */}
          <td className="px-4 lg:px-6 py-4">
            <span className="font-medium text-foreground">
              {exam.skills.length}
            </span>
          </td>

          {/* Actions */}
          <td className="px-4 lg:px-6 py-4">
            <div className="flex items-center gap-1 lg:gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onView(exam)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
              >
                <Eye size={12} className="mr-1" />
                <span className="hidden sm:inline">View</span>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onEdit(exam)}
              >
                <Edit size={12} className="mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(exam.id)}
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
