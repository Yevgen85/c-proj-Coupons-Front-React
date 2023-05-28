import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./UpdateCompanyForm.css";
import 'react-toastify/dist/ReactToastify.css';

import CompanyModel from "../../../../Models/CompanyModel";
import companyService from "../../../../Services/CompanyService";
import Alert from "../../../AlertMessage/Alert";
import tokenService from "../../../../Services/TokenService";
import { toast } from "react-toastify";



function UpdateCompanyForm(): JSX.Element {
  const params = useParams();
  const companyId = +params.companyId!;
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyModel>();

  useEffect(() => {
    companyService
      .getSingleCompany(companyId)
      .then((response) => {
        console.log(response);
        setCompany(response);
        setValue("email", response.email);
      })
      .catch((error) => toast.error(error.response.data.value));

    // setValue("email", company!.email)
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CompanyModel>();

  function updateCompany(updatedCompany: CompanyModel) {
    if (tokenService.isTokenNotExpired()) {
      updatedCompany.id = companyId;
      updatedCompany.name = company!.name;
      console.log(updatedCompany);
      reset();
      companyService
        .updateCompany(companyId, updatedCompany)
        .then(() => {
          toast.success("Success!")
          navigate("/admin/companies");
        })
        .catch((error) => {
          toast.error(error.response.data.value)
        });
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="UpdateCompanyForm">
      <form onSubmit={handleSubmit(updateCompany)}>
        <h1>Update Company</h1>
        Name:
        <br />
        <input type="text" placeholder={company?.name} disabled={true} />
        {errors.name?.message && <span>{errors.name?.message}</span>}
        <br />
        Email:
        <br />
        <input
          type="email"
          id="email"
          // placeholder={company?.email}
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
        <br />
        <div className="submitButtonDiv">
          <button className="submitButton" type="submit">
            UPDATE
          </button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdateCompanyForm;
