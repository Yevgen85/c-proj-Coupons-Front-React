import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import "./CompanyCard.css";

function CompanyCard(companyProps: CompanyModel): JSX.Element {
  return (
    <NavLink to={"company-details/" + companyProps.id}>
      <div className="CompanyCard">
        <div key={companyProps.id} className="card">
          {/* <img src={appConfig.apiImages + "/" + productProps.imageName} alt="" /> */}
          <div className="details">
            <p>Company</p>
            <p>Name: {companyProps.name}</p>
            <p>Email: {companyProps.email}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default CompanyCard;
