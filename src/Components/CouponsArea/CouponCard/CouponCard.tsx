
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './CouponCard.css';
import CouponModel from '../../../Models/CouponModel';
import { format, parseISO } from 'date-fns';
import { authStore } from '../../../Redux/AuthorisationState';
import couponService from '../../../Services/CouponService';


function isCompany(): boolean {
    if (authStore.getState().user?.clientType.includes("COMPANY")) {
        console.log(true)
        return true;
    }
    return false;
    
}

function isCustomer(): boolean {
    if (authStore.getState().user?.clientType.includes("CUSTOMER")) {
        console.log(true)
        return true;
    }
    return false;
    
}

console.log(isCompany())

function CouponCard(couponProps: CouponModel): JSX.Element {

    const location = useLocation();
    const navigator = useNavigate();
   
    function purchaseCoupon() {
        couponService.purchaseCoupon(couponProps).then(response => {
            alert("Success!");
        }).catch(error => {
            alert(error.response.data.value)
        })
        navigator('/coupons');
    }
    
    return (
         
        <NavLink to={isCompany() ? '/coupon-details/' + couponProps.id : ''}>
            <div className="CouponCard">
                <div key={couponProps.id} className='card'>
                    <div className='details'>
                        <p>Coupon</p>
                        <p>Category: {couponProps.category.name}</p>
                        <p>Title: {couponProps.title}</p>
                        <p>Start Date: {format(new Date(couponProps.startDate), 'MMMM dd, yyyy')}</p>
                        <p>End Date: {format(new Date(couponProps.endDate), 'MMMM dd, yyyy')}</p>
                        <p>Image: {couponProps.image}</p>
                        {isCompany() && <p>Amount: {couponProps.amount}</p>}
                        <p>Price: {couponProps.price}</p>
                    </div>
                    <div>
                    {isCustomer() && location.pathname === '/coupons' && <button onClick={purchaseCoupon}>Purchase</button>}
                    </div>
                </div>
            </div>
             </NavLink>
    );
}

export default CouponCard
