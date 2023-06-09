import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Companies from "../CompanyArea/Companies/Companies";
import CompanyCard from "../CompanyArea/CompanyCard/CompanyCard";

import Routing from "../Routing/Routing";
import "./LayoutArea.css";
import AdminMenu from "../AdminMenu/AdminMenu";
import { authStore } from "../../Redux/AuthorisationState";
import loginService from "../../Services/LoginService";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import UserModel from "../../Models/UserModel";
import CompanyMenu from "../CompanyMenu/CompanyMenu";
import CustomerMenu from "../CustomerMenu/CustomerMenu";
import ScrollToTop from "react-scroll-to-top";

function LayoutArea() {
  const [user, setUser] = useState<UserModel>();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(authStore.getState().user!);
    const unsubscribe = authStore.subscribe(() => {
      setUser(authStore.getState().user!);
    });
    return () => unsubscribe();
  }, []);

  function showMenu(): JSX.Element {
    if (user?.clientType?.includes("ADMINISTRATOR")) return <AdminMenu />;

    if (user?.clientType?.includes("COMPANY")) return <CompanyMenu />;

    if (user?.clientType?.includes("CUSTOMER")) return <CustomerMenu />;

    return <></>;
  }

  function login(): void {
    navigate("/login");
  }

  function logOut(): void {
    loginService.logOut();
    navigate("/");
  }

  return (
    <div className="LayoutArea">
      <div className="header">
        <Navbar />
      </div>

      <div className="center">
        <div className="menu">
          {showMenu()}</div>
        <div className="content">
          <Routing />
          
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default LayoutArea;
