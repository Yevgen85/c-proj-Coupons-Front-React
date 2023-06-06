import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthState, authStore } from "../../../Redux/AuthorisationState";
import "./Coupons.css";
import tokenService from "../../../Services/TokenService";
import CouponModel from "../../../Models/CouponModel";
import couponService from "../../../Services/CouponService";
import { couponsStore } from "../../../Redux/CouponsState";
import CouponCard from "../CouponCard/CouponCard";
import CategoryModel from "../../../Models/CategoryModel";
import categoryService from "../../../Services/CategoryService";
import { useForm } from "react-hook-form";
import customerService from "../../../Services/CustomerService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "react-scroll-to-top";

function Coupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CouponModel>();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired() &&
      authStore.getState().user?.clientType?.includes("COMPANY")
    ) {
      console.log("token not null" + authStore.getState().token);
      couponService
        .getCouponsByCompany()
        .then((response) => {
          console.log(response);
          setCoupons(response);
        })
        .catch((error) => {
          toast.error(error.response.data.value);
        });
    } else if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired() &&
      authStore.getState().user?.clientType?.includes("CUSTOMER")
    ) {
      couponService
        .getCoupons()
        .then((response) => {
          console.log(response);
          setCoupons(response);
        })
        .catch((error) => {
          toast.error(error.response.data.value);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setCoupons(couponsStore.getState().couponList);
    const unsubscribe = couponsStore.subscribe(() => {
      setCoupons(couponsStore.getState().couponList);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    categoryService
      .getCategories()
      .then((response) => {
        console.log(response);
        setCategories(response);
      })
      .catch((error) => {
        toast.error(error.response.data.value);
      });
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryName = event.target.value;
    const selectedCategory = categories.find((c) => c.name === categoryName);
    setSelectedCategory(selectedCategory);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(event.target.value);
    setMaxPrice(price);
  };

  const filteredCoupons = coupons.filter((coupon) => {
    if (maxPrice && coupon.price > maxPrice) {
      return false;
    }
    if (selectedCategory && coupon.category.id !== selectedCategory.id) {
      return false;
    }
    return true;
  });

  return (
    <div>
      <div className="filterSelectors">
        filter by MAX price:
        <br />
        <input
          type="number"
          placeholder="Enter Max Price"
          onChange={handleMaxPriceChange}
        />
        filter by CATEGORY:
        <br />
        <select
          className="categorySelector"
          {...register("category")}
          value={selectedCategory?.name}
          onChange={handleCategoryChange}
          defaultValue=""
        >
          <option value="">--ALL CATEGORIES--</option>
          {categories &&
            categories.map((option) => (
              <option key={option.name} value={option.name}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      <div className="Coupons">
        {filteredCoupons.map((coupon) => (
          <CouponCard key={coupon.id} {...coupon} />
        ))}
      </div>

    </div>
  );
}

export default Coupons;
