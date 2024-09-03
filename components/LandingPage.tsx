"use client";
import { Button } from "@/components/ui/button";
import {
  FiBook,
  FiVideo,
  FiMessageCircle,
  FiUsers,
  FiClipboard,
  FiCode,
} from "react-icons/fi";
import {
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaMicrosoft,
} from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const session = useSession();
  const router = useRouter();
  if (session && session.status === "authenticated") {
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar */}
      <header className="bg-white text-black p-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            Learn Go
          </a>
          <nav className="space-x-4">
            <Button
              onClick={() => signIn()}
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-center py-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-bg.jpg)" }}
      >
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Master Go Programming with Interactive Learning
          </h1>
          <p className="text-lg mb-8">
            Quizzes, articles, video lectures, and a vibrant community to
            accelerate your learning.
          </p>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-gray-100"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105">
              <FiClipboard className="text-black text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Quizzes</h3>
              <p>
                Test your knowledge with interactive quizzes designed to
                challenge and enhance your understanding.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105">
              <FiBook className="text-black text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Articles</h3>
              <p>
                Read in-depth articles and tutorials written by experts to
                deepen your Go programming skills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105">
              <FiVideo className="text-black text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Video Lectures</h3>
              <p>
                Watch comprehensive video lectures covering various aspects of
                Go programming.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105">
              <FiMessageCircle className="text-black text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Chat</h3>
              <p>
                Engage with fellow learners and mentors through our integrated
                chat feature.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105">
              <FiUsers className="text-black text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Groups</h3>
              <p>
                Join groups and collaborate with others who are also learning Go
                programming.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-transform transform hover:scale-105">
              <FiCode className="text-black text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Code Challenges</h3>
              <p>
                Participate in coding challenges to test and improve your skills
                with real-world problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Companies Using Our Service
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <FaGoogle className="text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <FaFacebook className="text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <FaGithub className="text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <FaTwitter className="text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <FaLinkedin className="text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md bg-white border border-gray-200">
              <FaMicrosoft className="text-3xl mx-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Learn Go. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
