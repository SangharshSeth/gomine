"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  Tags,
  Sliders,
  Loader,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch problems from API
const fetchProblems = async () => {
  const { data } = await axios.get("http://localhost:8080/problems");
  return data;
};

// Function to get progress color
const getProgressColor = (progress: string) => {
  switch (progress) {
    case "Completed":
      return "bg-green-500";
    case "InProgress":
      return "bg-yellow-500";
    case "Unattempted":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function ProblemsTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Use React Query to fetch problems
  const {
    data: problems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["problems"],
    queryFn: fetchProblems,
  });

  const filteredProblems = problems.filter(
    (problem: any) =>
      (problem.Description.toLowerCase().includes(search.toLowerCase()) ||
        problem.Tags.some((tag: string) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )) &&
      (difficultyFilter === "All" || problem.Difficulty === difficultyFilter)
  );

  const pageCount = Math.ceil(filteredProblems.length / itemsPerPage);
  const currentProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProblemClick = (id: string) => {
    router.push(`/problems/${id}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "px-6 py-1 bg-green-100 text-green-500 hover:bg-green-100 hover:text-green-500";
      case "Medium":
        return "px-4 py-1 bg-yellow-100 text-yellow-500 hover:bg-yellow-100 hover:text-yellow-500";
      case "Hard":
        return "px-6 py-1 bg-red-100 text-red-500 hover:bg-red-100 hover:text-red-500";
      default:
        return "px-4 py-1 bg-gray-500 hover:bg-gray-600";
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        <Loader className="animate-spin h-10 w-10 text-gray-100" />
      </div>
    );
  if (isError)
    return <div className="text-center text-red-500">Error fetching data</div>;

  return (
    <div className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">
            Golang Problems
          </CardTitle>
          <div className="flex space-x-4 mt-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search problems or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Select onValueChange={setDifficultyFilter} defaultValue="All">
              <SelectTrigger className="w-[180px] bg-gray-700 text-gray-100 border-gray-600">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
                <SelectItem value="All">All Difficulties</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table className="bg-gray-800 border-gray-700 rounded-lg">
            <TableHeader>
              <TableRow className=" border-gray-700 hover:bg-gray-700/50 transition-colors">
                <TableHead className="text-gray-300  items-center space-x-2 py-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6" />
                    <span>ProblemID</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-300 items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Search className="h-6 w-6" />
                    <span>Description</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-300  items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Sliders className="h-6 w-6" />
                    <span>Difficulty</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-300  items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Loader className="h-6 w-6" />
                    <span>Progress</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Tags className="h-6 w-6" />
                    <span>Tags</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProblems.map((problem: any) => (
                <TableRow
                  key={problem.ProblemID}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="font-medium py-4 pl-8 text-gray-300">
                    {problem.ProblemID}
                  </TableCell>
                  <TableCell
                    className="text-gray-100 cursor-pointer"
                    onClick={() => handleProblemClick(problem.ProblemID)}
                  >
                    {problem.Description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getDifficultyColor(problem.Difficulty)}`}
                    >
                      {problem.Difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`block w-3 h-3 rounded-full ${getProgressColor(
                          problem.Progress
                        )}`}
                      ></span>
                      <span className="text-gray-300">{problem.Progress}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {problem.Tags.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-gray-300 border-gray-600"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            variant="outline"
            className="text-slate-900 border-gray-600 hover:bg-gray-700 hover:text-gray-200"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </Button>
          <div className="text-gray-300">
            Page {currentPage} of {pageCount}
          </div>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
            variant="outline"
            className="text-slate-900 border-gray-600 hover:bg-gray-700 hover:text-gray-200"
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
