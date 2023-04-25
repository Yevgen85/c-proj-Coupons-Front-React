import ClientType from "./ClientType";

interface UserModel {

    id: string;
    firstName: string;
    lastName: string;
    name: string;
    iat: number;
    exp: number;
    password: string;
    enabled: boolean; 
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    email: string;
    clientType: string;
    username: string;


}
export default UserModel;
// id: string,
// firstName: string,
//     lastName: string,
//     name: string
//     iat: number,
//     exp: number,
//     password: string,
//     enabled: boolean, 
//     accountNonExpired: boolean,
//     credentialsNonExpired: boolean,
//     authorities: [],
//     accountNonLocked: boolean
// email: string