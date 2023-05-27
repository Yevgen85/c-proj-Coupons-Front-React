import jwt from "jsonwebtoken";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";
import {
  CompaniesState,
  clearCompanyStateAction,
  companiesReducer,
  companiesStore,
} from "./CompaniesState";
import { CompanyActionType } from "./CompaniesState";
import { clearCouponStateAction, couponsStore } from "./CouponsState";
import { clearCustomerStateAction, customersStore } from "./CustomersState";
import {
  clearPurchasedCouponsStateAction,
  purchasedCouponsStore,
} from "./PurchasedCouponsState";

// interface AdminToken {
//     clientType: string;
//     username: string;
//     iat: number;
//     exp: number;
//     // add any other fields from your token's payload here
//   }

export class AuthState {
  user: UserModel | null = null;
  token: string | null = null;

  constructor() {
    // const token: string = ("eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRUeXBlIjoiQURNSU5JU1RSQVRPUiIsInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgxNDA4NzQwLCJleHAiOjE2ODE0MTA1NDB9.9-_GV-EHXmerC1Jn7J8hQgeWyxAu5zieLHia4BIxGg4")

    let token: string | null;
    let userFromJwt: UserModel;
    try {
      token = localStorage.getItem("token");
      if (token) {
        console.log("tokenFromLocalStorage");
        userFromJwt = jwtDecode(token);
        this.user = userFromJwt;
        this.token = token;
        console.log("loaded from ls");
        console.log(this.user);
        console.log(token);
      } else {
        this.token = null;
        this.user = null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export enum AuthActionType {
  Login,
  Logout,
}

export interface Action {
  type: AuthActionType;
  payload?: any;
}

export function loginAction(token: string): Action {
  return { type: AuthActionType.Login, payload: token };
}

export function logoutAction(): Action {
  return { type: AuthActionType.Logout };
}

export function authReducer(
  currentState: AuthState = new AuthState(),
  action: Action
): AuthState {
  const newState: AuthState = { ...currentState };

  switch (action.type) {
    case AuthActionType.Login:
      const token: { token: string } = action.payload;
      // const token = "eyJhbGciOiJIUzI1NiJ9.eyJjbGllbnRUeXBlIjoiQURNSU5JU1RSQVRPUiIsInVzZXJuYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgxNDA4NzQwLCJleHAiOjE2ODE0MTA1NDB9.9-_GV-EHXmerC1Jn7J8hQgeWyxAu5zieLHia4BIxGg4";
      newState.token = token.token;
      let userFromJwt: UserModel;
      try {
        userFromJwt = jwtDecode(JSON.stringify(token));
        newState.user = userFromJwt;
      } catch (error) {
        console.log(error);
      }

      console.log("reducer");
      console.log(newState.token);
      console.log(newState.user);
      localStorage.setItem("token", token.token);
      break;

    case AuthActionType.Logout:
      newState.token = null;
      newState.user = null;
      companiesStore.dispatch(clearCompanyStateAction());
      couponsStore.dispatch(clearCouponStateAction());
      customersStore.dispatch(clearCustomerStateAction());
      purchasedCouponsStore.dispatch(clearPurchasedCouponsStateAction());
      localStorage.removeItem("token");
      break;
  }

  return newState;
}

export const authStore = createStore(authReducer);
