"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
  {
    question:
      "In a Go microservice, you're using channels for communication between goroutines. After running the application in production, you notice that one of your goroutines is stuck and not processing any messages. What could be the most likely cause of this issue?",
    answers: [
      "The channel is unbuffered and not being consumed.",
      "The goroutine is blocked by a `select` statement with no default case.",
      "The channel was closed unexpectedly.",
      "The channel buffer size is too large.",
    ],
    correctAnswer: 1, // Index of the correct answer
    reason:
      "If a `select` statement in a goroutine lacks a `default` case and none of the channels are ready, the goroutine will block, leading to unprocessed messages.",
  },
  {
    question:
      "You’re working with a large Go codebase and want to improve the modularity of your project by organizing your code into multiple packages. Which of the following is a best practice when structuring a Go project for modularity?",
    answers: [
      "Use a single `main` package to keep things simple.",
      "Place all code in the `internal` package to prevent external use.",
      "Group related functions and types in well-defined packages and avoid circular dependencies.",
      "Use multiple `vendor` directories for each package.",
    ],
    correctAnswer: 2, // Index of the correct answer
    reason:
      "Organizing code into well-defined packages and avoiding circular dependencies enhances modularity and maintainability, which is crucial for large codebases.",
  },
  {
    question:
      "You’re implementing a logging system for a Go application that runs in a distributed environment. Which approach would you take to ensure that logs from different instances of your application can be traced and correlated effectively?",
    answers: [
      "Use a unique prefix for each log message.",
      "Log messages directly to the console.",
      "Implement a structured logging system with context propagation.",
      "Log messages only when an error occurs.",
    ],
    correctAnswer: 2, // Index of the correct answer
    reason:
      "Structured logging with context propagation allows logs to include metadata and trace identifiers, which are essential for correlating logs across distributed services.",
  },
  {
    question:
      "You’re developing a Go application that needs to interact with a third-party REST API. The API requests have high latency, and you need to optimize your application’s performance while ensuring that the API rate limits are respected. What is the best approach to handle this scenario?",
    answers: [
      "Use a single goroutine to send requests sequentially.",
      "Implement a rate-limiting mechanism using a token bucket algorithm.",
      "Send all requests concurrently to reduce overall response time.",
      "Use exponential backoff with retries on failure.",
    ],
    correctAnswer: 1, // Index of the correct answer
    reason:
      "A rate-limiting mechanism such as a token bucket algorithm helps manage request rates and ensures compliance with API rate limits while optimizing performance.",
  },
  {
    question:
      "You’ve implemented a Go service that processes messages from an SQS queue. Occasionally, the processing of some messages fails, and you want to ensure that these messages are retried after a delay without blocking the processing of other messages. What pattern or technique would you use to implement this?",
    answers: [
      "Use a simple loop with `time.Sleep` to retry failed messages.",
      "Implement a worker pool with retry logic and exponential backoff.",
      "Move the failed messages to a separate queue for later processing.",
      "Use mutex locks to ensure message order and retry failed messages.",
    ],
    correctAnswer: 1, // Index of the correct answer
    reason:
      "A worker pool with retry logic and exponential backoff efficiently handles message retries and avoids blocking other message processing, improving overall reliability.",
  },
  {
    question:
      "In a distributed Go application, you need to coordinate state between multiple services. One approach is to use a distributed consensus algorithm like Raft. What are the key considerations when implementing Raft in a Go application?",
    answers: [
      "Ensure that all nodes have equal CPU power to prevent leader election issues.",
      "Implement Raft directly in your application to control every aspect of the protocol.",
      "Use a library that provides a Raft implementation, and focus on persistence, log replication, and state machine consistency.",
      "Avoid using Raft as it’s too complex; use simple locks instead.",
    ],
    correctAnswer: 2, // Index of the correct answer
    reason:
      "Using a library for Raft implementation simplifies the integration, while focusing on key aspects like persistence and log replication ensures the correct functioning of the consensus algorithm.",
  },
  {
    question:
      "You’re tasked with improving the resilience of a Go application that connects to a database. The application occasionally faces connection timeouts or dropped connections. What techniques can you apply to handle these situations gracefully?",
    answers: [
      "Wrap database calls with circuit breaker logic.",
      "Increase the database connection pool size indefinitely.",
      "Use context with a very short timeout to minimize delays.",
      "Ignore the errors and rely on automatic reconnections.",
    ],
    correctAnswer: 0, // Index of the correct answer
    reason:
      "Circuit breaker logic helps manage and handle transient errors, preventing excessive load on the database and improving resilience to connection issues.",
  },
  {
    question:
      "You’re building a Go service that requires processing large JSON payloads. Performance is critical, and memory usage needs to be minimized. Which approach should you take?",
    answers: [
      "Use `json.Unmarshal` directly into structs and ensure all fields are present.",
      "Stream the JSON decoding using `json.Decoder` and process the data incrementally.",
      "Load the entire JSON into memory and then process it.",
      "Use a third-party library that supports faster JSON parsing.",
    ],
    correctAnswer: 1, // Index of the correct answer
    reason:
      "Streaming JSON decoding with `json.Decoder` helps process large payloads incrementally, reducing memory usage and improving performance.",
  },
];

export default function QuizComponent() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quizData.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleAnswerChange = (questionIndex: number, value: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = parseInt(value);
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleRestart = () => {
    setSelectedAnswers(new Array(quizData.length).fill(-1));
    setShowResults(false);
    router.refresh(); // Force a refresh of the page
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="w-full max-w-3xl mx-auto bg-gray-900 text-white">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            You answered {score} out of {quizData.length} questions correctly.
          </CardDescription>
          <CardDescription>
            {quizData.map((item, index) => {
              const isSelectedCorrect =
                selectedAnswers[index] === item.correctAnswer;
              const selectedAnswer = item.answers[selectedAnswers[index]];
              const correctAnswer = item.answers[item.correctAnswer];

              return (
                <div key={index} className="my-4">
                  <p className="font-semibold">{item.question}</p>
                  <p
                    className={
                      isSelectedCorrect ? "text-green-400" : "text-red-400"
                    }
                  >
                    {+selectedAnswer !== -1
                      ? `You selected: ${selectedAnswer}`
                      : "No answer selected"}
                  </p>
                  <p className="font-medium">Correct answer: {correctAnswer}</p>
                  <p>{item.reason}</p>
                </div>
              );
            })}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRestart}>Restart Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 text-white">
      {quizData.map((item, index) => (
        <Card key={index} className="bg-gray-800">
          <CardContent className="border text-white flex flex-col gap-4">
            <p className="font-semibold">{item.question}</p>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(index, value)}
              value={
                selectedAnswers[index] !== -1
                  ? selectedAnswers[index].toString()
                  : ""
              }
            >
              {item.answers.map((answer, answerIndex) => (
                <div key={answerIndex} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={`answer-${index}-${answerIndex}`}
                    value={answerIndex.toString()}
                    className="cursor-pointer text-white border-gray-400"
                    style={{
                      accentColor:
                        selectedAnswers[index] === answerIndex
                          ? "#4CAF50"
                          : undefined,
                    }}
                  />
                  <Label htmlFor={`answer-${index}-${answerIndex}`}>
                    {answer}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
      <CardFooter>
        <Button onClick={() => setShowResults(true)}>Submit Quiz</Button>
      </CardFooter>
    </div>
  );
}
