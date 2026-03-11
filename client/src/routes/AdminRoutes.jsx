import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import { Dashboard, Posts, Comments, Users } from "../pages/admin";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="posts" element={<Posts />} />
        <Route path="comments" element={<Comments />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
