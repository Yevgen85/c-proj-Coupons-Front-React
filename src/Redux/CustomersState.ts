import { createStore, Store } from "redux";
import CustomerModel from "../Models/CustomerModel";



// 1
export class CustomersState {
    customerList: CustomerModel[] = [];
}


// 2
export enum CustomerActionType {
    FetchCustomer,
    AddCustomer,
    UpdateCustomer,
    DeleteCustomer,
    ClearState
}


//3
export interface CustomerAction {
    type: CustomerActionType,
    payload?: any
}


//4
export function getFetchAction(customerList: CustomerModel[]): CustomerAction {
    return {type: CustomerActionType.FetchCustomer, payload: customerList};
}

export function clearCustomerStateAction(): CustomerAction {
    return {type: CustomerActionType.ClearState};
}


//5
export function customersReducer(currentState: CustomersState = new CustomersState(), action: CustomerAction): CustomersState {

    const newState: CustomersState = {...currentState};
    console.log(action.type);
    switch (action.type) {
        case CustomerActionType.FetchCustomer:
            newState.customerList = action.payload;
            break;
        case CustomerActionType.AddCustomer:
            newState.customerList.push(action.payload);
            break;
        case CustomerActionType.UpdateCustomer:
            const indexToUpdate = newState.customerList.findIndex(customer => customer.id === action.payload.id);
            newState.customerList[indexToUpdate] = action.payload;
            break;
        case CustomerActionType.DeleteCustomer:
            const indexToDelete = newState.customerList.findIndex(customer => customer.id === action.payload);
            newState.customerList.splice(indexToDelete, 1);
            break;
        case CustomerActionType.ClearState:
            newState.customerList = [];
            break;
    }

    return newState;
    
}

// 6
export const customersStore = createStore(customersReducer);



