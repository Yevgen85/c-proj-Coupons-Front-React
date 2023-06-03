import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";

import "./UpdateCustomerPassword.css";
import CustomerModel from "../../../../Models/CustomerModel";
import customerService from "../../../../Services/CustomerService";
import ChangePasswordModel from "../../../../Models/ChangePasswordModel";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UpdateCustomerPassword(): JSX.Element {
  const params = useParams();
  const customerId = +params.customerId!;
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [customer, setCustomer] = useState<CustomerModel>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ChangePasswordModel>();

  useEffect(() => {
    customerService
      .getSingleCustomer(customerId)
      .then((response) => {
        console.log(response);
        setCustomer(response);
      })
      .catch((error) => toast.error(error.response.data.value));
  }, [customerId, setValue]);

  function updatePassword(updatedPassword: ChangePasswordModel) {
    updatedPassword.id = customerId;
    console.log(updatedPassword);
    customerService
      .updateCustomerPassword(customerId, updatedPassword)
      .then(() => {
        toast.success("Success!");
        navigate("/admin/customers");
      })
      .catch((error) => {
        toast.error(error.response.data.value);
      });
  }

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="UpdateCustomerForm">
      <form onSubmit={handleSubmit(updatePassword)}>
        <h1>Update Password</h1>
        Old Password:
        <br />
        <input
          type="password"
          placeholder="Old Password"
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
        {errors.oldPassword && <span>{errors.oldPassword.message}</span>}
        <br />
        <br />
        New Password:
        <br />
        <input
          type="password"
          placeholder="New Password"
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
        {errors.newPassword && <span>{errors.newPassword.message}</span>}
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

export default UpdateCustomerPassword;
