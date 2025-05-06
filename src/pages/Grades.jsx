// import { useEffect, useState } from "react";
// import Select from "react-select";
// import api from "../services/api";

// export default function Grades() {
//   const [grades, setGrades] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [form, setForm] = useState({ studentId: "", subjectId: "", score: "" });
//   const [editId, setEditId] = useState(null);
//   const [gradeStats, setGradeStats] = useState({ average: 0, highest: 0, lowest: 0 });

//   const fetchAll = async () => {
//     try {
//       const [gradesRes, studentsRes, subjectsRes] = await Promise.all([
//         api.get("/grades"),
//         api.get("/students"),
//         api.get("/subjects"),
//       ]);

//       const data = gradesRes.data;
//       setGrades(data);
//       setStudents(studentsRes.data);
//       setSubjects(subjectsRes.data);

//       if (data.length > 0) {
//         const allScores = data.map((g) => g.score);
//         const total = allScores.reduce((sum, score) => sum + score, 0);
//         const avg = (total / allScores.length).toFixed(2);
//         const max = Math.max(...allScores);
//         const min = Math.min(...allScores);

//         setGradeStats({ average: avg, highest: max, lowest: min });
//       } else {
//         setGradeStats({ average: 0, highest: 0, lowest: 0 });
//       }

//     } catch (err) {
//       console.error("Failed to fetch data", err);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         student: { id: form.studentId },
//         subject: { id: form.subjectId },
//         score: parseFloat(form.score),
//       };
  
//       if (editId) {
//         await api.put(`/grades/${editId}`, payload);
//       } else {
//         await api.post("/grades", payload);
//       }
  
//       setForm({ studentId: "", subjectId: "", score: ""});
//       setEditId(null);
//       fetchAll();
//     } catch (err) {
//       console.error("Failed to save grade", err);
//     }
//   };
  

//   const handleEdit = (grade) => {
//     setForm({
//       studentId: grade.student?.id || grade.studentId,
//       subjectId: grade.subject?.id || grade.subjectId,
//       score: grade.score,
//     });
//     setEditId(grade.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/grades/${id}`);
//       fetchAll();
//     } catch (err) {
//       console.error("Failed to delete grade", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

//       {/* Grade Statistics */}
//       <div className="mb-6 bg-gray-100 p-4 rounded-md shadow">
//         <h2 className="text-lg font-semibold mb-2">Grade Statistics</h2>
//         <div className="flex gap-6 text-sm">
//           <div>📊 Average Score: <strong>{gradeStats.average}</strong></div>
//           <div>🔼 Highest Score: <strong>{gradeStats.highest}</strong></div>
//           <div>🔽 Lowest Score: <strong>{gradeStats.lowest}</strong></div>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//         <Select
//           className="input"
//           options={students.map((s) => ({ value: s.id, label: s.name }))}
//           placeholder="Select Student"
//           value={
//             students
//               .map((s) => ({ value: s.id, label: s.name }))
//               .find((opt) => opt.value === form.studentId) || null
//           }
//           onChange={(selected) =>
//             setForm({ ...form, studentId: selected ? selected.value : "" })
//           }
//         />

//         <Select
//           className="input"
//           options={subjects.map((s) => ({ value: s.id, label: s.name }))}
//           placeholder="Select Subject"
//           value={
//             subjects
//               .map((s) => ({ value: s.id, label: s.name }))
//               .find((opt) => opt.value === form.subjectId) || null
//           }
//           onChange={(selected) =>
//             setForm({ ...form, subjectId: selected ? selected.value : "" })
//           }
//         />

//         <input
//           type="number"
//           className="input"
//           placeholder="Score"
//           value={form.score}
//           onChange={(e) => setForm({ ...form, score: e.target.value })}
//         />

//         <button className="btn bg-blue-600 text-white p-1 rounded-sm ml-4">
//           {editId ? "Update" : "Add"} Grade
//         </button>
//       </form>

//       <table className="w-full table-auto border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 border">#</th>
//             <th className="p-2 border">Student</th>
//             <th className="p-2 border">Subject</th>
//             <th className="p-2 border">Score</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {grades.map((grade, i) => {
//             const studentId = grade.student?.id || grade.studentId;
//             const subjectId = grade.subject?.id || grade.subjectId;

//             const student = students.find((s) => s.id === studentId);
//             const subject = subjects.find((s) => s.id === subjectId);

