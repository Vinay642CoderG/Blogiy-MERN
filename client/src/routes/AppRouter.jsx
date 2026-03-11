import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/components/ui/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";

// lazy loaded components
const MainLayout = lazy(() => import("@/components/layouts/main/MainLayout"));
const Home = lazy(() => import("@/pages/home/Home"));
const About = lazy(() => import("@/pages/about/About"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const BlogDetail = lazy(() => import("@/pages/blog/BlogDetail"));
const Login = lazy(() => import("@/pages/auth/Login"));
const NotFound = lazy(() => import("@/pages/errors/NotFound"));

const AdminLayout = lazy(
  () => import("@/components/layouts/admin/AdminLayout"),
);
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminPosts = lazy(() => import("@/pages/admin/Posts"));
const Comments = lazy(() => import("@/pages/admin/Comments"));
const Profile = lazy(() => import("@/pages/admin/Profile"));

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Route>
            {/* login route */}
            <Route path="/login" element={<Login />} />
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="comments" element={<Comments />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
