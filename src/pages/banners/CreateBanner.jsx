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

export default function CreateBanner({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    redirectUrl: "",
    url: "",
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

      // console.log(formDataToSend);

      await axios.post("/api/banner/create", formDataToSend);

      onSuccess();
      toast.success("Banner created successfully");
      onClose();
      setFormData({ redirectUrl: "", url: "" }); // Reset form
    } catch (error) {
      console.error("Error creating banner:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleurlChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData((prev) => ({ ...prev, url: file }));
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Banner</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Banner url</Label>
            <Input
              id="url"
              // type="file"
              // accept="url/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  url: e.target.value,
                }))
              }
              required
              value={formData.url}
              placeholder="Image URL"
            />
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
              {isLoading ? "Creating..." : "Create Banner"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
