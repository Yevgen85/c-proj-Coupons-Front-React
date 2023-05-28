import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./CouponSpecs.css";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";
import { authStore } from "../../../Redux/AuthorisationState";
import tokenService from "../../../Services/TokenService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CouponSpecs(): JSX.Element {
  const params = useParams();
  const couponId = +params.couponId!;
  const navigator = useNavigate();

  const [coupon, setCoupon] = useState<CouponModel>();
  let isCompany: boolean = authStore
    .getState()
    .user?.clientType.includes("COMPANY")
    ? true
    : false;
  let isCustomer: boolean = authStore
    .getState()
    .user?.clientType.includes("CUSTOMER")
    ? true
    : false;

  useEffect(() => {
    couponService
      .getSingleCoupon(couponId)
      .then((response) => {
        if (response) {
          console.log(response);
          setCoupon(response);
        } else {
          navigator("/");
        }
      })
      .catch((error) => toast.error(error.response.data.value));
  }, []);

  function deleteCoupon() {
    if (tokenService.isTokenNotExpired()) {
      const isDelete = window.confirm(
        "Are you sure you want to delete this coupon?"
      );
      if (isDelete) {
        couponService
          .deleteCoupon(couponId)
          .then((response) => {
            toast.success("Success!")
            navigator("/company/coupons");
          })
          .catch((error) => toast.error(error.response.data.value));
      }
    } else {
      navigator("/login");
    }
  }

  function updateCoupon() {
    navigator("update-coupon");
  }

  return (
    <div className="CouponSpecs">
      {coupon && (
        <>
          <h1>{coupon.title}</h1>
          <h3>Price: {coupon.price}</h3>
          <h3>Amount: {coupon.amount}</h3>
          <h3>Category: {coupon.category.name}</h3>
          <h3>Description: {coupon.description}</h3>
          <h3>Start Date: {coupon.startDate.toLocaleString()}</h3>
          <h3>End Date: {coupon.endDate.toLocaleString()}</h3>
          <img src={coupon.image} alt={"pic"} />
          {/* <h3>Product Price: {product.price}</h3>
                <h3>Product Price: {product.stock}</h3>
                <NavLink to={'/product/' + product.id}>Edit Product</NavLink> */}
          <div className="c_c_buttons">
            {isCompany && <button onClick={deleteCoupon}>Delete Coupon</button>}
            {isCompany && <button onClick={updateCoupon}>Update Coupon</button>}
            {/* {isCustomer && <button onClick={purchaseCoupon}>Purchase Coupon</button>} */}
          </div>
        </>
      )}
    </div>
  );
}

export default CouponSpecs;
