import { createStore, Store } from "redux";
import CategoryModel from "../Models/CategoryModel";

// 1
export class CategoriesState {
  [x: string]: any;
  categoryList: CategoryModel[] = [];
}

// 2
export enum CategoryActionType {
  FetchCategories,
}

//3
export interface CategoryAction {
  type: CategoryActionType;
  payload: any;
}

//4
export function getFetchAction(categoryList: CategoryModel[]): CategoryAction {
  return { type: CategoryActionType.FetchCategories, payload: categoryList };
}

//5
export function categoriesReducer(
  currentState: CategoriesState = new CategoriesState(),
  action: CategoryAction
): CategoriesState {
  const newState: CategoriesState = { ...currentState };
  console.log(action.type);
  switch (action.type) {
    case CategoryActionType.FetchCategories:
      newState.categoryList = action.payload;
      break;
  }

  return newState;
}

// 6
export const categoriesStore = createStore(categoriesReducer);
