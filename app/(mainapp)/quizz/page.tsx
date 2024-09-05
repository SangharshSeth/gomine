"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quizData = [
  {
    question:
      "You're building a web server in Go using the `net/http` package. To improve performance, you want to minimize memory allocations when handling incoming HTTP requests. Which technique would you use to achieve this?",
    answers: [
      "Use global variables to store request data.",
      "Use a `sync.Pool` to reuse objects like buffers.",
      "Avoid concurrency to reduce memory usage.",
      "Use the `http.ListenAndServeTLS` method for better performance.",
    ],
    correctAnswer: 1, // Index of the correct answer
    reason:
      "Using `sync.Pool` helps reduce the number of memory allocations by reusing objects such as buffers, which is effective for minimizing memory overhead in high-throughput scenarios.",
  },
];

export default function QuizComponent() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quizData.length).fill(-1)
  );

  const handleRadioChange = (ansIndex: number, quizIndex: number) => {
    const copySelectedAnswers = [...selectedAnswers];
    copySelectedAnswers[quizIndex] = ansIndex;
    setSelectedAnswers(copySelectedAnswers);
  };

  const router = useRouter();

  return (
    <div className="w-full min-h-screen mx-auto p-8 bg-gray-900 text-white">
      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 rounded-lg ">
        <CardContent className="p-4">
          {quizData.map((quiz, quizIndex) => {
            return (
              <div
                className="flex text-white flex-col gap-4 mb-4"
                key={quizIndex}
              >
                <p className="text-md">{quiz.question}</p>
                {quiz.answers.map((answer, ansIndex) => {
                  const isSelected = selectedAnswers[quizIndex] === ansIndex;
                  return (
                    <div
                      key={ansIndex}
                      className={`flex gap-4 p-2 items-center rounded-lg border border-gray-600 shadow-sm ${
                        isSelected
                          ? "bg-gray-700 shadow-md border-gray-500"
                          : "hover:bg-gray-800"
                      } transition-all duration-200 ease-in-out`}
                    >
                      <input
                        type="radio"
                        id={`${quizIndex}-${ansIndex}`}
                        value={ansIndex}
                        checked={isSelected}
                        onChange={() => handleRadioChange(ansIndex, quizIndex)}
                        className="accent-gray-500 h-4 w-4"
                      />
                      <label
                        htmlFor={`${quizIndex}-${ansIndex}`}
                        className="cursor-pointer text-sm"
                      >
                        {answer}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
