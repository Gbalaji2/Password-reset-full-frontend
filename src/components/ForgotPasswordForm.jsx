import { useState } from "react";
import api from "../api"; // ✅ uses your axios instance with baseURL

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/forgot-password", { email });
      setMessage(res.data.message || "If email exists, reset link sent ✅");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link ❌");
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
        Forgot Password
      </h2>

      <input
        type="email"
        placeholder="Enter your registered email"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-2 mt-4 rounded text-white font-semibold transition ${
          loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Sending..." : "Send Reset Link"}
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