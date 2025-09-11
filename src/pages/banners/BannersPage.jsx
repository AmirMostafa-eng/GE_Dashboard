import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { BiImage } from "react-icons/bi";
import BannerTable from "./BannerTable";
import CreateBanner from "./CreateBanner";
import EditBanner from "./EditBanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import toast from "react-hot-toast";

export default function BannersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [banners, setBanners] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const fetchingBanners = async () => {
    // Fetch banners from API
    const fetchedBanners = await axios.get("/api/banner/get-all");
    // Update state
    setBanners(fetchedBanners.data);
    console.log(fetchedBanners.data);
  };
  useEffect(() => {
    fetchingBanners();
  }, []);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = banners.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(banners.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (banner) => {
    setSelectedBanner(banner);
    setIsEditOpen(true);
  };

  const handleDelete = (banner) => {
    setSelectedBanner(banner);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/banner/delete/${selectedBanner.id}`);
      await fetchingBanners(); // Refresh the list
      setIsDeleteOpen(false);
      setSelectedBanner(null);
      toast.success("Banner deleted successfully");
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Error deleting banner");
    }
  };

  return (
    <div className="bg-background min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-col gap-2 sm:flex-row mb-8 bg-white shadow p-3 sm:p-6 border border-border">
        <h1 className=" text-xl sm:text-3xl font-bold flex items-center gap-2">
          {/* <BiImage />  */}
          <lord-icon
            src="https://cdn.lordicon.com/wahyhize.json"
            trigger="loop"
            delay="500"
            colors="primary:#000000,secondary:#2e5d36,tertiary:#c71f16,quaternary:#2e5d36,quinary:#ebe6ef,senary:#ffc738,septenary:#f9c9c0"
            style={{ width: "35px", height: "35px" }}
          ></lord-icon>
          Manage Banners
        </h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="hover:bg-secondary-foreground bg-primary text-white font-medium px-4 py-2 rounded flex items-center shadow-sm transition-colors duration-300"
        >
          <Plus size={16} className="mr-2" />
          Add Banner
        </button>
      </div>

      {/* Table */}
      <div className="mx-10 shadow-sm rounded-xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-secondary text-secondary-foreground">
                <th className="px-6 py-4 text-left font-medium min-w-[80px]">
                  ID
                </th>
                <th className="px-6 py-4 text-left font-medium min-w-[120px]">
                  Image
                </th>
                <th className="px-6 py-4 text-left font-medium min-w-[300px]">
                  Redirect URL
                </th>
                <th className="px-6 py-4 text-left font-medium min-w-[160px]">
                  Actions
                </th>
              </tr>
            </thead>
            <BannerTable
              banners={currentItems}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-white border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, banners.length)} of {banners.length}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Create Banner Dialog */}
      <CreateBanner
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchingBanners}
      />

      {/* Edit Banner Dialog */}
      {selectedBanner && (
        <EditBanner
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedBanner(null);
          }}
          banner={selectedBanner}
          onSuccess={fetchingBanners}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Banner</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Are you sure you want to delete this banner? This action cannot be
              undone.
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
                onClick={confirmDelete}
                className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition-colors"
              >
                Delete
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
