import { createStore, Store } from "redux";
import CouponModel from "../Models/CouponModel";



// 1
export class PurchasedCouponsState {
    purchasedCouponList: CouponModel[] = [];
}


// 2
export enum PurchasedCouponActionType {
    FetchCoupons,
    AddCoupon,
    ClearState
}


//3
export interface PurchasedCouponAction {
    type: PurchasedCouponActionType,
    payload?: any
}


//4
export function getPurchasedFetchAction(purchasedCouponList: CouponModel[]): PurchasedCouponAction {
    return {type: PurchasedCouponActionType.FetchCoupons, payload: purchasedCouponList};
}

export function clearPurchasedCouponsStateAction(): PurchasedCouponAction {
    return {type: PurchasedCouponActionType.ClearState};
}


//5
export function purchasedCouponsReducer(currentState: PurchasedCouponsState = new PurchasedCouponsState(), action: PurchasedCouponAction): PurchasedCouponsState {

    const newState: PurchasedCouponsState = {...currentState};
    console.log(action.type);
    switch (action.type) {
        case PurchasedCouponActionType.FetchCoupons:
            newState.purchasedCouponList = action.payload;
            break;
        case PurchasedCouponActionType.AddCoupon:
            newState.purchasedCouponList.push(action.payload);
            break;
        case PurchasedCouponActionType.ClearState:
            newState.purchasedCouponList = [];
            break;
    }

    return newState;
    
}

// 6
export const purchasedCouponsStore = createStore(purchasedCouponsReducer);



