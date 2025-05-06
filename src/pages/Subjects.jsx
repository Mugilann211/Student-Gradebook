import { useEffect, useState } from "react";
import api from "../services/api";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", teacherId: "" });
  const [editId, setEditId] = useState(null);

  const fetchSubjects = async () => {
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data);
      console.log("Subjects:", res.data);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  // const fetchTeachers = async () => {
  //   try {
  //     const res = await api.get("/teachers");
  //     setTeachers(res.data);
  //     console.log("Teachers:", res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch teachers", err);
  //   }
  // };

  useEffect(() => {
    fetchSubjects();
    // fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      teacher: { id: Number(form.teacherId) },
    };
    console.log("Payload being sent:", payload);
    try {
      if (editId) {
        console.log("Sending PUT to:", `/subjects/${editId}`, payload);
        const response = await api.put(`/subjects/${editId}`, payload);
        console.log("Response from PUT:", response);
      } else {
        console.log("Sending POST:", payload);
        const response = await api.post("/subjects", payload);
        console.log("Response from POST:", response);
      }
      setForm({ name: "", teacherId: "" });
      setEditId(null);
      fetchSubjects();
    } catch (err) {
      console.error("❌ Failed to save subject", err);
      alert("Failed to save subject. Check console.");
    }
  };

  const handleEdit = (subject) => {
    setForm({
      name: subject.name,
      teacherId: subject.teacher?.id || "",
    });
    setEditId(subject.id);
    console.log(subject.id);
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
          required
        />
        {/* <select
          className="input ml-4"
          value={form.teacherId}
          onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
          
        > 
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </option>
          ))}
        </select> */}
        <button className="btn bg-blue-600 text-white p-1 ml-6 rounded-sm">
          {editId ? "Update" : "Add"} Subject
        </button>
      </form>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Subject Name</th>
            <th className="p-2 border">Teacher</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, i) => (
            <tr key={subject.id} className="text-center">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{subject.name}</td>
              <td className="p-2 border">
                {subject.teacher ? subject.teacher.name : "No Teacher Assigned"}
              </td>
              <td className="p-2 border space-x-2">
                <button
                  type="button"
                  className="btn bg-yellow-400"
                  onClick={() => handleEdit(subject)}
                >
                  Edit
                </button>
                <button
                  type="button"
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
