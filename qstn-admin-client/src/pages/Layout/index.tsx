import React from "react";
import { Outlet } from "react-router-dom";
import NavbarQstn from "../../assets/components/NavbarQstn/NavbarQstn";
import FooterQstn from "../../assets/components/FooterQstn";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <NavbarQstn />
        <Outlet />
        <FooterQstn />
      </div>
    </>
  );
};

export default Layout;
