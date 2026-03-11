import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/ui/Loader";
import AdminRoutes from "./AdminRoutes";

// lazy loaded components
const Home = lazy(() => import("@/pages/home/Home"));
const About = lazy(() => import("@/pages/about/About"));
const Contact = lazy(() => import("@/pages/contact/Contact"));
const BlogDetail = lazy(() => import("@/pages/blog/BlogDetail"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const NotFound = lazy(() => import("@/pages/errors/NotFound"));
const MainLayout = lazy(
  () => import("@/components/layouts/MainLayout/MainLayout"),
);

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
            {/* Auth routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AdminRoutes />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;
