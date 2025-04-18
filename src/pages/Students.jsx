import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/students/${editId}`, form);
      } else {
        await api.post("/students", form);
      }
      setForm({ name: "", email: "" });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error("Failed to save student", err);
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, email: student.email });
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          placeholder="Name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button className="btn bg-blue-600 text-white">
          {editId ? "Update" : "Add"} Student
        </button>
      </form>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={student.id} className="text-center">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.email}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="btn bg-yellow-400"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-500 text-white"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
