import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./AddCustomerForm.css";
import { authStore } from "../../../../Redux/AuthorisationState";
import { error } from "console";

import ErrorModel from "../../../../Models/ErrorModel";
import customerService from "../../../../Services/CustomerService";
import CustomerModel from "../../../../Models/CustomerModel";
import tokenService from "../../../../Services/TokenService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddCustomerForm(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CustomerModel>();

  function addCustomer(customer: CustomerModel) {
    if (tokenService.isTokenNotExpired()) {
      console.log(customer);
      reset();
      customerService
        .addCustomer(customer)
        .then((res) => {
          if(res === undefined) {
            reset()
          }
          else {
          navigate("/admin/customers");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.value);
        });
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="AddCustomerForm">
      <form onSubmit={handleSubmit(addCustomer)}>
        <h1>Add Customer</h1>
        First Name:
        <br />
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", {
            required: { value: true, message: "This field is mandatory" },
            minLength: { value: 2, message: "Minimun 2..." },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        <br />
        {errors.firstName?.message && (
          <span className="red">{errors.firstName?.message}</span>
        )}
        <br />
        Last Name:
        <br />
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", {
            required: { value: true, message: "This field is mandatory" },
            minLength: { value: 2, message: "Minimun 2..." },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        <br />
        {errors.lastName?.message && (
          <span className="red">{errors.lastName?.message}</span>
        )}
        <br />
        Email:
        <br />
        <input
          type="email"
          placeholder="Email"
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
        <br />
        {errors.email && <span className="red">{errors.email.message}</span>}
        <br />
        Password:
        <br />
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        <br />
        {errors.password && (
          <span className="red">{errors.password.message}</span>
        )}
        <br />
        <br />
        <div className="submitButtonDiv">
          <button disabled={Object.keys(errors).length !== 0} type="submit">
            ADD
          </button>
          {/* <button className='submitButton' type='submit'>ADD</button> */}
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default AddCustomerForm;
