import ClientType from "./ClientType";

interface CustomerModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  clientType: ClientType;
}
export default CustomerModel;
