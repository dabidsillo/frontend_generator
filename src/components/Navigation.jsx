import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavItem from "./NavItem";

export default function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const { logout } = useAuth({ middleware: "auth" });

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex gap-2">
            <h1 className="p-2 rounded-md shrink-0 flex items-center">
              FrontEnd
              <span className="font-bold">Generator</span>
            </h1>
            <NavItem href="/" active={pathname === "/"}>
              Dashboard
            </NavItem>
            {/* <NavItem href="/about" active={pathname === "/about"}>
              Sobre nosotros
            </NavItem> */}
          </div>
          <div className="py-2">
            <button
              className="bg-blue-800 text-white p-2 rounded-md text-sm hover:bg-blue-600 cursor-pointer"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
