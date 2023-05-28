import axios from "axios";
import appConfig from "../Configurations/Config";
import { authStore } from "../Redux/AuthorisationState";
import ErrorModel from "../Models/ErrorModel";
import CustomerModel from "../Models/CustomerModel";
import {
  CustomerActionType,
  customersStore,
  getFetchAction,
} from "../Redux/CustomersState";
import ChangePasswordModel from "../Models/ChangePasswordModel";
import { toast } from "react-toastify";

class CustomerService {
  async getCustomers(): Promise<CustomerModel[]> {
    if (customersStore.getState().customerList.length === 0) {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      console.log("headers");
      console.log(headers);
      const response = await axios.get<CustomerModel[]>(
        appConfig.apiAddress + "/customer",
        { headers }
      );
      customersStore.dispatch(getFetchAction(response.data));
      console.log("APICall getAll");
      return response.data;
    }
    return customersStore.getState().customerList;
  }

  async addCustomer(
    customerModel: CustomerModel
  ): Promise<CustomerModel | void> {
    if (
      customersStore
        .getState()
        .customerList.find((c) => c.email.match(customerModel.email))
    ) {
      toast.error("Customer Email Exists");
      return;
    }
    const headers = { Authorization: "Bearer " + authStore.getState().token };
    const response = await axios.post<CustomerModel>(
      appConfig.apiAddress + "/customer",
      customerModel,
      { headers }
    );
    this.getCustomers();
    customersStore.getState().customerList.push(response.data);
    toast.success("Customer Added!")
    return response.data;
  }

  async getSingleCustomer(id: number): Promise<CustomerModel> {
    if (customersStore.getState().customerList.length) {
      const index = customersStore
        .getState()
        .customerList.findIndex((customer) => customer.id === id);
      console.log("single customer index: " + index);
      return customersStore.getState().customerList[index];
    } else {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      const response = await axios.get<CustomerModel>(
        appConfig.apiAddress + "/customer/" + id,
        {
          headers,
        }
      );
      return response.data;
    }
  }

  async deleteCustomer(id: number): Promise<void> {
    if (authStore.getState().user?.clientType.includes("ADMINISTRATOR")) {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      const response = await axios.delete<void>(
        appConfig.apiAddress + "/customer/" + id,
        { headers }
      );
      customersStore.dispatch({
        type: CustomerActionType.DeleteCustomer,
        payload: id,
      });
    } else {
      toast.error("Unauthorised!");
    }
  }

  async updateCustomer(
    id: number,
    customer: CustomerModel
  ): Promise<CustomerModel> {
    const headers = { Authorization: "Bearer " + authStore.getState().token };
    const response = await axios.put<CustomerModel>(
      appConfig.apiAddress + "/customer/" + id,
      customer,
      { headers }
    );
    customer.id = id;
    customersStore.dispatch({
      type: CustomerActionType.UpdateCustomer,
      payload: customer,
    });
    return response.data;
  }

  async updateCustomerPassword(
    id: number,
    newPassword: ChangePasswordModel
  ): Promise<any> {
    const headers = { Authorization: "Bearer " + authStore.getState().token };
    await axios.put<ChangePasswordModel>(
      appConfig.apiAddress + "/customer/update-password/" + id,
      newPassword,
      { headers }
    );
  }
}

const customerService = new CustomerService();
export default customerService;
