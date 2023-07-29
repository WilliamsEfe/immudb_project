import React from "react";
import Header from "./nonAuthLayout/header";
import Toast from "components/common/toasts/toast";
import Footer from "./nonAuthLayout/footer";

export const NonAuthLayout = ({ children }) => {
  return (
    <div className="w-full flex flex-grow flex-col relative">
      <Header />
      <Toast />

      <section className="w-full lg:px-[90px] md:px-[60px] sm:px-[24px] px-[12px] bg-blue-100 min-h-[100vh] max-w-[1440px] mx-auto overflow-hidden">
        {children}
      </section>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};
