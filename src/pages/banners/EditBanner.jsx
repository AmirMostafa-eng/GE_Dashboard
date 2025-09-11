import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditBanner({ isOpen, onClose, banner, onSuccess }) {
  const [formData, setFormData] = useState({
    redirectUrl: banner?.redirectUrl || "",
    url: banner?.url || "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = {
        redirectUrl: formData.redirectUrl,
        url: formData.url,
      };

      await axios.put(`/api/banner/update/${banner.id}`, formDataToSend);
      toast.success("Banner updated successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Error updating banner");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Banner url</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
              className="cursor-pointer"
              placeholder="Enter banner URL"
              required
            />
            {banner?.url && !formData.url && (
              <div className="mt-2">
                <img
                  src={banner.url}
                  alt="Current banner"
                  className="w-full h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="redirectUrl">Redirect URL</Label>
            <Input
              id="redirectUrl"
              value={formData.redirectUrl}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  redirectUrl: e.target.value,
                }))
              }
              placeholder="Enter redirect URL"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-md hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
