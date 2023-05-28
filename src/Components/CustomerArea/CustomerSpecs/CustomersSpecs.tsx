import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./CustomersSpecs.css";
import CustomerModel from "../../../Models/CustomerModel";
import customerService from "../../../Services/CustomerService";
import tokenService from "../../../Services/TokenService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CustomersSpecs(): JSX.Element {
  const params = useParams();
  const customerId = +params.customerId!;
  const navigator = useNavigate();

  const [customer, setCustomer] = useState<CustomerModel>();

  useEffect(() => {
    customerService
      .getSingleCustomer(customerId)
      .then((response) => {
        console.log(response);
        setCustomer(response);
      })
      .catch((error) => toast.error(error.response.data.value));
  }, []);

  function deleteCustomer() {
    const isDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (isDelete && tokenService.isTokenNotExpired()) {
      customerService
        .deleteCustomer(customerId)
        .then((response) => {
          toast.success("Success!");
          navigator("/admin/customers");
        })
        .catch((error) => toast.error(error.response.data.value));
    } else {
      navigator("/login");
    }
  }

  function updateCustomer() {
    navigator("/admin/customers/customer-update/" + customerId);
  }

  function updatePassword() {
    navigator(
      "/admin/customers/customer-details/" + customerId + "/change-password"
    );
  }

  return (
    <div className="CustomerSpecs">
      {customer && (
        <>
          <h1>Customer First Name: {customer.firstName}</h1>
          <h1>Customer Last Name: {customer.lastName}</h1>
          <h2>Email: {customer.email}</h2>
          <div className="c_c_buttons">
            <button onClick={deleteCustomer}>Delete</button>
            <button onClick={updateCustomer}>Update</button>
            <button onClick={updatePassword}>Change Password</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomersSpecs;
