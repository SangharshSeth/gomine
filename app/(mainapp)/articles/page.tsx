import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ArticleCard = () => {
  return (
    <div className="p-8 bg-gray-900 text-gray-100 min-h-screen">
      <Card className="bg-gray-800 border-gray-700 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">
            Understanding Concurrency in Go: A Practical Example
          </CardTitle>
          <div className="mt-4">
            <Badge className="bg-blue-500 text-white">Go</Badge>
            <Badge className="bg-green-500 text-white ml-2">Concurrency</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">
            In modern software development, efficient handling of multiple tasks
            concurrently is crucial for performance. Go, with its lightweight
            Goroutines, provides an excellent way to achieve concurrency. In
            this article, we explore how Goroutines can be leveraged to improve
            the performance of network requests by comparing sequential and
            concurrent approaches.
          </p>

          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            The Problem
          </h2>
          <p className="text-gray-300 mb-4">
            Suppose you need to fetch data from multiple URLs. Doing this
            sequentially can be time-consuming. Each HTTP request must complete
            before the next one starts, which adds up to a significant amount of
            time, especially with a large number of requests. This is where
            concurrency comes into play, allowing multiple HTTP requests to be
            processed simultaneously.
          </p>

          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            Sequential Approach
          </h2>
          <p className="text-gray-300 mb-4">
            In a sequential approach, you process each URL one by one. Here's a
            function that fetches data from a given URL without using
            Goroutines:
          </p>

          <pre className="bg-gray-700 p-4 rounded-lg mb-4">
            <code className="text-gray-100 font-mono">
              {`
func withOutGoroutinesFetch(url *string) int {
  response, err := http.Get(*url)
  if err != nil {
    log.Fatal(err)
  }
  defer response.Body.Close()
  return response.StatusCode
}
            `}
            </code>
          </pre>

          <p className="text-gray-300 mb-4">
            This function makes a GET request to the specified URL and returns
            the HTTP status code. In the main function, this approach processes
            each URL sequentially, leading to longer total execution time.
          </p>

          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            Concurrent Approach with Goroutines
          </h2>
          <p className="text-gray-300 mb-4">
            By using Goroutines, you can handle multiple HTTP requests
            concurrently. Here's a function that uses Goroutines for concurrent
            processing:
          </p>

          <pre className="bg-gray-700 p-4 rounded-lg mb-4">
            <code className="text-gray-100 font-mono">
              {`
func withGoroutinesFetch(url *string, wg *sync.WaitGroup) int {
  response, err := http.Get(*url)
  if err != nil {
    log.Fatal(err)
  }
  defer response.Body.Close()
  wg.Done()
  return response.StatusCode
}
            `}
            </code>
          </pre>

          <p className="text-gray-300 mb-4">
            This function also makes a GET request but runs inside a Goroutine.
            A sync.WaitGroup is used to wait for all Goroutines to complete
            before proceeding. This concurrent approach significantly reduces
            the total execution time as requests are processed in parallel.
          </p>

          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            Benchmarking the Approaches
          </h2>
          <p className="text-gray-300 mb-4">
            The main function benchmarks both approaches. The sequential
            approach fetches URLs one by one, while the concurrent approach
            fetches all URLs simultaneously using Goroutines. The difference in
            execution time demonstrates the efficiency gained through
            concurrency.
          </p>

          <pre className="bg-gray-700 p-4 rounded-lg mb-4">
            <code className="text-gray-100 font-mono">
              {`
func main() {
  URLs := []string{
    "https://www.twitter.com/",
    "https://www.xbox.com",
    "https://www.tryhackme.com",
    "https://www.hulu.com",
    "https://www.ea.com",
    "https://www.mozilla.org",
    "https://www.sony.com",
  }

  startTime := time.Now()
  for index := range URLs {
    url := URLs[index]
    data := withOutGoroutinesFetch(&url)
    fmt.Println(data)
  }
  endTime := time.Now()
  fmt.Println("Time elapsed for normal execution: ", endTime.Sub(startTime))

  var wg sync.WaitGroup
  startTimeConcurrent := time.Now()
  for index := range URLs {
    url := URLs[index]
    wg.Add(1)
    data := withGoroutinesFetch(&url, &wg)
    fmt.Println(data)
  }

  wg.Wait()
  fmt.Println("Time elapsed for concurrent execution ", time.Since(startTimeConcurrent))
}
            `}
            </code>
          </pre>

          <h2 className="text-xl font-semibold text-gray-200 mb-2">
            Conclusion
          </h2>
          <p className="text-gray-300 mb-4">
            Leveraging Goroutines for concurrency can greatly improve the
            performance of applications that perform multiple network requests.
            By running tasks in parallel, Go efficiently utilizes available
            resources, reducing overall execution time. This practical example
            illustrates the power of Go's concurrency model and its impact on
            real-world applications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
