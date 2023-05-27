import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./UpdateCustomerForm.css";
import CustomerModel from "../../../../Models/CustomerModel";
import customerService from "../../../../Services/CustomerService";
import Alert from "../../../AlertMessage/Alert";
import tokenService from "../../../../Services/TokenService";
import { authStore } from "../../../../Redux/AuthorisationState";

function UpdateCustomerForm(): JSX.Element {
  const params = useParams();
  const customerId = +params.customerId!;
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<CustomerModel>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CustomerModel>();

  useEffect(() => {
    customerService
      .getSingleCustomer(customerId)
      .then((response) => {
        console.log(response);
        setCustomer(response);
        setValue("firstName", response.firstName);
        setValue("lastName", response.lastName);
        setValue("email", response.email);
      })
      .catch((error) => alert(error.response.data));
  }, [customerId, setValue]);

  function updateCustomer(updatedCustomer: CustomerModel) {
    if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired()
    ) {
      updatedCustomer.id = customerId;
      customerService
        .updateCustomer(customerId, updatedCustomer)
        .then(() => {
          navigate("/admin/customers");
        })
        .catch((error) => {
          alert(error.response.data.value);
        });
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="UpdateCustomerForm">
      <form onSubmit={handleSubmit(updateCustomer)}>
        <h1>Update Customer</h1>
        First Name:
        <br />
        <input
          type="text"
          {...register("firstName", {
            minLength: { value: 2, message: "Minimun 2..." },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        {errors.firstName?.message && <span>{errors.firstName?.message}</span>}
        <br />
        Last Name:
        <br />
        <input
          type="text"
          {...register("lastName", {
            minLength: { value: 2, message: "Minimun 2..." },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        {errors.lastName?.message && <span>{errors.lastName?.message}</span>}
        <br />
        Email:
        <br />
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <br />
        <br />
        <br />
        <div className="submitButtonDiv">
          <button className="submitButton" type="submit">
            UPDATE
          </button>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdateCustomerForm;
