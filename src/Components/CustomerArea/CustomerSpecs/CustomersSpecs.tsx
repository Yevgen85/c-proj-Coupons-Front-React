import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";


import "./CustomersSpecs.css";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";

function CustomersSpecs(): JSX.Element {

    const params = useParams();
    const customerId = +params.customerId!;
    const navigator = useNavigate();

    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() => {
        customerService.getSingleCustomer(customerId).then(response => {
            console.log(response);
            setCustomer(response);
        }).catch((error) => alert(error.response.data));
    }, []);

    function deleteCustomer() {
        const isDelete = window.confirm('Are you sure you want to delete this customer?');
        if (isDelete) {
            customerService.deleteCustomer(customerId).then(response => {
                navigator('/customers');
            }).catch((error) => alert(error.response.data));
        }
    }

    function updateCustomer() {
        navigator('/update-customer/' + customerId);
    }

    return (
        <div className="CustomerSpecs">
            
            { customer &&
            <>
                <h1>Customer First Name: {customer.firstName}</h1>
                <h1>Customer Last Name: {customer.lastName}</h1>
                <h2>Email: {customer.email}</h2>
                <div className="c_c_buttons">
                <button onClick={deleteCustomer}>Delete Customer</button>
                <button onClick={updateCustomer}>Update Customer</button>
                </div>
            </>
            }
        </div>
    );
}

export default CustomersSpecs;
