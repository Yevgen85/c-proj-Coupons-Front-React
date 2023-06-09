import React from "react";

import "./CustomerMenu.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../Redux/AuthorisationState";
import tokenService from "../../Services/TokenService";
import couponService from "../../Services/CouponService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CustomerMenu(): JSX.Element {
  const navigate = useNavigate();

  function showAllCoupons(): void {
    if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired() &&
      authStore.getState().user?.clientType?.includes("CUSTOMER")
    ) {
      couponService
        .getCoupons()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          toast.error(error.response.data.value);
        });
    } else {
      navigate("/login");
    }
    navigate("/customer/coupons");
  }

  function showPurchasedCoupons(): void {
    if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired() &&
      authStore.getState().user?.clientType?.includes("CUSTOMER")
    ) {
      couponService
        .getPurchasedCoupons()
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          toast.error(error.response.data.value);
        });
    } else {
      navigate("/login");
    }
    navigate("/customer/purchased-coupons");
  }

  return (
    <div className="CustomerMenu">
      <button onClick={showAllCoupons} className="mainColor">
        Show All Coupons
      </button>
      <button onClick={showPurchasedCoupons} className="mainColor">
        Show My Coupons
      </button>
      {/* <button onClick={purchaseCoupon} className="mainColor">Purchase Coupon</button> */}
    </div>
  );
}

export default CustomerMenu;
