import { useEffect, useState } from "react";
import api from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    studentClass: "",
    dob: "",
    teacher_id: "",
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

  const convertToBackendDob = (dob) => {
    const [year, month, day] = dob.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        ...form,
        dob: convertToBackendDob(form.dob),
      };

      if (editId) {
        await api.put(`/students/${editId}`, studentData);
      } else {
        await api.post("/students", studentData);
      }

      setForm({
        name: "",
        rollNo: "",
        studentClass: "",
        dob: "",
        teacher_id: "",
      });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error("Failed to save student", err);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name || "",
      rollNo: student.rollNo || "",
      studentClass: student.studentClass || "",
      dob: student.dob ? convertToBackendDob(student.dob) : "",
      teacher_id: student.teacher?.id?.toString() || "",
    });
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

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
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 ">
        <input
          placeholder="Name"
          className="input "
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Roll No"
          className="input ml-3"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Class (1 to 12th)"
          className="input ml-3"
          value={form.studentClass}
          onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
          min={1}
          max={12}
          required
        />

        <input
          type="date"
          placeholder="Date of Birth"
          className="input ml-4"
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
          required
        />
        <input
          placeholder="Teacher ID"
          className="input ml-4"
          value={form.teacher_id}
          onChange={(e) => setForm({ ...form, teacher_id: e.target.value })}
        />
        <button className="btn bg-blue-600 text-white p-2 rounded-sm ml-4">
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
              <td className="p-2 border">{student.rollNo}</td>
              <td className="p-2 border">{student.studentClass}</td>
              <td className="p-2 border">{student.dob}</td>
              <td className="p-2 border">{student.teacher?.id}</td>
              <td className="p-2 border space-x-2">
                <button
                  className="btn bg-yellow-400 pr-2 pl-2 pt-1 pb-1 rounded-sm"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-500 text-white pr-2 pl-2 pt-1 pb-1 rounded-sm"
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
