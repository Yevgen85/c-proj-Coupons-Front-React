import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./CouponSpecs.css";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";

function CouponSpecs(): JSX.Element {

    const params = useParams();
    const couponId = +params.couponId!;
    const navigator = useNavigate();

    const [coupon, setCoupon] = useState<CouponModel>();

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
                <h1>Coupon Title: {coupon.title}</h1>
                <h2>Price: {coupon.price}</h2>
                {/* <h3>Product Price: {product.price}</h3>
                <h3>Product Price: {product.stock}</h3>
                <NavLink to={'/product/' + product.id}>Edit Product</NavLink> */}
                <div className="c_c_buttons">
                <button onClick={deleteCoupon}>Delete Coupon</button>
                <button onClick={updateCoupon}>Update Coupon</button>
                </div>
            </>
            }
        </div>
    );
}

export default CouponSpecs;
