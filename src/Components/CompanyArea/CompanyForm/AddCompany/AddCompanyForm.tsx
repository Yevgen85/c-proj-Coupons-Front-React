import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./AddCompanyForm.css";

import CompanyModel from "../../../../Models/CompanyModel";
import companyService from "../../../../Services/CompanyService";
import Alert from "../../../AlertMessage/Alert";
import tokenService from "../../../../Services/TokenService";
import { clear } from "console";

function AddCompanyForm(): JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CompanyModel>();

  function addCompany(company: CompanyModel) {
    if (tokenService.isTokenNotExpired()) {
      console.log(company);
      reset();
      companyService
        .addCompany(company)
        .then((res) => {
          if(res === undefined) {
            reset()
          }
          else {
          navigate("/admin/companies");
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
    <div className="AddCompanyForm">
      <form onSubmit={handleSubmit(addCompany)}>
        <h1>Add Company</h1>
        Name:
        <br />
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: { value: true, message: "This field is mandatory" },
            minLength: { value: 2, message: "Minimun 2..." },
            maxLength: {
              value: 20,
              message: "Maximum length of 20 characters exceeded",
            },
          })}
        />
        <br />
        {errors.name?.message && (
          <span className="red">{errors.name?.message}</span>
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
          <button className="submitButton" type="submit">
            ADD
          </button>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default AddCompanyForm;
