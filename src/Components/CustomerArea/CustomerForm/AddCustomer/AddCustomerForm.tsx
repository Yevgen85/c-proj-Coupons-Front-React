import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./AddCustomerForm.css";
import { authStore } from "../../../../Redux/AuthorisationState";
import { error } from "console";
import Alert from "../../../AlertMessage/Alert";
import ErrorModel from "../../../../Models/ErrorModel";
import customerService from "../../../../Services/CustomerService";
import CustomerModel from "../../../../Models/CustomerModel";


function AddCustomerForm(): JSX.Element {

   

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState('');

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

    const { register, handleSubmit, formState : {errors}, reset, setValue } = useForm<CustomerModel>();

   function addCustomer (customer: CustomerModel) {
    console.log(customer)
    reset();
    customerService.addCustomer(customer).then(() => {
        navigate('/customers');
    }).catch(error => {
        alert(error.data.value)
    });  
    
   }

   
            
    

    return (
  
        <div className="AddCustomerForm">
             <form onSubmit={handleSubmit(addCustomer)}>
                <h1>Add Customer</h1>
            First Name:
                        <br />
                        <input type="text" placeholder='First Name' {...register("firstName", 
                    {required: {value: true, message: 'This field is mandatory'},
                     minLength: {value: 2, message: 'Minimun 2...'}})
                    } />
                    {errors.firstName?.message && <span>{errors.firstName?.message}</span>}
                        <br />

            Last Name:
                        <br />
                            <input type="text" placeholder='Last Name' {...register("lastName", 
                                {required: {value: true, message: 'This field is mandatory'},
                                 minLength: {value: 2, message: 'Minimun 2...'}})
                                 } />
                            {errors.lastName?.message && <span>{errors.lastName?.message}</span>}
                        <br />

            Email: 
                        <br />
                        <input
                            type="email"
                            placeholder='Email'
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                                },
                            })}
                            />
                            {errors.email && <span>{errors.email.message}</span>}
                        <br />
            Password: 
                        <br />
                        <input
                            type="password"
                            placeholder='Password'
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                                },
                            })}
                            />
                             {errors.password && <span>{errors.password.message}</span>}
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


export default AddCustomerForm;
