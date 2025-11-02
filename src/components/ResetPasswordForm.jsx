import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/reset-password", { token, email, password });
    setMessage(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
        Reset Password
      </button>
      {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
    </form>
  );
}
