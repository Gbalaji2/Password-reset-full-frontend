import React, { useState } from "react";
import axios from "axios";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/forgot-password", { email });
    setMessage(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Send Reset Link
      </button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
}
