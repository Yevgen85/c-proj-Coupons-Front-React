import React from "react";

import './AdminMenu.css';
import { NavLink, useNavigate } from "react-router-dom";

function AdminMenu(): JSX.Element {
   

    const navigate = useNavigate();
    
    function showAllCompanies(): void {
        navigate('/companies');
    }

    function showAllCustomers(): void {
        navigate('/customers');
    }


    function addCompany(): void {
        navigate('/add-company');
    }

    function addCustomer(): void {
        navigate('/add-customer');
    }
      
            return (
        
                <div className='AdminMenu'>

                <button onClick={showAllCompanies} className="mainColor">Show Companies</button>
                <button onClick={showAllCustomers} className="mainColor">Show Customers</button>
                <button onClick={addCompany} className="mainColor" >Add Company</button>
                <button onClick={addCustomer} className="mainColor" >Add Customer</button>
            
           
            </div>
        
   
        );
    
}

export default AdminMenu;

