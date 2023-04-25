import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyModel from '../../../Models/CompanyModel';
import { AuthState, authStore } from '../../../Redux/AuthorisationState';
import companyService from '../../../Services/CompanyService';
import CompanyCard from '../CompanyCard/CompanyCard';
import './Companies.css';
import tokenService from '../../../Services/TokenService';


function Companies(): JSX.Element {

    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if(authStore.getState().token !== null && tokenService.isTokenNotExpired()) {
            console.log("token not null" + authStore.getState().token)
        companyService.getCompanies().then((response) => {
        setCompanies(response);
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
    
}
else {
    navigate('/login');
}
    }, []);
    
    return (

        <div className='Companies'>
           
        {companies.map(company =>
        <CompanyCard key={company.id} {...company}/>
        )}
       </div>
    );
}

export default Companies;