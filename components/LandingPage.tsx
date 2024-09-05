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
import Image from "next/image"; // Import Image component from Next.js
import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

export default function LandingPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col bg-circular-gradient text-white">
      {/* Navbar */}
      <header className="p-4 sticky top-0 z-50 bg-circular-gradient bg-opacity-100 shadow-sm shadow-slate-600">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-white">
            Learn Go
          </a>
          <nav className="space-x-4">
            <Button
              variant="outline"
              className="text-slate-950"
              onClick={() => signIn()}
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-cover bg-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Master Go Programming with Interactive Learning
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Quizzes, articles, video lectures, and a vibrant community to
              accelerate your learning.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="text-slate-950"
                onClick={() => signIn()}
              >
                Get Started
              </Button>
              <Button variant="outline" className="text-slate-950">
                Golang Docs
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <Image
              src="/Gopher.svg"
              alt="Gopher"
              width={400}
              height={400}
              className="max-w-full h-auto"
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 text-white">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105">
              <FiUsers className="text-white text-5xl mb-4 mx-auto" />
              <h3 className="text-4xl font-bold mb-2 text-white">50,000+</h3>
              <p className="text-lg text-gray-400">Active Users</p>
            </div>
            <div className="p-6 rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105">
              <FiClipboard className="text-white text-5xl mb-4 mx-auto" />
              <h3 className="text-4xl font-bold mb-2 text-white">120,000+</h3>
              <p className="text-lg text-gray-400">
                Challenges Completed Monthly
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md border border-gray-700 transition-transform transform hover:scale-105">
              <FiMessageCircle className="text-white text-5xl mb-4 mx-auto" />
              <h3 className="text-4xl font-bold mb-2 text-white">5,000+</h3>
              <p className="text-lg text-gray-400">Community Contributions</p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-sm border border-gray-700 transition-transform transform hover:scale-105 ">
              <FiClipboard className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-white">Quizzes</h3>
              <p className="text-gray-400">
                Test your knowledge with interactive quizzes designed to
                challenge and enhance your understanding.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-sm border border-gray-700 transition-transform transform hover:scale-105 ">
              <FiBook className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Articles
              </h3>
              <p className="text-gray-400">
                Read in-depth articles and tutorials written by experts to
                deepen your Go programming skills.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-sm border border-gray-700 transition-transform transform hover:scale-105 ">
              <FiVideo className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Video Lectures
              </h3>
              <p className="text-gray-400">
                Watch comprehensive video lectures covering various aspects of
                Go programming.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-sm border border-gray-700 transition-transform transform hover:scale-105 ">
              <FiMessageCircle className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-white">Chat</h3>
              <p className="text-gray-400">
                Engage with fellow learners and mentors through our integrated
                chat feature.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-sm border border-gray-700 transition-transform transform hover:scale-105 ">
              <FiUsers className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-white">Groups</h3>
              <p className="text-gray-400">
                Join groups and collaborate with others who are also learning Go
                programming.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-sm border border-gray-700 transition-transform transform hover:scale-105 ">
              <FiCode className="text-white text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-white">
                Code Challenges
              </h3>
              <p className="text-gray-400">
                Participate in coding challenges to test and improve your skills
                with real-world problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Companies Using Our Service
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md border border-gray-700">
              <FaGoogle className="text-white text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md border border-gray-700">
              <FaFacebook className="text-white text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md border border-gray-700">
              <FaGithub className="text-white text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md border border-gray-700">
              <FaTwitter className="text-white text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md border border-gray-700">
              <FaLinkedin className="text-white text-3xl mx-4" />
            </div>
            <div className="flex items-center justify-center p-6 rounded-lg shadow-md border border-gray-700">
              <FaMicrosoft className="text-white text-3xl mx-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-6 mt-auto ">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Learn Go. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
