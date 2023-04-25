import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState, authStore } from '../../../Redux/AuthorisationState';
import './Customers.css';
import CustomerModel from '../../../Models/CustomerModel';
import customerService from '../../../Services/CustomerService';
import CustomerCard from '../CustomerCard/CustomerCard';


function Customers(): JSX.Element {

    const [customers, setCustomers] = useState<CustomerModel[]>([]);
    const navigate = useNavigate();
    
    
    useEffect(() => {
        if(authStore.getState().token !== null) {
            console.log("token not null " + authStore.getState().token)
        customerService.getCustomers().then((response) => {
        setCustomers(response);
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

        <div className='Customers'>
           
        {customers.map(customer =>
        <CustomerCard key={customer.id} {...customer}/>
        )}
       </div>
    );
}

export default Customers;