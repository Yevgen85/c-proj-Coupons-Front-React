import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./UpdateCouponForm.css";



import Alert from "../../../AlertMessage/Alert";
import tokenService from "../../../../Services/TokenService";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";



function UpdateCouponForm(): JSX.Element {

    const params = useParams();
    const couponId = +params.couponId!;
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState('');
   const [coupon, setCoupon] = useState<CouponModel>();

   useEffect(() => {
    couponService.getSingleCoupon(couponId).then(response => {
        console.log(response);
        setCoupon(response);
    }).catch((error) => alert(error.response.data));
}, []);


  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

    const { register, watch, handleSubmit, formState : {errors}, reset, setValue } = useForm<CouponModel>();

   function updateCoupon (updatedCoupon: CouponModel) {
    if(tokenService.isTokenNotExpired()) {
    updatedCoupon.id = couponId;
    console.log(updatedCoupon)
    reset();
    couponService.updateCoupon(couponId, updatedCoupon).then(() => {
        navigate('/coupons');  
        }).catch(error => {
        alert(error.response.data.value)
    });  
}
else {
    navigate("/login");  
}
   }

   
            
    

    return (
  
        <div className="UpdateCompanyForm">
             <form onSubmit={handleSubmit(updateCoupon)}>
                <h1>Update Coupon</h1>
            Title:
                        <br />
                        <input type="text" placeholder={coupon?.title}   />
                    {errors.title?.message && <span>{errors.title?.message}</span>}
                        <br />
            Description: 
                        <br />
                        <input
                            type="text"
                            placeholder={coupon?.description}
                            {...register('description', {
                                required: 'Description is required'
                            })}
                            />
                            {errors.description && <span>{errors.description.message}</span>}
                        <br />
            {/* Password: 
                        <br />
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                                },
                            })}
                            />
                             {errors.password && <span>{errors.password.message}</span>} */}
                        <br />
                        <br />
                         
                        <div className='submitButtonDiv'>
                        <button className='submitButton' type='submit'>UPDATE</button>
                        <br />
                        <br />
                        <span>
                        {showAlert && (
                            <Alert message={message} onClose={handleCloseAlert} />
                        )}
                        </span>
                        </div>
                </form>
            
            
        </div>
    );
}


export default UpdateCouponForm;
