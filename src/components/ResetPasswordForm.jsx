import { useState } from "react";
import api from "../api"; // ✅ use your configured axios instance
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  const token = params.get("token");
  const email = params.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/reset-password", { token, email, password });
      setMessage(res.data.message || "Password successfully reset ✅");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto mt-10"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Reset Password
      </h2>

      <input
        type="password"
        placeholder="Enter your new password"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 mt-4 rounded text-white font-semibold transition ${
          loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>

      {message && (
        <p
          className={`mt-3 text-sm text-center ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}