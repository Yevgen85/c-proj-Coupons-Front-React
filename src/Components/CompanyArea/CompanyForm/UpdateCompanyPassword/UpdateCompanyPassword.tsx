import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./UpdateCompanyPassword.css";

import Alert from "../../../AlertMessage/Alert";
import ChangePasswordModel from "../../../../Models/ChangePasswordModel";
import CompanyModel from "../../../../Models/CompanyModel";
import companyService from "../../../../Services/CompanyService";





function UpdateCompanyPassword(): JSX.Element {

    const params = useParams();
    const companyId = +params.companyId!;
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [company, setCompany] = useState<CompanyModel>();
    const { register, handleSubmit, formState : {errors}, setValue } = useForm<ChangePasswordModel>();
  
    useEffect(() => {
      companyService.getSingleCompany(companyId).then(response => {
        console.log(response);
        setCompany(response);
        // setValue('password', response.password);
      }).catch((error) => alert(error.message));
    }, [companyId, setValue]);
  
    function updatePassword(updatedPassword: ChangePasswordModel) {
      updatedPassword.id = companyId;
      
      console.log(updatedPassword)
      
      companyService.updateCompanyPassword(companyId, updatedPassword).then(() => {
        navigate('/companies');  
      }).catch(error => {
        alert(error.response.data.value)
      });  
    }
  
    const handleShowAlert = () => {
      setShowAlert(true);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    return (
  
        <div className="UpdateCompanyForm">
             <form onSubmit={handleSubmit(updatePassword)}>
                <h1>Update Password</h1>
         
             Old Password: 
                        <br />
                        <input
                            type="password"
                            id="oldPassword"
                            
                            {...register('oldPassword', {
                                required: 'Password is required',
                                minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                                },
                            })}
                            />
                             {errors.oldPassword && <span>{errors.oldPassword.message}</span>} 
                        <br />
                        <br />
                         
                       

            New Password: 
                        <br />
                        <input
                            type="password"
                            id="newPassword"
                            
                            {...register('newPassword', {
                                required: 'Password is required',
                                minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters long',
                                },
                            })}
                            />
                             {errors.newPassword && <span>{errors.newPassword.message}</span>} 
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


export default UpdateCompanyPassword;
