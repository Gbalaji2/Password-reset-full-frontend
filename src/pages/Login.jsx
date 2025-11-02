import { useState } from "react";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("auth_token", res.data.token);
      setMsg("Login success ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome Back
        </h2>

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-600 hover:bg-green-700 transition text-white p-2 w-full rounded font-semibold shadow">
          Login
        </button>

        <a
          href="/forgot-password"
          className="text-blue-600 text-sm block mt-3 text-center hover:underline"
        >
          Forgot Password?
        </a>

        {msg && (
          <p className={`mt-3 text-sm text-center ${msg.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}