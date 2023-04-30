import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import CompanyModel from "../../../Models/CompanyModel";
import companyService from "../../../Services/CompanyService";

import "./CompanySpecs.css";

function CompanySpecs(): JSX.Element {

    const params = useParams();
    const companyId = +params.companyId!;
    const navigator = useNavigate();

    const [company, setCompany] = useState<CompanyModel>();

    useEffect(() => {
        companyService.getSingleCompany(companyId).then(response => {
            console.log(response);
            setCompany(response);
        }).catch((error) => alert(error.response.data));
    }, []);

    function deleteCompany() {
        const isDelete = window.confirm('Are you sure you want to delete this company?');
        if (isDelete) {
            companyService.deleteCompany(companyId).then(response => {
                navigator('/companies');
            }).catch((error) => alert(error.response.data));
        }
    }

    function updateCompany() {
        navigator('/update-company/' + companyId);
    }

    function updatePassword() {
        navigator('/update-company/' + companyId + '/change-password');
    }

    return (
        <div className="CompanySpecs">
            
            { company &&
            <>
                <h1>Company Name: {company.name}</h1>
                <h2>Email: {company.email}</h2>
                {/* <h3>Product Price: {product.price}</h3>
                <h3>Product Price: {product.stock}</h3>
                <NavLink to={'/product/' + product.id}>Edit Product</NavLink> */}
                <div className="c_c_buttons">
                <button onClick={deleteCompany}>Delete Company</button>
                <button onClick={updateCompany}>Update Company</button>
                <button onClick={updatePassword}>Change Password</button>
                </div>
            </>
            }
        </div>
    );
}

export default CompanySpecs;
