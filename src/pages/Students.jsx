import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll_no: "",
    class: "",
    dob: "",
    teacher_id: ""
  });
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
    console.log("hi");
    
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/students/${editId}`, form);
      } else {
        await api.post("/students", form);
      }
      setForm({
        name: "",
        roll_no: "",
        class: "",
        dob: "",
        teacher_id: ""
      });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error("Failed to save student", err);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      roll_no: student.roll_no,
      class: student.class,
      dob: student.dob,
      teacher_id: student.teacher_id
    });
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
          placeholder="Roll No"
          className="input"
          value={form.roll_no}
          onChange={(e) => setForm({ ...form, roll_no: e.target.value })}
        />
        <input
          placeholder="Class"
          className="input"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          className="input"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />
        <input
          placeholder="Teacher ID"
          className="input"
          value={form.teacher_id}
          onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
        />
        <button className="btn bg-blue-600 text-white p-2 rounded-sm">
          {editId ? "Update" : "Add"} Student
        </button>
      </form>

      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Roll No</th>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">DOB</th>
            <th className="p-2 border">Teacher ID</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={student.id} className="text-center">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{student.name}</td>
              <td className="p-2 border">{student.roll_no}</td>
              <td className="p-2 border">{student.class}</td>
              <td className="p-2 border">{student.dob}</td>
              <td className="p-2 border">{student.teacher_id}</td>
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
