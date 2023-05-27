import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import { authStore } from "../Redux/AuthorisationState";
import { categoriesStore, getFetchAction } from "../Redux/CategoriesState";
import appConfig from "../Configurations/Config";

class CategoryService {
  async getCategories(): Promise<CategoryModel[]> {
    if (categoriesStore.getState().categoryList.length === 0) {
      const headers = { Authorization: "Bearer " + authStore.getState().token };
      console.log("headers");
      console.log(headers);
      const response = await axios.get<CategoryModel[]>(
        appConfig.apiAddress + "/category",
        { headers }
      );
      categoriesStore.dispatch(getFetchAction(response.data));
      console.log("APICall getAll");
      return response.data;
    }
    return categoriesStore.getState().categoryList;
  }
}

const categoryService = new CategoryService();
export default categoryService;
