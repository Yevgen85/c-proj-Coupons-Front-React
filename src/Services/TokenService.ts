import jwtDecode from "jwt-decode";
import {
  AuthActionType,
  authStore,
  logoutAction,
} from "../Redux/AuthorisationState";
import { toast } from "react-toastify";

class TokenService {
  isTokenNotExpired() {
    const decodedToken: any = jwtDecode(authStore.getState().token!);
    const expirationDate: Date = new Date(decodedToken.exp * 1000);
    const currentDate: Date = new Date();

    if (expirationDate > currentDate) {
      // Token is not expired
      return true;
    } else {
      toast.error("Token is expired please login again!");
      authStore.dispatch(logoutAction());
      return false;
    }
  }
}
const tokenService = new TokenService();
export default tokenService;
