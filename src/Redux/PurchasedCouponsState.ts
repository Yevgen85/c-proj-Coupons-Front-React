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
}


//3
export interface PurchasedCouponAction {
    type: PurchasedCouponActionType,
    payload: any
}


//4
export function getFetchAction(purchasedCouponList: CouponModel[]): PurchasedCouponAction {
    return {type: PurchasedCouponActionType.FetchCoupons, payload: purchasedCouponList};
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
    }

    return newState;
    
}

// 6
export const purchasedCouponsStore = createStore(purchasedCouponsReducer);



