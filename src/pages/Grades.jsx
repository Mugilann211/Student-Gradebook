import { useEffect, useState } from "react";
import api from "../services/api";

export default function Grades() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ studentId: "", subjectId: "", score: "" });
  const [editId, setEditId] = useState(null);

  const fetchAll = async () => {
    try {
      const [gradesRes, studentsRes, subjectsRes] = await Promise.all([
        api.get("/grades"),
        api.get("/students"),
        api.get("/subjects"),
      ]);
      setGrades(gradesRes.data);
      setStudents(studentsRes.data);
      setSubjects(subjectsRes.data);
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
      if (editId) {
        await api.put(`/grades/${editId}`, form);
      } else {
        await api.post("/grades", form);
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
      studentId: grade.studentId,
      subjectId: grade.subjectId,
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
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <select
          className="input"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={form.subjectId}
          onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
        >
          <option value="">Select Subject</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="input"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
        />

        <button className="btn bg-blue-600 text-white">
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
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, i) => {
            const student = students.find((s) => s.id === grade.studentId);
            const subject = subjects.find((s) => s.id === grade.subjectId);
            return (
              <tr key={grade.id} className="text-center">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{student?.name || "N/A"}</td>
                <td className="p-2 border">{subject?.name || "N/A"}</td>
                <td className="p-2 border">{grade.score}</td>
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
