import axios from "axios";
import appConfig from "../Configurations/Config";
import { authStore } from "../Redux/AuthorisationState";
import CouponModel from "../Models/CouponModel";
import { CouponActionType, couponsStore, getFetchAction } from "../Redux/CouponsState";


class CouponService {
    async getCoupons(): Promise<CouponModel[]> {
        // if(couponsStore.getState().couponList.length === 0) {
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            console.log("headers")
            console.log(headers)
            const response = await axios.get<CouponModel[]>(appConfig.apiAddress + '/coupon', {headers});
            couponsStore.dispatch(getFetchAction(response.data));
            console.log('APICall getAll');
            return response.data;
        // }
        // return couponsStore.getState().couponList;
    }

    async getCouponsByCompany(): Promise<CouponModel[]> {
        // if(couponsStore.getState().couponList.length === 0) {
            const thisCompanyId = authStore.getState().user?.id;
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            console.log("headers")
            console.log(headers)
            const response = await axios.get<CouponModel[]>(appConfig.apiAddress + '/coupon/company/' + thisCompanyId, {headers});
            couponsStore.dispatch(getFetchAction(response.data));
            console.log('APICall getAll');
            return response.data;
        // }
        // return couponsStore.getState().couponList;
    }

    async getPurchasedCoupons(): Promise<CouponModel[]> {
        // if(couponsStore.getState().couponList.length === 0) {
            const thisCustomerId = authStore.getState().user?.id;
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            console.log("headers")
            console.log(headers)
            const response = await axios.get<CouponModel[]>(appConfig.apiAddress + '/customer-vs-coupons/' + thisCustomerId, {headers});
            couponsStore.dispatch(getFetchAction(response.data));
            console.log('APICall getAll');
            return response.data;
        // }
        // return couponsStore.getState().couponList;
    }

    async addCoupon(couponModel: CouponModel): Promise<CouponModel> {
        if(couponsStore.getState().couponList.length === 0) {
            this.getCoupons().then(() => {}).catch(error => {alert(error.response.data.value)});  
        }
        if (couponsStore.getState().couponList.find(c => c.title.match(couponModel.title))) {
            alert("Coupon Title Exists");
        }
        // authStore.getState().user.
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            const response = await axios.post<CouponModel>(appConfig.apiAddress + "/coupon", couponModel , {headers});
            couponsStore.getState().couponList.push(response.data);
            alert("Sucessful!");
            return response.data;
    }

    async getSingleCoupon(id: number): Promise<CouponModel> { 
        const index = couponsStore.getState().couponList.findIndex(coupon => coupon.id === id);
        return couponsStore.getState().couponList[index];
    }

    async deleteCoupon(id: number): Promise<void> {
        if(authStore.getState().user?.clientType.includes('COMPANY')) {
            const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
            await axios.delete<void>(appConfig.apiAddress + "/coupon/" + id, {headers});
            couponsStore.dispatch({type: CouponActionType.DeleteCoupon, payload: id});
        }
        else {
            alert("Unauthorised!");
        }
    }

    async updateCoupon(id: number, coupon: CouponModel): Promise<CouponModel> {
        const headers = { 'Authorization': 'Bearer '+ authStore.getState().token};
        const response = await axios.put<CouponModel>(appConfig.apiAddress + "/coupon/" + id, coupon, {headers});
        coupon.id = id;
        couponsStore.dispatch({type: CouponActionType.UpdateCoupon, payload: coupon});
        return response.data;
    }


}

const couponService = new CouponService();
export default couponService;

