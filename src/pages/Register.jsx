import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <input
          placeholder="Name"
          className="input w-full"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="input w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="input w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn w-full bg-green-600 text-white">Register</button>
      </form>
    </div>
  );
}
