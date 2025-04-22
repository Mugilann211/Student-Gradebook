import ReactToPrint from "react-to-print";
console.log("ReactToPrint:", ReactToPrint); 

import { useRef, useState, useEffect } from "react";
import api from "../services/api"; 

export default function ReportCard() {
  const reportRef = useRef();

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);

  const fetchData = async () => {
    try {
      const [studentsRes, subjectsRes, gradesRes] = await Promise.all([
        api.get("/students"),
        api.get("/subjects"),
        api.get("/grades"),
      ]);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
      setGrades(gradesRes.data);
    } catch (err) {
      console.error("Error fetching report data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getGrade = (studentId, subjectId) => {
    const entry = grades.find(
      (grade) => grade.student_id === studentId && grade.subject_id === subjectId
    );
    return entry ? entry.score : "N/A";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Report Cards</h1>
        <ReactToPrint
          trigger={() => (
            <button className="btn bg-green-600 text-white px-4 py-2 rounded">
              Print PDF
            </button>
          )}
          content={() => reportRef.current}
        />
      </div>

      <div ref={reportRef}>
        {students.map((student) => (
          <div
            key={student.id}
            className="mb-8 border rounded-xl shadow p-4 bg-white"
          >
            <h2 className="text-xl font-semibold mb-4">
              {student.name} ({student.roll_no})
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              Class: {student.class} | DOB: {student.dob}
            </p>
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Score</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td className="p-2 border">{subject.name}</td>
                    <td className="p-2 border">
                      {getGrade(student.id, subject.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
