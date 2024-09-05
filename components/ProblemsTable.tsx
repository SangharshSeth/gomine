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
  BadgeInfo,
} from "lucide-react";
import DynamicBreadcrumb from "./DynamicBreadCrumbs";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Extended dummy data for testing pagination
const problems = [
  {
    no: 1,
    question: "HTTP Service with standard library",
    difficulty: "Easy",
    status: "Completed",
    tags: ["HTTP", "Web"],
  },
  {
    no: 2,
    question: "Implement a Stack using a Slice and Structs",
    difficulty: "Medium",
    status: "Unattended",
    tags: ["Stack", "Math"],
  },
  {
    no: 3,
    question: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    status: "In Progress",
    tags: ["String", "Sliding Window"],
  },
  {
    no: 4,
    question: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    status: "Unattended",
    tags: ["Array", "Binary Search"],
  },
  {
    no: 5,
    question: "Concurrent Web Crawler",
    difficulty: "Medium",
    status: "Completed",
    tags: ["Concurrency", "HTTP"],
  },
  {
    no: 6,
    question: "Implement Queue using Slices",
    difficulty: "Easy",
    status: "Unattended",
    tags: ["Queue", "Slice"],
  },
  {
    no: 7,
    question: "Goroutine Pool",
    difficulty: "Hard",
    status: "In Progress",
    tags: ["Concurrency", "Goroutines"],
  },
  {
    no: 8,
    question: "JSON Parsing and Validation",
    difficulty: "Medium",
    status: "Completed",
    tags: ["JSON", "Structs"],
  },
  {
    no: 9,
    question: "Implement a Simple Web Server",
    difficulty: "Medium",
    status: "Unattended",
    tags: ["HTTP", "net/http"],
  },
  {
    no: 10,
    question: "Mutex vs. Channel Benchmarking",
    difficulty: "Hard",
    status: "Unattended",
    tags: ["Concurrency", "Benchmarking"],
  },
  {
    no: 11,
    question: "Design a REST API",
    difficulty: "Medium",
    status: "Completed",
    tags: ["API", "Design"],
  },
  {
    no: 12,
    question: "Implement a Load Balancer",
    difficulty: "Hard",
    status: "Unattended",
    tags: ["Load Balancing", "Networking"],
  },
  {
    no: 13,
    question: "Concurrency Patterns in Go",
    difficulty: "Medium",
    status: "In Progress",
    tags: ["Concurrency", "Patterns"],
  },
  {
    no: 14,
    question: "Handling Large Data Sets",
    difficulty: "Hard",
    status: "Unattended",
    tags: ["Data Processing", "Optimization"],
  },
  {
    no: 15,
    question: "Building a Distributed System",
    difficulty: "Hard",
    status: "Completed",
    tags: ["Distributed Systems", "Design"],
  },
];

export default function ProblemsTable() {
  const router = useRouter();

  const handleProblemClick = (id: number) => {
    // Navigate to the problem detail page
    router.push(`/problems/${id}`);
  };
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProblems = problems.filter(
    (problem) =>
      (problem.question.toLowerCase().includes(search.toLowerCase()) ||
        problem.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )) &&
      (difficultyFilter === "All" || problem.difficulty === difficultyFilter)
  );

  const pageCount = Math.ceil(filteredProblems.length / itemsPerPage);
  const currentProblems = filteredProblems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "px-6 py-1 bg-green-100 text-green-500  hover:bg-green-100 hover:text-green-500";
      case "Medium":
        return "px-4 py-1 bg-yellow-100 text-yellow-500  hover:bg-yellow-100 hover:text-yellow-500";
      case "Hard":
        return "px-6 py-1 bg-red-100 text-red-500 hover:bg-red-100 hover:text-red-500";
      default:
        return "px-4 py-1 bg-gray-500 hover:bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 hover:bg-green-600";
      case "In Progress":
        return "bg-blue-500 hover:bg-blue-600";
      case "Unattended":
        return "bg-gray-500 hover:bg-gray-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

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
                    <span>QuestionID</span>
                  </div>
                </TableHead>
                <TableHead className="text-gray-300 items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Search className="h-6 w-6" />
                    <span>Question</span>
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
                    <BadgeInfo className="h-6 w-6" />
                    <span>Status</span>
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
              {currentProblems.map((problem) => (
                <TableRow
                  key={problem.no}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <TableCell className="font-medium py-4 pl-8 text-gray-300">
                    {problem.no}
                  </TableCell>
                  <TableCell
                    className="text-gray-100 cursor-pointer"
                    onClick={() => handleProblemClick(problem.no)}
                  >
                    {problem.question}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getDifficultyColor(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(problem.status)}`}>
                      {problem.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-gray-300 border-gray-500 hover:bg-gray-600 transition-colors"
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
          <div className="flex justify-between items-center mt-4 text-gray-300">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of{" "}
              {filteredProblems.length} problems
            </div>
            <div className="space-x-2">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                size="icon"
                className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                }
                disabled={currentPage === pageCount}
                variant="outline"
                size="icon"
                className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
