import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/login", form);
      setMsg("Login successful ✅");
      // optionally: navigate("/dashboard")
    } catch (err) {
      setMsg(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Login
        </h2>

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className={`bg-indigo-600 hover:bg-indigo-700 transition text-white p-2 w-full rounded font-semibold shadow ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🟢 Add this below */}
        <p className="text-sm text-center mt-3">
          Forgot your password?{" "}
          <Link
            to="/forgot-password"
            className="text-indigo-600 hover:underline"
          >
            Reset here
          </Link>
        </p>

        <p className="text-sm text-center mt-2">
          Don’t have an account?
          <Link to="/register" className="text-indigo-600 hover:underline ml-1">
            Register
          </Link>
        </p>

        {msg && (
          <p
            className={`mt-3 text-sm text-center ${
              msg.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}