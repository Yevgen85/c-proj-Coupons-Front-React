import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LoginModel from "../../Models/LoginModel";
import { authStore, loginAction } from "../../Redux/AuthorisationState";
import loginService from "../../Services/LoginService";
import "./Logino.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { POSITION } from "react-toastify/dist/utils";
import { posix } from "path";

function Logino(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LoginModel>({});
  const navigate = useNavigate();

  function loginFC(loginModel: LoginModel): void {
    console.log(loginModel);

    loginService
      .login(loginModel)
      .then((response) => {
        toast.success("Welcome!", {position: toast.POSITION.BOTTOM_RIGHT})
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.value);
      });
    // console.log("store state: " + authStore.getState().token);
  }

  return (
    <div className="Login">
      <h1>Welcome to my site!</h1>
      <h2>Please login:</h2>
      <form onSubmit={handleSubmit(loginFC)}>
        Login:
        <br />
        <input
          type="email"
          placeholder="@Username"
          id="email"
          {...register("username", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <br />
        {errors.username && (
          <span className="red">{errors.username.message}</span>
        )}
        <br />
        Password:
        <br />
        <input
          type="password"
          placeholder="Password"
          id="password"
          {...register("password", {
            required: "Password is required",
            maxLength: {
              value: 100,
              message: "Maximum length of 100 characters exceeded",
            },
          })}
        />
        <br />
        {errors.password && (
          <span className="red">{errors.password.message}</span>
        )}
        <br />
        <br />
        Client:
        <br />
        <select
          className="clientTypeSelector"
          {...register("clientType", { required: "Please Select Client Type" })}
        >
          <option value="">-SELECT CLIENT TYPE-</option>
          <option value={"ADMINISTRATOR"}>ADMINISTRATOR</option>
          <option value={"COMPANY"}>COMPANY</option>
          <option value={"CUSTOMER"}>CUSTOMER</option>
        </select>
        <br />
        {errors.clientType && (
          <span className="red">{errors.clientType.message}</span>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <button className="submitButton" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Logino;
