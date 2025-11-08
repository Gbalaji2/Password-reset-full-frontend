import { useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // 🆕 added loading state

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🆕 start loading
    setMsg(""); // clear previous message

    try {
      await api.post("/forgot-password", { email });
      setMsg("Reset link sent to your email ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    } finally {
      setLoading(false); // 🆕 stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          No worries. We will send a password reset link.
        </p>

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className={`bg-orange-500 hover:bg-orange-600 transition text-white p-2 w-full rounded font-semibold shadow ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading} // 🆕 disable button while loading
        >
          {loading ? "Sending..." : "Send Reset Link"} {/* 🆕 show status */}
        </button>

        <p className="text-sm text-center mt-3">
          Back to
          <Link to="/" className="text-orange-600 hover:underline ml-1">
            Login
          </Link>
        </p>

        {msg && (
          <p
            className={`mt-3 text-sm text-center ${
              msg.includes("sent") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}