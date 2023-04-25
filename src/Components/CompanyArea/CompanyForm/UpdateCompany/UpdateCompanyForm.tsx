import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./UpdateCompanyForm.css";

import CompanyModel from "../../../../Models/CompanyModel";
import companyService from "../../../../Services/CompanyService";
import Alert from "../../../AlertMessage/Alert";



function UpdateCompanyForm(): JSX.Element {

    const params = useParams();
    const companyId = +params.companyId!;
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState('');
   const [company, setCompany] = useState<CompanyModel>();

   useEffect(() => {
    companyService.getSingleCompany(companyId).then(response => {
        console.log(response);
        setCompany(response);
    }).catch((error) => alert(error.response.data));
}, []);


  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

    const { register, watch, handleSubmit, formState : {errors}, reset, setValue } = useForm<CompanyModel>();

   function updateCompany (updatedCompany: CompanyModel) {
    updatedCompany.id = companyId;
    updatedCompany.name = company!.name;
    console.log(updatedCompany)
    reset();
    companyService.updateCompany(companyId, updatedCompany).then(() => {
        navigate('/companies');  
        }).catch(error => {
        alert(error.data.value)
    });  
    
   }

   
            
    

    return (
  
        <div className="UpdateCompanyForm">
             <form onSubmit={handleSubmit(updateCompany)}>
                <h1>Update Company</h1>
            Name:
                        <br />
                        <input type="text" placeholder={company?.name}  disabled={true} />
                    {errors.name?.message && <span>{errors.name?.message}</span>}
                        <br />
            Email: 
                        <br />
                        <input
                            type="email"
                            id="email"
                            placeholder={company?.email}
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


export default UpdateCompanyForm;
