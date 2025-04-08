import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { useAuthStore } from "../store/auth.store";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, error } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate("/set-username");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-center text-2xl">Register</h2>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="mb-2 w-full border p-2"
          required
        />
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="mb-2 w-full border p-2"
          required
        />
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mb-4 w-full border p-2"
          required
        />

        {error && <p className="mt-2 text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
