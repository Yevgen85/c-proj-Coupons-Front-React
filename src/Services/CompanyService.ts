import axios from "axios";
import appConfig from "../Configurations/Config";
import CompanyModel from "../Models/CompanyModel";
import { authStore } from "../Redux/AuthorisationState";
import { companiesStore, CompanyActionType, getAddAction, getFetchAction } from "../Redux/CompaniesState";
import { type } from "os";
import ErrorModel from "../Models/ErrorModel";
import { error } from "console";
import ClientType from "../Models/ClientType";


class CompanyService {
    async getCompanies(): Promise<CompanyModel[]> {
        if(companiesStore.getState().companyList.length === 0) {
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            console.log("headers")
            console.log(headers)
            try {
            const response = await axios.get<CompanyModel[]>(appConfig.apiAddress + '/company', {headers});
            companiesStore.dispatch(getFetchAction(response.data));
            console.log('APICall getAll');
            return response.data;
            } catch (error) {
                console.log(error)
            }
        }
        return companiesStore.getState().companyList;
    }

    async addCompany(companyModel: CompanyModel): Promise<CompanyModel | void> {
        if (companiesStore.getState().companyList.find(c => c.name.match(companyModel.name))) {
            alert("Company Name Exists");
            return;
        }

        if ((companiesStore.getState().companyList.find(c => c.email.match(companyModel.email)))) {
            alert("Company Email Exists");
            return;
        }
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            const response = await axios.post<CompanyModel>(appConfig.apiAddress + "/company", companyModel , {headers});
            companiesStore.getState().companyList.push(response.data);
            alert("Sucessful!");
            return response.data;
    }

    async getSingleCompany(id: number): Promise<CompanyModel> { 
        const index = companiesStore.getState().companyList.findIndex(company => company.id === id);
        return companiesStore.getState().companyList[index];
    }

    async deleteCompany(id: number): Promise<void> {
        if(authStore.getState().user?.clientType.includes('ADMINISTRATOR')) {
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            const response = await axios.delete<void>(appConfig.apiAddress + "/company/" + id, {headers});
            companiesStore.dispatch({type: CompanyActionType.DeleteCompany, payload: id});
        }
        else {
            alert("Unauthorised!");
        }
    }

    async updateCompany(id: number, company: CompanyModel): Promise<void> {
        const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
        let response;
        try {
        response = await axios.put<CompanyModel>(appConfig.apiAddress + "/company/" + id, company, {headers});
        companiesStore.dispatch({type: CompanyActionType.UpdateCompany, payload: id, response});
        } catch (error) {
            console.log(error)
        }
        // return response.data;
    }
}

const companyService = new CompanyService();
export default companyService;

