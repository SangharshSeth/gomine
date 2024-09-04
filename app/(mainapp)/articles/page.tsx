"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Section {
  title: string;
  content: JSX.Element;
}

export default function GoIntroduction() {
  const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({});

  const toggleAnswer = (index: number) => {
    setShowAnswer((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const sections: Section[] = [
    {
      title: "Introduction to Go",
      content: (
        <>
          <p>
            Go, also known as Golang, is a statically typed, compiled language
            designed for simplicity and efficiency. It excels at building
            scalable, high-performance systems, thanks to its focus on
            concurrency and minimalism.
          </p>
          <p className="mt-4">
            Created by Google, Go is widely used in cloud computing,
            microservices, and large-scale distributed systems. Its clean syntax
            and powerful standard library make it easy to learn and use.
          </p>
        </>
      ),
    },
    {
      title: "Data Types",
      content: (
        <>
          <p>Go has a variety of built-in data types such as:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>int</strong>: For integer values.
            </li>
            <li>
              <strong>float64</strong>: For floating-point numbers.
            </li>
            <li>
              <strong>string</strong>: For text.
            </li>
            <li>
              <strong>bool</strong>: For boolean values.
            </li>
          </ul>
          <p className="mt-4">
            <strong>Quirk:</strong> Unlike other languages, Go doesn&apos;t have a
            char type. To work with individual characters, you convert a
            string to a slice of runes:
          </p>
          <pre className="bg-gray-800 p-4 rounded-lg text-white mt-2">
            {`str := "hello"
runes := []rune(str)
fmt.Println(runes)  // Output: [104 101 108 108 111]`}
          </pre>
          <p className="mt-4">
            <strong>MCQ:</strong> What is the default type for floating-point
            numbers in Go?
          </p>
          <div className="mt-2">
            <Button onClick={() => toggleAnswer(0)} className="bg-blue-500 text-white">
              Show Answer
            </Button>
            {showAnswer[0] && (
              <p className="mt-2">
                Answer: <strong>float64</strong>
              </p>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Input and Output",
      content: (
        <>
          <p>Go uses the fmt package for formatted I/O. For example:</p>
          <pre className="bg-gray-800 p-4 rounded-lg text-white mt-2">
            {`var name string
fmt.Print("Enter your name: ")
fmt.Scanln(&name)
fmt.Printf("Hello, %s!\\n", name)`}
          </pre>
          <p className="mt-4">
            <strong>Quirk:</strong> Go&apos;s fmt.Scanln requires a pointer to store
            input data, which might be unfamiliar to those used to higher-level
            languages.
          </p>
          <p className="mt-4">
            <strong>MCQ:</strong> Which function is used to take input from the
            user in Go?
          </p>
          <div className="mt-2">
            <Button onClick={() => toggleAnswer(1)} className="bg-blue-500 text-white">
              Show Answer
            </Button>
            {showAnswer[1] && (
              <p className="mt-2">
                Answer: <strong>fmt.Scanln</strong>
              </p>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Loops",
      content: (
        <>
          <p>Go has a single looping construct, the <strong>for</strong> loop:</p>
          <pre className="bg-gray-800 p-4 rounded-lg text-white mt-2">
            {`for i := 0; i < 5; i++ {
    fmt.Println(i)
}`}
          </pre>
          <p className="mt-4">
            <strong>Quirk:</strong> Go doesn’t have while or do-while loops. All
            loops are written using the for keyword.
          </p>
          <p className="mt-4">
            <strong>MCQ:</strong> What is the only looping construct in Go?
          </p>
          <div className="mt-2">
            <Button onClick={() => toggleAnswer(2)} className="bg-blue-500 text-white">
              Show Answer
            </Button>
            {showAnswer[2] && (
              <p className="mt-2">
                Answer: <strong>for</strong>
              </p>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Structs",
      content: (
        <>
          <p>Structs in Go are used to group related data together:</p>
          <pre className="bg-gray-800 p-4 rounded-lg text-white mt-2">
            {`type Person struct {
    Name string
    Age  int
}

p := Person{Name: "Alice", Age: 25}
fmt.Println(p)  // Output: {Alice 25}`}
          </pre>
          <p className="mt-4">
            <strong>Quirk:</strong> Go doesn&apos;t support classes like other OOP
            languages, but you can achieve similar functionality using structs
            and methods.
          </p>
          <p className="mt-4">
            <strong>MCQ:</strong> How do you define an array of structs in Go?
          </p>
          <div className="mt-2">
            <Button onClick={() => toggleAnswer(3)} className="bg-blue-500 text-white">
              Show Answer
            </Button>
            {showAnswer[3] && (
              <p className="mt-2">
                Answer: <strong>type MyStruct struct</strong> and then define an array using `var myArray []MyStruct`.
              </p>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="w-full bg-gray-900 text-white p-6">
      <Card className="w-full bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Introduction to Go</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {sections.map((section, index) => (
              <AccordionItem key={index} value={`section-${index}`}>
                <AccordionTrigger className="text-xl font-semibold text-blue-400">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>{section.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}