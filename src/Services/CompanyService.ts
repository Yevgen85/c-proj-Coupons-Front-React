import axios from "axios";
import appConfig from "../Configurations/Config";
import CompanyModel from "../Models/CompanyModel";
import { authStore } from "../Redux/AuthorisationState";
import {
  companiesStore,
  CompanyActionType,
  getAddAction,
  getFetchAction,
} from "../Redux/CompaniesState";
import { type } from "os";
import ErrorModel from "../Models/ErrorModel";
import { error } from "console";
import ClientType from "../Models/ClientType";
import ChangePasswordModel from "../Models/ChangePasswordModel";
import { id } from "date-fns/locale";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CompanyService {
  async getCompanies(): Promise<CompanyModel[]> {
    if (companiesStore.getState().companyList.length === 0) {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      console.log("headers");
      console.log(headers);

      const response = await axios.get<CompanyModel[]>(
        appConfig.apiAddress + "/company",
        { headers }
      );
      companiesStore.dispatch(getFetchAction(response.data));
      console.log("APICall getAll");
      return response.data;
    }
    return companiesStore.getState().companyList;
  }

  async addCompany(companyModel: CompanyModel): Promise<CompanyModel | void> {
    if (
      companiesStore
        .getState()
        .companyList.find((c) => c.name.match(companyModel.name))
    ) {
      toast.error("Company Name Exists");
      return;
    }

    if (
      companiesStore
        .getState()
        .companyList.find((c) => c.email.match(companyModel.email))
    ) {
      toast.error("Company Email Exists");
      return;
    }
    const headers = { Authorization: "Bearer " + authStore.getState().token };
    const response = await axios.post<CompanyModel>(
      appConfig.apiAddress + "/company",
      companyModel,
      { headers }
    );

    this.getCompanies();
    companiesStore.getState().companyList.push(response.data);
    toast.success("Company Added");
    return response.data;
  }

  async getSingleCompany(id: number): Promise<CompanyModel> {
    if (companiesStore.getState().companyList.length) {
      const index = companiesStore
        .getState()
        .companyList.findIndex((company) => company.id === id);
      return companiesStore.getState().companyList[index];
    } else {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      const response = await axios.get<CompanyModel>(
        appConfig.apiAddress + "/company/" + id,
        {
          headers,
        }
      );
      return response.data;
    }
  }

  async deleteCompany(id: number): Promise<void> {
    if (authStore.getState().user?.clientType.includes("ADMINISTRATOR")) {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      const response = await axios.delete<void>(
        appConfig.apiAddress + "/company/" + id,
        { headers }
      );

      
      // add .then and .catch if not deleted

      companiesStore.dispatch({
        type: CompanyActionType.DeleteCompany,
        payload: id,
      });
    } else {
      toast.error("Unauthorised!");
    }
  }

  async updateCompany(
    id: number,
    company: CompanyModel
  ): Promise<CompanyModel> {
    const headers = { Authorization: "Bearer " + authStore.getState().token };

    const response = await axios.put<CompanyModel>(
      appConfig.apiAddress + "/company/" + id,
      company,
      { headers }
    );
    company.id = id;
    companiesStore.dispatch({
      type: CompanyActionType.UpdateCompany,
      payload: company,
    });

    return response.data;
  }

  async updateCompanyPassword(
    id: number,
    newPassword: ChangePasswordModel
  ): Promise<any> {
    const headers = { Authorization: "Bearer " + authStore.getState().token };
    await axios.put<ChangePasswordModel>(
      appConfig.apiAddress + "/company/update-password/" + id,
      newPassword,
      { headers }
    );
  }
}

const companyService = new CompanyService();
export default companyService;