//             return (
//               <tr key={grade.id} className="text-center">
//                 <td className="p-2 border">{i + 1}</td>
//                 <td className="p-2 border">{student?.name || "N/A"}</td>
//                 <td className="p-2 border">{subject?.name || "N/A"}</td>
//                 <td className="p-2 border">{grade.score}</td>
//                 <td className="p-2 border space-x-2">
//                   <button
//                     className="btn bg-yellow-400"
//                     onClick={() => handleEdit(grade)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn bg-red-500 text-white"
//                     onClick={() => handleDelete(grade.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../services/api";

// Grade calculation function
function calculateGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  if (score >= 50) return "E";
  return "F";
}

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ studentId: "", subjectId: "", score: "" });
  const [editId, setEditId] = useState(null);
  const [gradeStats, setGradeStats] = useState({ average: 0, highest: 0, lowest: 0 });

  const fetchAll = async () => {
    try {
      const [gradesRes, studentsRes, subjectsRes] = await Promise.all([
        api.get("/grades"),
        api.get("/students"),
        api.get("/subjects"),
      ]);

      const data = gradesRes.data;
      setGrades(data);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);

      if (data.length > 0) {
        const allScores = data.map((g) => g.score);
        const total = allScores.reduce((sum, score) => sum + score, 0);
        const avg = (total / allScores.length).toFixed(2);
        const max = Math.max(...allScores);
        const min = Math.min(...allScores);

        setGradeStats({ average: avg, highest: max, lowest: min });
      } else {
        setGradeStats({ average: 0, highest: 0, lowest: 0 });
      }

    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const score = parseFloat(form.score);
      const payload = {
        student: { id: form.studentId },
        subject: { id: form.subjectId },
        score,
        grade: calculateGrade(score), // Include grade letter in the payload
      };

      if (editId) {
        await api.put(`/grades/${editId}`, payload);
      } else {
        await api.post("/grades", payload);
      }

      setForm({ studentId: "", subjectId: "", score: "" });
      setEditId(null);
      fetchAll();
    } catch (err) {
      console.error("Failed to save grade", err);
    }
  };

  const handleEdit = (grade) => {
    setForm({
      studentId: grade.student?.id || grade.studentId,
      subjectId: grade.subject?.id || grade.subjectId,
      score: grade.score,
    });
    setEditId(grade.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/grades/${id}`);
      fetchAll();
    } catch (err) {
      console.error("Failed to delete grade", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Grades Management</h1>

      {/* Grade Statistics */}
      <div className="mb-6 bg-gray-100 p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold mb-2">Grade Statistics</h2>
        <div className="flex gap-6 text-sm">
          <div>📊 Average Score: <strong>{gradeStats.average}</strong></div>
          <div>🔼 Highest Score: <strong>{gradeStats.highest}</strong></div>
          <div>🔽 Lowest Score: <strong>{gradeStats.lowest}</strong></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <Select
          className="input"
          options={students.map((s) => ({ value: s.id, label: s.name }))}
          placeholder="Select Student"
          value={
            students
              .map((s) => ({ value: s.id, label: s.name }))
              .find((opt) => opt.value === form.studentId) || null
          }
          onChange={(selected) =>
            setForm({ ...form, studentId: selected ? selected.value : "" })
          }
        />

        <Select
          className="input"
          options={subjects.map((s) => ({ value: s.id, label: s.name }))}
          placeholder="Select Subject"
          value={
            subjects
              .map((s) => ({ value: s.id, label: s.name }))
              .find((opt) => opt.value === form.subjectId) || null
          }
          onChange={(selected) =>
            setForm({ ...form, subjectId: selected ? selected.value : "" })
          }
        />

        <input
          type="number"
          className="input"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
        />

        <button className="btn bg-blue-600 text-white p-1 rounded-sm ml-4">
          {editId ? "Update" : "Add"} Grade
        </button>
      </form>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Student</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Grade</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, i) => {
            const studentId = grade.student?.id || grade.studentId;
            const subjectId = grade.subject?.id || grade.subjectId;

            const student = students.find((s) => s.id === studentId);
            const subject = subjects.find((s) => s.id === subjectId);

            return (
              <tr key={grade.id} className="text-center">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{student?.name || "N/A"}</td>
                <td className="p-2 border">{subject?.name || "N/A"}</td>
                <td className="p-2 border">{grade.score}</td>
                <td className="p-2 border">{grade.grade || calculateGrade(grade.score)}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="btn bg-yellow-400"
                    onClick={() => handleEdit(grade)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => handleDelete(grade.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
