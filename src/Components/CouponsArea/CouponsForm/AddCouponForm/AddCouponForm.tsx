import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./AddCouponForm.css";

import Alert from "../../../AlertMessage/Alert";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";

function AddCouponForm(): JSX.Element {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const handleShowAlert = () => {
        setShowAlert(true);
    };
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const { register, watch, handleSubmit, formState : {errors}, reset, setValue, getValues } = useForm<CouponModel>();
    const today = new Date();

    const addCoupon = (coupon: CouponModel) => {
        reset();
        couponService.addCoupon(coupon)
            .then(() => {
                navigate('/coupons');
            })
            .catch((error) => {
                setMessage(error.response.data.value);
                handleShowAlert();
            });
    };
    
    return (
        <div className="AddCouponForm">
            <form onSubmit={handleSubmit(addCoupon)}>
                <h1>Add Coupon</h1>
        Title:
                <br />
                <input type="text" placeholder="Title" {...register("title", {
                    required: { value: true, message: "**This field is mandatory" },
                    minLength: { value: 2, message: "**Minimum 2 characters" },
                })} />
              
                
                {errors.title?.message && <span className="red">{errors.title?.message}</span>}
                <br />
                <br />
        Description:
                <br />
                <input type="text" placeholder="Description" {...register("description", {
                    required: { value: true, message: "**This field is mandatory" },
                    minLength: { value: 2, message: "**Minimum 2 characters" },
                })} />
                
                {errors.description?.message && <span className="red">{errors.description?.message}</span>}
                <br />
                <br />
        Category:
                <br />
                <input type="text" placeholder="Category" {...register("category", {
                    required: { value: true, message: "**This field is mandatory" },
                    minLength: { value: 2, message: "**Minimum 2 characters" },
                })} />
                
                {errors.category?.message && <span className="red">{errors.category?.message}</span>}
                <br />        
                <br />        
        Start Date:
        <br />
                    <input type="date" {...register('startDate', {
                        validate: (value) => {
                            const startDate = new Date(value);
                            if (startDate < today) {
                                return '**Start date should be from today';
                            }
                            const endDate = new Date(getValues('endDate'));
                            if (endDate && endDate <= startDate) {
                                return '**End date should be after start date';
                            }
                            return true;
                        },
                    })} />
                    {errors.startDate && <span className="red">{errors.startDate.message}</span>}
                <br />
                <br />
          End Date:
          <br />
          
                    <input type="date" {...register('endDate', {
                        validate: (value) => {
                            const endDate = new Date(value);
                            if (endDate <= today) {
                                return '**End date should be after start date';
                            }
            return true;
          }
        })} />
        
        {errors.endDate && <span className="red">{errors.endDate.message}</span>}
        <br />
        <br />
               Amount:
                        <br />
                        <input type="number" placeholder='Amount' {...register("amount", 
                    {required: {value: true, message: '**This field is mandatory'},
                     minLength: {value: 1, message: 'Minimun 2...'}})
                    } />
                    
                    
                    {errors.title?.message && <span className="red">{errors.title?.message}</span>}
                        <br />
            
                        <br />
                        <br />
                         
                        <div className='submitButtonDiv'>
                        <button className='submitButton' type='submit'>ADD</button>
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


export default AddCouponForm;
