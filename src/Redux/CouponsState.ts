import { createStore, Store } from "redux";
import CouponModel from "../Models/CouponModel";



// 1
export class CouponsState {
    couponList: CouponModel[] = [];
}


// 2
export enum CouponActionType {
    FetchCoupon,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon,
    ClearState,
    PurchaseCoupon
}


//3
export interface CouponAction {
    type: CouponActionType,
    payload?: any
}


//4
export function getFetchAction(couponList: CouponModel[]): CouponAction {
    return {type: CouponActionType.FetchCoupon, payload: couponList};
}

export function clearCouponStateAction(): CouponAction {
    return {type: CouponActionType.ClearState};
}



//5
export function couponsReducer(currentState: CouponsState = new CouponsState(), action: CouponAction): CouponsState {

    const newState: CouponsState = {...currentState};
    console.log(action.type);
    switch (action.type) {
        case CouponActionType.FetchCoupon:
            newState.couponList = action.payload;
            break;
        case CouponActionType.AddCoupon:
            newState.couponList.push(action.payload);
            break;
        case CouponActionType.UpdateCoupon:
            const indexToUpdate = newState.couponList.findIndex(coupon => coupon.id === action.payload.id);
            newState.couponList[indexToUpdate] = action.payload;
            break;
        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.couponList.findIndex(coupon => coupon.id === action.payload);
            newState.couponList.splice(indexToDelete, 1);
            break;
        case CouponActionType.ClearState:
            newState.couponList = [];
            break;
        case CouponActionType.PurchaseCoupon:
            newState.couponList.push(action.payload);
            break;
    }

    return newState;
    
}

// 6

export const couponsStore = createStore(couponsReducer);


