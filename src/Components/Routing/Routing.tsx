import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../../MainPage/MainPage";
import Companies from "../CompanyArea/Companies/Companies";
import CompanySpecs from "../CompanyArea/CompanySpecs/CompanySpecs";
import Logino from "../Login/Logino";
import Customers from "../CustomerArea/Customers/Customers";
import AddCustomerForm from "../CustomerArea/CustomerForm/AddCustomer/AddCustomerForm";
import CustomersSpecs from "../CustomerArea/CustomerSpecs/CustomersSpecs";
import { authStore } from "../../Redux/AuthorisationState";
import AddCompanyForm from "../CompanyArea/CompanyForm/AddCompany/AddCompanyForm";
import UpdateCompanyForm from "../CompanyArea/CompanyForm/UpdateCompany/UpdateCompanyForm";
import tokenService from "../../Services/TokenService";
import UpdateCustomerForm from "../CustomerArea/CustomerForm/UpdateCustomer/UpdateCustomerForm";
import UpdateCustomerPassword from "../CustomerArea/CustomerForm/UpdateCustomerPassword/UpdateCustomerPassword";
import UpdateCompanyPassword from "../CompanyArea/CompanyForm/UpdateCompanyPassword/UpdateCompanyPassword";
import Coupons from "../CouponsArea/Coupons/Coupons";
import CouponSpecs from "../CouponsArea/CouponSpecs/CouponSpecs";
import UpdateCouponForm from "../CouponsArea/CouponsForm/UpdateCouponForm/UpdateCouponForm";
import AddCouponForm from "../CouponsArea/CouponsForm/AddCouponForm/AddCouponForm";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
  function isAdmin(): boolean | undefined {
    return (
      authStore.getState().token !== null &&
      authStore.getState().user?.clientType.includes("ADMINISTRATOR")
    );
  }
  function isCompany(): boolean | undefined {
    return (
      authStore.getState().token !== null &&
      authStore.getState().user?.clientType.includes("COMPANY")
    );
  }
  function isCustomer(): boolean | undefined {
    return (
      authStore.getState().token !== null &&
      authStore.getState().user?.clientType.includes("CUSTOMER")
    );
  }

  return (
    <>
      <Routes>
        {/* WELCOME */}
        <Route path="/" element={<MainPage />} />

        {/* Login */}
        <Route path="/login" element={<Logino />} />

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />

        {/* ADMIN */}

        <Route
          path="admin/companies"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <Companies />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        <Route
          path="admin/customers"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <Customers />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/companies/company-details/:companyId"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <CompanySpecs />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/companies/company-update/:companyId"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <UpdateCompanyForm />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/customers/customer-update/:customerId"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <UpdateCustomerForm />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/customers/customer-details/:customerId/change-password"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <UpdateCustomerPassword />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/companies/company-details/:companyId/change-password"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <UpdateCompanyPassword />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/add-company"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <AddCompanyForm />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/add-customer"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <AddCustomerForm />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="admin/customers/customer-details/:customerId"
          element={
            isAdmin() && tokenService.isTokenNotExpired() ? (
              <CustomersSpecs />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* COMPANY */}

        <Route
          path="company/coupons"
          element={
            isCompany() && tokenService.isTokenNotExpired() ? (
              <Coupons />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="company/add-coupon"
          element={
            isCompany() && tokenService.isTokenNotExpired() ? (
              <AddCouponForm />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="company/coupons/coupon-details/:couponId"
          element={
            (isCompany() || isCustomer()) &&
            tokenService.isTokenNotExpired() ? (
              <CouponSpecs />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="company/coupons/coupon-details/:couponId/update-coupon"
          element={
            isCompany() && tokenService.isTokenNotExpired() ? (
              <UpdateCouponForm />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />

        {/* CUSTOMER */}

        <Route
          path="customer/coupons"
          element={
            isCustomer() && tokenService.isTokenNotExpired() ? (
              <Coupons />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="customer/purchased-coupons"
          element={
            isCustomer() && tokenService.isTokenNotExpired() ? (
              <Coupons />
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
      </Routes>
    </>
  );
}
export default Routing;
