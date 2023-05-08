import { createStore, Store } from "redux";
import CompanyModel from "../Models/CompanyModel";


// 1
export class CompaniesState {
    companyList: CompanyModel[] = [];
}


// 2
export enum CompanyActionType {
    FetchCompany,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
    ClearState
}


//3
export interface CompanyAction {
    type: CompanyActionType,
    payload?: any
}


//4
export function getFetchAction(companyList: CompanyModel[]): CompanyAction {
    return {type: CompanyActionType.FetchCompany, payload: companyList};
}

export function getAddAction(company: CompanyModel): CompanyAction {
    return {type: CompanyActionType.AddCompany, payload: company};
}

export function clearCompanyStateAction(): CompanyAction {
    return {type: CompanyActionType.ClearState};
}


//5
export function companiesReducer(currentState: CompaniesState = new CompaniesState(), action: CompanyAction): CompaniesState {

    const newState: CompaniesState = {...currentState};
    console.log(action.type);
    switch (action.type) {
        case CompanyActionType.FetchCompany:
            newState.companyList = action.payload;
            break;
        case CompanyActionType.AddCompany:
            newState.companyList.push(action.payload);
            break;
        case CompanyActionType.UpdateCompany:
            const indexToUpdate = newState.companyList.findIndex(company => company.id === action.payload.id);
            const company: CompanyModel = currentState.companyList[indexToUpdate];
            const updatedCompany: CompanyModel = action.payload;
            updatedCompany.id = company.id;
            newState.companyList.splice(indexToUpdate, 1 ,updatedCompany)
            console.log(newState.companyList)
            break;
        case CompanyActionType.DeleteCompany:
            const indexToDelete = newState.companyList.findIndex(company => company.id === action.payload);
            newState.companyList.splice(indexToDelete, 1);
            break;
        case CompanyActionType.ClearState:
            newState.companyList = [];
            break;
    }

    return newState;
    
}

// 6
export const companiesStore = createStore(companiesReducer);



