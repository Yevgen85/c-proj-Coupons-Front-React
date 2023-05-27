import { NavLink } from "react-router-dom";
import CustomerModel from "../../../Models/CustomerModel";
import "./CustomerCard.css";

function CustomerCard(customerProps: CustomerModel): JSX.Element {
  return (
    <NavLink to={"customer-details/" + customerProps.id}>
      <div className="CustomerCard">
        <div key={customerProps.id} className="card">
          <div className="details">
            <p>Customer</p>
            <p>First Name: {customerProps.firstName}</p>
            <p>Last Name: {customerProps.lastName}</p>
            <p>Email: {customerProps.email}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default CustomerCard;
