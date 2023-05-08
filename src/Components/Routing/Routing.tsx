import { Route, Routes } from "react-router-dom";
import MainPage from "../../MainPage/MainPage";
import Companies from "../CompanyArea/Companies/Companies";
import CompanySpecs from "../CompanyArea/CompanySpecs/CompanySpecs";
import Logino from "../Login/Logino";

import Customers from "../CustomerArea/Customers/Customers";
import AddCustomerForm from "../CustomerArea/CustomerForm/AddCustomer/AddCustomerForm";
import CustomersSpecs from "../CustomerArea/CustomerSpecs/CustomersSpecs";
import { AuthState, authStore } from "../../Redux/AuthorisationState";
import ClientType from "../../Models/ClientType";
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




function Routing(): JSX.Element {

    function isAdmin(): boolean | undefined {
        return authStore.getState().token !== null && authStore.getState().user?.clientType.includes('ADMINISTRATOR');
    }
    function isCompany(): boolean | undefined {
        return authStore.getState().token !== null && authStore.getState().user?.clientType.includes('COMPANY');
    }
    function isCustomer(): boolean | undefined {
        return authStore.getState().token !== null && authStore.getState().user?.clientType.includes('CUSTOMER');
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/companies" element={isAdmin() && tokenService.isTokenNotExpired() ? <Companies /> : <Logino/>}/>
                <Route path="/customers" element={isAdmin() && tokenService.isTokenNotExpired() ? <Customers /> : <Logino/>}/>
                <Route path="/coupons" element={(isCompany() || isCustomer()) && tokenService.isTokenNotExpired() ? <Coupons /> : <Logino/>}/>
                <Route path="/purchased-coupons" element={(isCompany() || isCustomer()) && tokenService.isTokenNotExpired() ? <Coupons /> : <Logino/>}/>
                <Route path="/login" element={<Logino />}/>
                <Route path="/company-details/:companyId" element={isAdmin() && tokenService.isTokenNotExpired() ? <CompanySpecs/> : <Logino/>}/>
                <Route path="/update-company/:companyId" element={isAdmin() && tokenService.isTokenNotExpired() ? <UpdateCompanyForm/> : <Logino/>}/>
                <Route path="/update-customer/:customerId" element={isAdmin() && tokenService.isTokenNotExpired() ? <UpdateCustomerForm/> : <Logino/>}/>
                <Route path="/update-coupon/:couponId" element={isCompany() && tokenService.isTokenNotExpired() ? <UpdateCouponForm/> : <Logino/>}/>
                <Route path='/update-customer/:customerId/change-password' element={isAdmin() && tokenService.isTokenNotExpired() ? <UpdateCustomerPassword/> : <Logino/>}/>
                <Route path='/update-company/:companyId/change-password' element={isAdmin() && tokenService.isTokenNotExpired() ? <UpdateCompanyPassword/> : <Logino/>}/>
                
                <Route path="/customer-details/:customerId" element={isAdmin() && tokenService.isTokenNotExpired() ? <CustomersSpecs/> : <Logino/>}/>
                <Route path="/coupon-details/:couponId" element={isCompany() && tokenService.isTokenNotExpired() ? <CouponSpecs/> : <Logino/>}/>
                <Route path="/add-company" element={isAdmin() && tokenService.isTokenNotExpired() ? <AddCompanyForm/> : <Logino/>}/>
                <Route path="/add-customer" element={isAdmin() && tokenService.isTokenNotExpired() ? <AddCustomerForm/> : <Logino/>}/>
                <Route path="/add-coupon" element={isCompany() && tokenService.isTokenNotExpired() ? <AddCouponForm/> : <Logino/>}/>
                {/* Students */}
                {/* <Route path="students/" element={<Students />}/> */}
                {/* Courses */}
                {/* <Route path="courses/" element={<Courses />}/> */}
                {/* Courses */}
                {/* <Route path="grades/" element={<Grades />}/> */}
                {/* Page Not Found */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </>
    );
}
export default Routing;

//  {/* Welcome */}
//  <Route path="/" element={<Welcome />}/>