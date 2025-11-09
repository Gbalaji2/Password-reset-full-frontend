import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/register", form);
      setMsg("Account created. You can now log in ✅");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <form
        onSubmit={submit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <input
          className="w-full p-2 mb-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 rounded bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className={`bg-white/20 hover:bg-white/30 transition text-white p-2 w-full rounded font-semibold shadow ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?
          <Link to="/" className="text-pink-300 hover:underline ml-1">
            Login
          </Link>
        </p>

        {msg && (
          <p
            className={`mt-3 text-sm text-center ${
              msg.includes("created") ? "text-green-300" : "text-red-300"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}