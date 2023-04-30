import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./AddCompanyForm.css";

import CompanyModel from "../../../../Models/CompanyModel";
import companyService from "../../../../Services/CompanyService";
import Alert from "../../../AlertMessage/Alert";



function AddCompanyForm(): JSX.Element {

   

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState('');

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

    const { register, watch, handleSubmit, formState : {errors}, reset, setValue } = useForm<CompanyModel>();

   function addCompany (company: CompanyModel) {
    console.log(company)
    reset();
    companyService.addCompany(company).then(() => {
        navigate('/companies');  
        }).catch(error => {
        alert(error.data.value)
    });  
    
   }

   
            
    

    return (
  
        <div className="AddCompanyForm">
             <form onSubmit={handleSubmit(addCompany)}>
                <h1>Add Company</h1>
            Name:
                        <br />
                        <input type="text" placeholder='Name' {...register("name", 
                    {required: {value: true, message: 'This field is mandatory'},
                     minLength: {value: 2, message: 'Minimun 2...'}})
                    } />
                    {errors.name?.message && <span>{errors.name?.message}</span>}
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


export default AddCompanyForm;
