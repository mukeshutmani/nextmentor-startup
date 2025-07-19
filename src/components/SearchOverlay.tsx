// components/SearchOverlay.tsx
"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";


const mentors = [
  { id: 1, name: "Priya Shukla", skill: "JavaScript" },
  { id: 2, name: "Mukesh Kumar", skill: "React" },
  { id: 3, name: "Aisha Noor", skill: "Python" },
  { id: 4, name: "Zaid Ali", skill: "Node.js" },
  { id: 5, name: "Fatima Rizwan", skill: "Data Science" },
];

export default function SearchOverlay({ onClose }: { onClose: () => void }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMentors, setFilteredMentors] = useState(mentors);
    const [debouncedTerm, setDebouncedTerm] = useState("");

  // Optional: Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

   
  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [searchTerm]);



  // Filter mentors based on debounced input
  useEffect(() => {
    if (debouncedTerm.trim() === "") {
      setFilteredMentors([]);
      return;
    }

    const filtered = mentors.filter((mentor) =>
      `${mentor.name} ${mentor.skill}`.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
    setFilteredMentors(filtered);
  }, [debouncedTerm]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-40 px-4">
      <div className="bg-slate-600 w-full max-w-xl p-6 rounded-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-white">Search Mentors</h2>
        <input
          type="text"
          placeholder="Search by skill, name, domain..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="w-full text-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

          {searchTerm.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-slate-500 border border-gray-300 rounded-md shadow-lg mt-2 z-10 max-h-60 overflow-y-auto">
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="p-3 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(mentor.name); // optional: set input
                      // You can also navigate to profile here
                      onClose(); // close overlay
                    }}
                  >
                    <div className="font-semibold text-gray-100">{mentor.name}</div>
                    <div className="text-sm text-gray-100">{mentor.skill}</div>
                  </div>
                ))
              ) : (
                <p className="p-3 text-gray-100">No suggestions found.</p>
              )}
            </div>
          )}

      </div>
    </div>
  );
}
