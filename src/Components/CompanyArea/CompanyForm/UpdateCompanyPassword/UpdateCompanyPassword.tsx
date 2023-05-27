import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./UpdateCompanyPassword.css";

import Alert from "../../../AlertMessage/Alert";
import ChangePasswordModel from "../../../../Models/ChangePasswordModel";
import CompanyModel from "../../../../Models/CompanyModel";
import companyService from "../../../../Services/CompanyService";

function UpdateCompanyPassword(): JSX.Element {
  const params = useParams();
  const companyId = +params.companyId!;
  const navigate = useNavigate();

  const [company, setCompany] = useState<CompanyModel>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChangePasswordModel>();

  useEffect(() => {
    companyService
      .getSingleCompany(companyId)
      .then((response) => {
        console.log(response);
        setCompany(response);
      })
      .catch((error) => alert(error.response.data));
  }, [companyId, setValue]);

  function updatePassword(updatedPassword: ChangePasswordModel) {
    updatedPassword.id = companyId;

    console.log(updatedPassword);

    companyService
      .updateCompanyPassword(companyId, updatedPassword)
      .then(() => {
        navigate("/admin/companies");
      })
      .catch((error) => {
        alert(error.response.data.value);
      });
  }

  return (
    <div className="UpdateCompanyForm">
      <form onSubmit={handleSubmit(updatePassword)}>
        <h1>Update Password</h1>
        Old Password:
        <br />
        <input
          type="password"
          id="oldPassword"
          {...register("oldPassword", {
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
        {errors.oldPassword && (
          <span className="red">{errors.oldPassword.message}</span>
        )}
        <br />
        <br />
        New Password:
        <br />
        <input
          type="password"
          id="newPassword"
          {...register("newPassword", {
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
        {errors.newPassword && (
          <span className="red">{errors.newPassword.message}</span>
        )}
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

export default UpdateCompanyPassword;
