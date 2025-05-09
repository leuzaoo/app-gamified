import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";

import { useAuthStore } from "../../store/auth.store";

const MenuItems = [
  { id: 1, label: "Meu perfil", to: "/perfil" },
  { id: 2, label: "Meus treinos", to: "/workouts" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleMenuOpen = () => setMenuOpen((open) => !open);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="flex w-full items-center justify-between gap-4 p-4 text-3xl uppercase">
      <Link to="/dashboard">
        <img src="/images/logo.svg" alt="Logo" className="size-10" />
      </Link>

      <div>
        {menuOpen ? (
          <div className="bg-light absolute top-0 right-0 z-50 flex h-screen w-screen flex-col items-end p-4">
            <XIcon
              size={40}
              onClick={handleMenuOpen}
              className="text-dark cursor-pointer"
            />
            <nav className="mt-5 w-full text-center">
              <ul className="flex flex-col space-y-2">
                {MenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="text-dark block py-2"
                    onClick={handleMenuOpen}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="text-dark mt-4 block uppercase"
                >
                  Sair
                </button>
              </ul>
            </nav>
          </div>
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
