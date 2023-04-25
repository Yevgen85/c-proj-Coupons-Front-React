import jwtDecode from "jwt-decode";
import { authStore } from "../Redux/AuthorisationState";

class TokenService {

    isTokenNotExpired() {
        const decodedToken: any = jwtDecode(authStore.getState().token!);
        const expirationDate: Date = new Date(decodedToken.exp * 1000);
        const currentDate: Date = new Date();

         if (expirationDate > currentDate) {
          // Token is not expired
          return true;
            } else {
          // Token is expired
          return false;
        }
    }
}
const tokenService = new TokenService();
export default tokenService;

