import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthState, authStore } from '../../../Redux/AuthorisationState';


import './Coupons.css';
import tokenService from '../../../Services/TokenService';
import CouponModel from '../../../Models/CouponModel';
import couponService from '../../../Services/CouponService';
import { couponsStore } from '../../../Redux/CouponsState';
import CouponCard from '../CouponCard/CouponCard';



function Coupons(): JSX.Element {

    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if(authStore.getState().token !== null && tokenService.isTokenNotExpired()) {
            console.log("token not null" + authStore.getState().token)
        couponService.getCouponsByCompany().then((response) => {
            console.log(response);
            setCoupons(response);
    }).catch((error) => {
        alert(error.response.data.value);
    });
}
else {
    navigate('/login');
}
    }, []);


    useEffect(() => {
        setCoupons(couponsStore.getState().couponList);
        const unsubscribe = couponsStore.subscribe(() => {
            setCoupons(couponsStore.getState().couponList);
        });
        return () => unsubscribe();
    },[]);
    
    return (

        <div className='Coupons'>
           
        {coupons.map(coupon =>
        <CouponCard key={coupon.id} {...coupon}/>
        )}
       </div>
    );
}

export default Coupons;

