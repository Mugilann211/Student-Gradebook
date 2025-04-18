import { useEffect, useState } from "react";
import api from "../services/api";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editId, setEditId] = useState(null);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/subjects/${editId}`, form);
      } else {
        await api.post("/subjects", form);
      }
      setForm({ name: "" });
      setEditId(null);
      fetchSubjects();
    } catch (err) {
      console.error("Failed to save subject", err);
    }
  };

  const handleEdit = (subject) => {
    setForm({ name: subject.name });
    setEditId(subject.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error("Failed to delete subject", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subject Management</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          placeholder="Subject Name"
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <button className="btn bg-blue-600 text-white">
          {editId ? "Update" : "Add"} Subject
        </button>
      </form>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Subject Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, i) => (
            <tr key={subject.id} className="text-center">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{subject.name}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="btn bg-yellow-400"
                  onClick={() => handleEdit(subject)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-500 text-white"
                  onClick={() => handleDelete(subject.id)}
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
