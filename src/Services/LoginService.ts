import axios from "axios";

import appConfig from "../Configurations/Config";
import LoginModel from "../Models/LoginModel";

import {
  authStore,
  loginAction,
  logoutAction,
} from "../Redux/AuthorisationState";
import UserModel from "../Models/UserModel";

class LoginService {
  async login(loginModel: LoginModel): Promise<string> {
    const response = await axios.post<string>(
      appConfig.apiAddress + "/auth/login",
      loginModel
    );
    const token: string = response.data;
    authStore.dispatch(loginAction(token));
    return response.data;

    // const response = await axios.post<boolean>((appConfig.apiAddress + 'login?login=' + myLogin + '&password=' + myPassword));
  }

  logOut(): void {
    authStore.dispatch(logoutAction());
  }
}

const loginService = new LoginService();
export default loginService;
