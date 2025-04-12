import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";

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

import React from "react";

const Navbar = ({ menuOpen, handleMenuOpen, handleLogout }) => {
  return (
    <header className="flex w-full items-center justify-between gap-4 p-4 text-3xl uppercase">
      <Link to="/dashboard">
        <img src="/vite.svg" alt="Logo image" />
      </Link>
      <p className="hidden lg:block">Archit</p>
      <div>
        {menuOpen ? (
          <>
            <div className="bg-light absolute top-0 right-0 z-50 flex h-screen w-screen flex-col items-end p-4">
              <XIcon
                size={40}
                onClick={handleMenuOpen}
                className="text-dark cursor-pointer"
              />
              <div className="z-50 mt-5 w-full text-center">
                <ul className="flex flex-col space-y-2">
                  {MenuItems.map((item) => (
                    <Link className="text-dark" key={item.id} to={item.to}>
                      <li>{item.label}</li>
                    </Link>
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
  );
};

export default Navbar;
