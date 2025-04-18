import ReactToPrint from "react-to-print";
import { useRef } from "react";

export default function ReportCard() {
  const reportRef = useRef();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Report Cards</h1>
        <ReactToPrint
          trigger={() => <button className="btn bg-green-600 text-white">Print PDF</button>}
          content={() => reportRef.current}
        />
      </div>

      <div ref={reportRef}>
        {students.map((student) => (
          <div key={student.id} className="mb-8 border rounded-xl shadow p-4 bg-white">
            <h2 className="text-xl font-semibold mb-4">
              {student.name} ({student.email})
            </h2>
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
                    <td className="p-2 border">{getGrade(student.id, subject.id)}</td>
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
