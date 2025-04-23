import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

import { useAuthStore } from "../../store/auth.store";

import Footer from "../ui/Footer";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error, message, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-dark-purple hidden w-1/2 items-center justify-center p-4 text-white md:flex">
        <div className="bg-dark flex h-full w-full flex-col items-center justify-center rounded-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold uppercase">Archit</h1>
          <p className="text-xl font-light">Acompanhe a sua evolução.</p>
        </div>
      </div>

      <div className="bg-dark-purple flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="bg-dark-purple w-full max-w-sm rounded p-8">
          <h2 className="mb-2 text-4xl font-medium">Acesse sua conta</h2>
          <p className="font-light text-white">
            Ainda não possui uma?{"  "}
            <Link to={"/register"} className="text-light-purple underline">
              Crie aqui
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded bg-purple-200/10 p-4 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block font-medium">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded bg-purple-200/10 p-4 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            {message && (
              <p className="mb-4 text-center text-orange-400">{message}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary-blue flex w-full justify-center rounded p-3 font-semibold text-white transition-colors hover:bg-purple-700"
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Entrar"}
            </button>
          </form>
          <footer className="mt-10">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
