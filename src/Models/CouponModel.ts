import CategoryModel from "./CategoryModel";

interface CouponModel {
    id: number,
    category: CategoryModel,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    anount: number,
    price: number,
    image: string,
}

export default CouponModel;