import React, { useEffect, useMemo, useState } from "react";
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
  BookOpen,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ExamTable from "./ExamTable";
import axios from "axios";
import ViewExamDialog from "./create/ViewExamDialog";
import ExamFormDialog from "./create/ExamFormDialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import CreateExam from "./CreateExam";

export default function ExamsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [exams, setExams] = useState([]);
  const examsPerPage = 5;
  const [selectedExam, setSelectedExam] = useState(null);
  const [dialogMode, setDialogMode] = useState("add"); // 'add', 'edit', 'view'
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchExams = async () => {
    const tokenData = JSON.parse(sessionStorage.getItem("tokens"));
    if (!tokenData) {
      console.warn("No token found! Redirecting to login...");
      sessionStorage.removeItem("user");
      navigate("/");
      return;
    }
    try {
      const response = await axios.get("/api/exam", {
        headers: {
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
      setExams(response.data);
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        // Unauthorized
        console.warn("Unauthorized! Redirecting to login...");
        console.log("Please login first");
        sessionStorage.removeItem("tokens");
        sessionStorage.removeItem("user");
        navigate("/");
      } else {
        console.error("Error fetching exams:", error);
        toast.error("Error fetching exams");
      }
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Filter and search logic
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesSearch = exam.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === "All" || exam.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [searchTerm, levelFilter, exams]);

  // Pagination logic
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);
  const startIndex = (currentPage - 1) * examsPerPage;
  const endIndex = startIndex + examsPerPage;
  const currentExams = filteredExams.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleLevelFilterChange = (value) => {
    setLevelFilter(value);
    setCurrentPage(1);
  };

  const handleView = (exam) => {
    console.log("View exam:", exam);
    // Implement view exam modal/page
    setSelectedExam(exam);
    setDialogMode("view");
    setIsDialogOpen(true);
  };

  const handleEdit = (exam) => {
    console.log("Edit exam:", exam);
    setSelectedExam(exam);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleDelete = (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setExams((prev) => prev.filter((exam) => exam.id !== examId));
    }
  };

  const handleAddExam = () => {
    console.log("Add new exam");
    // Implement add exam modal/page
    setSelectedExam(null);
    setDialogMode("add");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedExam(null);
  };

  const handleSaveExam = async (examData) => {
    const tokenData =
      JSON.parse(sessionStorage.getItem("tokens")) ||
      JSON.parse(localStorage.getItem("tokens"));
    if (dialogMode === "edit") {
      // setExams((prev) =>
      //   prev.map((exam) => (exam.id === examData.id ? examData : exam))
      // );
      await axios.put(`/api/exam/${examData.id}`, examData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
    } else {
      await axios.post("/api/exam", examData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
    }
    fetchExams();
    console.log("Saved exam data:", examData);
  };

  return (
    <div className="bg-background min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-2 justify-between mb-4 sm:mb-8 bg-white shadow p-3 sm:p-6 border border-border">
        <div className="flex items-center gap-2">
          {/* <BookOpen size={32} className="text-foreground" /> */}
          <lord-icon
            src="https://cdn.lordicon.com/cbtlerlm.json"
            trigger="loop"
            delay="500"
            state="in-dynamic"
            colors="primary:#000000,secondary:#2e5d36,tertiary:#ebe6ef,quaternary:#848484,quinary:#2e5d36"
            style={{ width: "40px", height: "40px" }}
          ></lord-icon>
          <h1 className="sm:text-3xl text-xl font-bold ">Manage Exams</h1>
        </div>
        <Button
          onClick={handleAddExam}
          className="bg-primary text-white hover:bg-secondary-foreground font-medium px-4 py-2 rounded flex items-center shadow-sm transition-colors duration-300"
        >
          <Plus size={16} className="mr-2" />
          Add New Exam
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mx-4 lg:mx-10 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          {/* Search */}
          <div className="flex-1 min-w-0">
            {/* <label className="block text-sm font-medium text-foreground mb-2">
              Search
            </label> */}
            <div className="relative bg-white">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search by title or level"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Level Filter */}
          <div className="w-full sm:w-48 bg-white">
            {/* <label className="block text-sm font-medium text-foreground mb-2">
              Level
            </label> */}
            <Select value={levelFilter} onValueChange={handleLevelFilterChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="All">Level: All</SelectItem>
                <SelectItem value="A1">A1 - Beginner</SelectItem>
                <SelectItem value="A2">A2 - Elementary</SelectItem>
                <SelectItem value="B1">B1 - Intermediate</SelectItem>
                <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                <SelectItem value="C1">C1 - Advanced</SelectItem>
                <SelectItem value="C2">C2 - Proficient</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Exams Table */}
      <div className="mx-4 lg:mx-10 rounded-2xl overflow-hidden">
        <div className="shadow-sm rounded-lg border border-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary text-secondary-foreground">
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-20">
                    ID
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium min-w-[150px]">
                    Title
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-24">
                    Level
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium min-w-[200px]">
                    Description
                  </th>
                  <th className="px-3 lg:px-3 py-4 text-left font-medium w-36">
                    Created At
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-20">
                    Skills
                  </th>
                  <th className="px-4 lg:px-6 py-4 text-left font-medium w-48">
                    Actions
                  </th>
                </tr>
              </thead>
              <ExamTable
                exams={currentExams}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </table>
          </div>

          {/* dialog */}
          {dialogMode === "view" ? (
            <ViewExamDialog
              isOpen={isDialogOpen}
              onClose={handleCloseDialog}
              exam={selectedExam}
            />
          ) : (
            <ExamFormDialog
              isOpen={isDialogOpen}
              onClose={handleCloseDialog}
              exam={selectedExam}
              onSave={handleSaveExam}
              mode={dialogMode}
            />
          )}

          {/* Pagination */}
          <div className="p-4 bg-white border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredExams.length)} of{" "}
              {filteredExams.length}
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
