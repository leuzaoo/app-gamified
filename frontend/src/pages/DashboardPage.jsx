import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Loader2, Loader2Icon, MenuIcon, XIcon } from "lucide-react";

import { useAuthStore } from "./../store/auth.store";

const MenuItems = [
  {
    id: 1,
    label: "Meu perfil",
    to: "/perfil",
  },
  {
    id: 2,
    label: "Meus treinos",
    to: "/treinos",
  },
];

const DashboardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout, isLoading } = useAuthStore();

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <header className="flex w-full items-center justify-between gap-4 p-4 text-3xl uppercase">
        <Link to="/dashboard">
          <img src="/vite.svg" alt="Logo image" />
        </Link>
        <p className="hidden lg:block">Archit</p>
        <div>
          {menuOpen ? (
            <>
              <div className="bg-light absolute top-0 right-0 flex h-screen w-screen flex-col items-end p-4">
                <XIcon
                  size={40}
                  onClick={handleMenuOpen}
                  className="text-dark cursor-pointer"
                />
                <div className="mt-5 w-full text-center">
                  <ul className="flex flex-col space-y-2">
                    {MenuItems.map((item) => (
                      <>
                        <Link className="text-dark" id={item.id} to={item.to}>
                          <li>{item.label}</li>
                        </Link>
                      </>
                    ))}
                    <button
                      className="text-dark flex cursor-pointer justify-center uppercase"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <MenuIcon
              size={40}
              onClick={handleMenuOpen}
              className="cursor-pointer"
            />
          )}
        </div>
      </header>
      <section className="px-4">
        <h1 className="text-2xl uppercase">Status do jogador</h1>
        <hr className="mt-2 border-t opacity-20" />
        <div className="mt-2 flex items-center justify-between space-y-2 text-2xl uppercase">
          <span>{user.username}</span>
          <span>Level: 22</span>
        </div>
        <div className="mt-2 text-sm uppercase">
          <div className="flex items-center justify-between">
            <p>Nome: {user.name}</p>
            <p>Idade: 25</p>
          </div>
          <p>Título: Caçador de onça</p>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
