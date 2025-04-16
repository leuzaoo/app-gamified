import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Loader2Icon } from "lucide-react";
import Footer from "../components/ui/Footer";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, isLoading, error, message } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate("/set-username");
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-dark-purple hidden w-1/2 items-center justify-center p-4 text-white md:flex">
        <div className="bg-dark flex h-full w-full flex-col items-center justify-center rounded-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold uppercase">Archit</h1>
          <p className="text-xl font-light">
            Prepare-se para transformar seus treinos!
          </p>
        </div>
      </div>

      <div className="bg-dark-purple flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="bg-dark-purple w-full max-w-sm rounded p-8">
          <h2 className="mb-2 text-4xl font-medium text-white">
            Crie sua conta
          </h2>
          <p className="font-light text-white">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-light-purple underline">
              Acesse aqui
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="mb-4">
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded bg-purple-200/10 p-4 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <input
                name="email"
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded bg-purple-200/10 p-4 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <input
                name="password"
                type="password"
                placeholder="Sua senha"
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
              {isLoading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Criar Conta"
              )}
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

export default RegisterForm;
