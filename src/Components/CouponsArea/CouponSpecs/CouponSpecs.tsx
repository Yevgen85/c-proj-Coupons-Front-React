import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./CouponSpecs.css";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";
import { authStore } from "../../../Redux/AuthorisationState";

function CouponSpecs(): JSX.Element {

    const params = useParams();
    const couponId = +params.couponId!;
    const navigator = useNavigate();

    const [coupon, setCoupon] = useState<CouponModel>();
    let isCompany: boolean = authStore.getState().user?.clientType.includes("COMPANY") ? true : false;
    let isCustomer: boolean = authStore.getState().user?.clientType.includes("CUSTOMER") ? true : false;

    useEffect(() => {
        couponService.getSingleCoupon(couponId).then(response => {
            console.log(response);
            setCoupon(response);
        }).catch((error) => alert(error.response.data));
    }, []);

    function deleteCoupon() {
        const isDelete = window.confirm('Are you sure you want to delete this coupon?');
        if (isDelete) {
            couponService.deleteCoupon(couponId).then(response => {
                navigator('/coupons');
            }).catch((error) => alert(error.response.data));
        }
    }

    function updateCoupon() {
        navigator('/update-coupon/' + couponId);
    }

    
    
    

    return (
        <div className="CouponSpecs">
            
            { coupon &&
            <>
                <h1>{coupon.title}</h1>
                <h2>Price: {coupon.price}</h2>
                <h2>Amount: {coupon.amount}</h2>
                <h2>Category: {coupon.category.name}</h2>
                <h2>Description: {coupon.description}</h2>
                <h2>Start Date: {coupon.startDate.toLocaleString()}</h2>
                <h2>End Date: {coupon.endDate.toLocaleString()}</h2>
                <h2>Image: {coupon.image}</h2>
                {/* <h3>Product Price: {product.price}</h3>
                <h3>Product Price: {product.stock}</h3>
                <NavLink to={'/product/' + product.id}>Edit Product</NavLink> */}
                <div className="c_c_buttons">
                    
                {isCompany && <button onClick={deleteCoupon}>Delete Coupon</button>}
                {isCompany && <button onClick={updateCoupon}>Update Coupon</button>}
                {/* {isCustomer && <button onClick={purchaseCoupon}>Purchase Coupon</button>} */}
                </div>
            </>
            }
        </div>
    );
}

export default CouponSpecs;
