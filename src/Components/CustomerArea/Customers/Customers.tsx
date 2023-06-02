import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState, authStore } from "../../../Redux/AuthorisationState";
import "./Customers.css";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import CustomerCard from "../CustomerCard/CustomerCard";
import tokenService from "../../../Services/TokenService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { customersStore } from "../../../Redux/CustomersState";

function Customers(): JSX.Element {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired()
    ) {
      console.log("token not null " + authStore.getState().token);
      customerService
        .getCustomers()
        .then((response) => {
          setCustomers(response);
          console.log(response);
        })
        .catch((error) => {
          toast.error(error.response.data.value)
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setCustomers(customersStore.getState().customerList);
    const unsubscribe = customersStore.subscribe(() => {
      setCustomers(customersStore.getState().customerList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="Customers">
      {customers.map((customer) => (
        <CustomerCard key={customer.id} {...customer} />
      ))}
    </div>
  );
}

export default Customers;
