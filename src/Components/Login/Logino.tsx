import React from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import LoginModel from '../../Models/LoginModel';
import { authStore, loginAction } from "../../Redux/AuthorisationState";
import loginService from '../../Services/LoginService';
import './Logino.css';

function Logino(): JSX.Element {
   

    
    const {register ,  handleSubmit} = useForm<LoginModel>({});
    const navigate = useNavigate();
  


    function loginFC(loginModel: LoginModel): void {
        console.log(loginModel);
      
        loginService.login(loginModel).then(response => {
            navigate('/companies');
        }).catch((error) => {
            console.log(error);
        });
        // console.log("store state: " + authStore.getState().token);
    }
      
            return (
        
                <div className='Login'>
                
                <h1>Welcome to my site!</h1>
                <h2>Please login:</h2>
                <form onSubmit={handleSubmit(loginFC)}>
                    Login: 
                        
                        <input type="text" placeholder='Email' {...register('username')}/>
                        
                    Password: 
                        
                        <input type="password" autoComplete="on" placeholder='**********' {...register('password')}/>
                        
                    Client:
                        
                        <select className="clientTypeSelector" {...register('clientType')}>
                           <option value={"ADMINISTRATOR"}>ADMINISTRATOR</option>
                           <option value={"COMPANY"}>COMPANY</option>
                           <option value={"CUSTOMER"}>CUSTOMER</option>
                        </select>
                        
                        
                        <button className='submitButton' type='submit'>LOGIN</button>
                        
                </form>
            
           
            </div>
        
   
        );
    
}

export default Logino;

