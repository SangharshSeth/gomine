"use client";
import { useRouter } from "next/navigation";

export default function ProblemDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold">Problem Details</h1>
      <p className="mt-4 text-gray-300">Showing details for problem ID: {id}</p>
      <button
        onClick={() => router.back()}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Go Back
      </button>
      {/* Add your problem details content here */}
    </div>
  );
}