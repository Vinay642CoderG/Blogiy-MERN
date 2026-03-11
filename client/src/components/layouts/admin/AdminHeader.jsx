import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMenu, IoNotifications, IoLogOut } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import useAuth from "@/hooks/useAuth";
import { fetchProfile } from "@/redux/slices/userSlice";

function AdminHeader({ onMenuClick }) {
  const dispatch = useDispatch();
  const { user, logout } = useAuth();
  const { profile } = useSelector((state) => state.users);

  // Load profile data when component mounts
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <IoMenu className="h-6 w-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            Blog Management
          </h2>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
            <IoNotifications className="h-6 w-6 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User menu */}
          <Dropdown>
            <Dropdown.Trigger>
              <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                {profile?._profileImage?.url ? (
                  <img
                    src={profile._profileImage.url}
                    alt={profile.name || user?.name || "User"}
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <FaUserCircle className="h-8 w-8 text-gray-600" />
                )}
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {profile?.name || user?.name || user?.email || "Admin"}
                </span>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item asChild>
                <Link to="/admin/profile" className="flex items-center gap-2">
                  <FaUserCircle className="h-4 w-4" />
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item onClick={handleLogout} className="text-red-600">
                <IoLogOut className="h-4 w-4" />
                Logout
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
