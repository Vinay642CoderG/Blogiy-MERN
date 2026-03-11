import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ScrollTopBtn, ScrollToTopOnMount } from "../../ui";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopOnMount />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollTopBtn />
    </div>
  );
}

export default MainLayout;
