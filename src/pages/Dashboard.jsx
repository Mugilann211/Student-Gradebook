import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const sections = [
    { name: "Students", link: "/students", color: "bg-blue-500" },
    { name: "Subjects", link: "/subjects", color: "bg-green-500" },
    { name: "Grades", link: "/grades", color: "bg-yellow-500" },
    { name: "Report Card", link: "/report", color: "bg-purple-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link
            key={section.name}
            to={section.link}
            className={`${section.color} text-white p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center`}
          >
            <h2 className="text-xl font-semibold">{section.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
