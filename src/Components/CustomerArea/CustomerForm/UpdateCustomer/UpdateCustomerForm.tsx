import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./UpdateCustomerForm.css";
import CustomerModel from "../../../../Models/CustomerModel";
import customerService from "../../../../Services/CustomerService";
import Alert from "../../../AlertMessage/Alert";




function UpdateCustomerForm(): JSX.Element {

    const params = useParams();
    const customerId = +params.customerId!;
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState('');
   const [customer, setCustomer] = useState<CustomerModel>();

   useEffect(() => {
    customerService.getSingleCustomer(customerId).then(response => {
        console.log(response);
        setCustomer(response);
    }).catch((error) => alert(error.response.data));
}, []);


  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

    const { register, watch, handleSubmit, formState : {errors}, reset, setValue } = useForm<CustomerModel>();

   function updateCustomer (updatedCustomer: CustomerModel) {
    updatedCustomer.id = customerId;
    
    console.log(updatedCustomer)
    reset();
    customerService.updateCustomer(customerId, updatedCustomer).then(() => {
        navigate('/customers');  
        }).catch(error => {
        alert(error.data.value)
    });  
    
   }

   
            
    

    return (
  
        <div className="UpdateCustomerForm">
             <form onSubmit={handleSubmit(updateCustomer)}>
                <h1>Update Customer</h1>
            First Name:
            <br />
            <input type="text" placeholder={customer?.firstName} {...register("firstName", 
                    { minLength: {value: 2, message: 'Minimun 2...'}})
                    } />
                    {errors.firstName?.message && <span>{errors.firstName?.message}</span>}
                        <br />
            Last Name:
            <br />
            <input type="text" placeholder='Last Name' {...register("lastName", 
                    { minLength: {value: 2, message: 'Minimun 2...'}})
                    } />
                    {errors.firstName?.message && <span>{errors.firstName?.message}</span>}
                        <br />
            Email: 
                        <br />
                        <input
                            type="email"
                            id="email"
                            placeholder={customer?.email}
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


export default UpdateCustomerForm;
