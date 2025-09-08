import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

export default function BannerTable({ banners, onEdit, onDelete }) {
  return (
    <tbody>
      {banners.map((banner) => (
        <tr
          key={banner.id}
          className="border-b border-border hover:bg-muted/30 transition-colors bg-white"
        >
          {/* ID */}
          <td className="px-6 py-4">
            <span className="font-mono text-foreground">#{banner.id}</span>
          </td>

          {/* Image */}
          <td className="px-6 py-4">
            <div className="w-20 h-12 bg-muted rounded overflow-hidden border border-border flex-shrink-0">
              <img
                src={banner.url}
                alt={`Banner ${banner.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNiAyMEg0NFYyOEgzNlYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTMyIDI0TDM2IDIwTDQwIDI0TDQ0IDIwTDQ4IDI0VjMySDMyVjI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
                }}
              />
            </div>
          </td>

          {/* URL */}
          <td className="px-6 py-4">
            <div className="max-w-xs">
              <span
                className="text-muted-foreground text-sm block truncate"
                title={banner.redirectUrl}
              >
                {banner.redirectUrl}
              </span>
            </div>
          </td>

          {/* Actions */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <button
                onClick={() => onEdit(banner)}
                className=" bg-secondary hover:bg-secondary/80 text-black font-medium px-4 py-2 rounded flex gap-1 items-center shadow-sm transition-colors duration-300"
              >
                <Edit size={18} className="mr-1" />
                Edit
              </button>
              <button
                onClick={() => onDelete(banner)}
                className="bg-destructive hover:bg-destructive/80 text-white font-medium px-4 py-2 rounded flex gap-1 items-center shadow-sm transition-colors duration-300"
              >
                <Trash2 size={18} className="mr-1" />
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
