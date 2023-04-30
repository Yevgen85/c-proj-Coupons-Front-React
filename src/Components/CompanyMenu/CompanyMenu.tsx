import React from "react";

import './CompanyMenu.css';
import { NavLink, useNavigate } from "react-router-dom";

function CompanyMenu(): JSX.Element {
   

    const navigate = useNavigate();
    
    function showAllCoupons(): void {
        navigate('/coupons');
    }

    function addCoupon(): void {
        navigate('/add-coupon');
    }


    
      
            return (
        
                <div className='CompanyMenu'>

                <button onClick={showAllCoupons} className="mainColor">Show Coupons</button>
                <button onClick={addCoupon} className="mainColor">Add Coupon</button>
               
            
           
            </div>
        
   
        );
    
}

export default CompanyMenu;

