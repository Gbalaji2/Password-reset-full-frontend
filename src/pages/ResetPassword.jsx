import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // 🆕 Added loading state

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await api.post(`/api/auth/reset-password?token=${token}`, { password });
      setMsg("Password reset successfully ✅");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Reset Password
        </h2>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Create a new password and reclaim your account.
        </p>

        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className={`bg-purple-600 hover:bg-purple-700 transition text-white p-2 w-full rounded font-semibold shadow ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"} {/* 🆕 */}
        </button>

        <p className="text-sm text-center mt-3">
          Back to
          <Link to="/" className="text-purple-600 hover:underline ml-1">
            Login
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