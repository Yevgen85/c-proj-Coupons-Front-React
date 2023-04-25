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




function Routing(): JSX.Element {

    function isAdmin(): boolean | undefined {
        return authStore.getState().token !== null && authStore.getState().user?.clientType.includes('ADMINISTRATOR');
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/companies" element={isAdmin() && tokenService.isTokenNotExpired() ? <Companies /> : <Logino/>}/>
                <Route path="/customers" element={isAdmin() && tokenService.isTokenNotExpired() ? <Customers /> : <Logino/>}/>
                <Route path="/login" element={<Logino />}/>
                <Route path="/company-details/:companyId" element={isAdmin() && tokenService.isTokenNotExpired() ? <CompanySpecs/> : <Logino/>}/>
                <Route path="/update-company/:companyId" element={isAdmin() && tokenService.isTokenNotExpired() ? <UpdateCompanyForm/> : <Logino/>}/>
                <Route path="/update-customer/:customerId" element={isAdmin() && tokenService.isTokenNotExpired() ? <UpdateCustomerForm/> : <Logino/>}/>
                <Route path="/customer-details/:customerId" element={isAdmin() && tokenService.isTokenNotExpired() ? <CustomersSpecs/> : <Logino/>}/>
                <Route path="/add-company" element={isAdmin() && tokenService.isTokenNotExpired() ? <AddCompanyForm/> : <Logino/>}/>
                <Route path="/add-customer" element={isAdmin() && tokenService.isTokenNotExpired() ? <AddCustomerForm/> : <Logino/>}/>
                {/* Students */}
                {/* <Route path="students/" element={<Students />}/> */}
                {/* Courses */}
                {/* <Route path="courses/" element={<Courses />}/> */}
                {/* Courses */}
                {/* <Route path="grades/" element={<Grades />}/> */}
                {/* Page Not Found */}
                {/* <Route path="*" element={<PageNotFound />} /> */}
            </Routes>
        </div>
    );
}
export default Routing;

//  {/* Welcome */}
//  <Route path="/" element={<Welcome />}/>