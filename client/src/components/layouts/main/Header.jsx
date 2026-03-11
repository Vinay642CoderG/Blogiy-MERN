import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import useAuth from "@/hooks/useAuth";
import { Dropdown } from "@/components/ui";

const navigationLinks = [
  { name: "Home", href: "/", id: "home" },
  { name: "About", href: "/about", id: "about" },
  { name: "Contact", href: "/contact", id: "contact" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Debug logging
  console.log("Header - user:", user);
  console.log("Header - isAuthenticated:", isAuthenticated);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
    setIsOpen(false);
  };

  const isActiveLink = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const NavLink = ({ href, children, onClick, mobile = false }) => (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        mobile
          ? "block px-4 py-3 text-base font-medium border-b border-purple-100 transition-colors duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600 last:border-b-0"
          : "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-md",
        isActiveLink(href)
          ? "text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md"
          : mobile
            ? "text-gray-700"
            : "text-gray-700",
      )}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200 bg-gradient-to-r from-blue-50 via-white to-purple-50 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Blogify
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <NavLink key={link.id} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-purple-200">
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Trigger>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-transparent hover:border-purple-200">
                      <FaUserCircle className="h-6 w-6 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {user?.name || user?.email || "User"}
                      </span>
                    </button>
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item>
                      <Link to={"/admin"} className="flex gap-2 items-center">
                        <FaUserCircle className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      <IoLogOut className="h-4 w-4" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border border-transparent hover:border-purple-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav className="py-2 bg-gradient-to-r from-blue-50 via-white to-purple-50 border-t border-purple-100 shadow-lg rounded-b-lg">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.id}
                href={link.href}
                mobile={true}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="px-4 py-4 border-t border-purple-100 space-y-3">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700">
                    <FaUserCircle className="h-5 w-5 text-purple-600" />
                    {user?.name || "User"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-center text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    <IoLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
