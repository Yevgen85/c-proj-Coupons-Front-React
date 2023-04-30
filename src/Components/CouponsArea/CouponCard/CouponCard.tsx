
import { NavLink } from 'react-router-dom';
import './CouponCard.css';
import CouponModel from '../../../Models/CouponModel';
import { format, parseISO } from 'date-fns';






function CouponCard(couponProps: CouponModel): JSX.Element {

    // const startDate = parseISO(couponProps.startDate);
    
    return (
         <NavLink to={'/coupon-details/' + couponProps.id}>
            <div className="CouponCard">
                <div key={couponProps.id} className='card'>
                    <div className='details'>
                        <p>Coupon</p>
                        <p>Category: {couponProps.category.name}</p>
                        <p>Title: {couponProps.title}</p>
                        <p>Start Date: {format(new Date(couponProps.startDate), 'MMMM dd, yyyy')}</p>
                        <p>End Date: {format(new Date(couponProps.endDate), 'MMMM dd, yyyy')}</p>
                        <p>Image: {couponProps.image}</p>
                        <p>Amount: {couponProps.amount}</p>
                        <p>Price: {couponProps.price}</p>
                    </div>
                </div>
            </div>
             </NavLink>
    );
}

export default CouponCard
