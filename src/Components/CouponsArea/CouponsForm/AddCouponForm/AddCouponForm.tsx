import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import "./AddCouponForm.css";
import CategoryModel from "../../../../Models/CategoryModel";
import categoryService from "../../../../Services/CategoryService";
import tokenService from "../../../../Services/TokenService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddCouponForm(): JSX.Element {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryModel[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponModel>();
  const today = new Date();

  const addCoupon = (coupon: CouponModel) => {
    if (tokenService.isTokenNotExpired()) {
      let categoryObj: CategoryModel | any = categories?.find((c) =>
        c.name?.includes(coupon.category.name)
      );
      coupon.category = categoryObj;
      couponService
        .addCoupon(coupon)
        .then((response) => {
          if(response !== null) {
            toast.success("Success!")
          reset();
          navigate("/company/coupons");
          }
          else {
            reset();
            
          }
        })
        .catch((error) => {
          toast.error(error.response.data.value);
        });
    } else {
      navigate("/login");
    }
  };

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

  return (
    <div className="AddCouponForm">
      <form onSubmit={handleSubmit(addCoupon)}>
        <h1>Add Coupon</h1>
        <div>
        Title:
        <br />
        <input
          type="text"
          placeholder="Name"
          {...register("title", {
            required: { value: true, message: "**This field is mandatory" },
            minLength: { value: 2, message: "**Minimun 2..." },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        <br />
        {errors.title?.message && (
          <span className="red">{errors.title?.message}</span>
        )}
        <br />
        Description:
        <br />
        <input
          type="text"
          placeholder="Description"
          {...register("description", {
            required: { value: true, message: "**This field is mandatory" },
            minLength: { value: 2, message: "**Minimun 2..." },
            maxLength: {
              value: 50,
              message: "Maximum length of 50 characters exceeded",
            },
          })}
        />
        <br />
        {errors.description?.message && (
          <span className="red">{errors.description?.message}</span>
        )}
        <br />
        Image:
        <br />
        <input
          type="text"
          placeholder="Image"
          {...register("image", {
            required: { value: true, message: "**This field is mandatory" },
            minLength: { value: 2, message: "**Minimun 2..." },
          })}
        />
        <br />
        {errors.image?.message && (
          <span className="red">{errors.image?.message}</span>
        )}
        <br />
        Category:
        <br />
        <select
          className="categorySelector"
          {...register("category.name", {
            required: { value: true, message: "**This field is mandatory" },
          })}
        >
          <option value="">--SELECT CATEGORY--</option>
          {categories &&
            categories.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
        </select>
        <br />
        {errors.category?.message && (
          <span className="red">{errors.category?.message}</span>
        )}
        <br />
        </div>
        
        <div>
        Start Date:
        <br />
        <input
          type="date"
          {...register("startDate", {
            required: "**This field is mandatory",
            validate: {
              notBeforeToday: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set current time to midnight for accurate comparison
                return (
                  selectedDate >= today ||
                  "**Start date should not be before today"
                );
              },
            },
          })}
        />
        <br />
        {errors.startDate?.message && (
          <span className="red">{errors.startDate?.message}</span>
        )}
        <br />
        End Date:
        <br />
        <input
          type="date"
          {...register("endDate", {
            required: "**This field is mandatory",
            validate: (value, { startDate }) =>
              new Date(value) >= new Date(startDate) ||
              "**End date should be after start date",
          })}
        />
        <br />
        {errors.endDate?.message && (
          <span className="red">{errors.endDate?.message}</span>
        )}
        <br />
        Amount:
        <br />
        <input
          type="number"
          placeholder="Amount"
          {...register("amount", {
            required: { value: true, message: "**This field is mandatory" },
            min: { value: 1, message: "**Amount cannot be less than 1" },
            max: { value: 1000, message: "**Amount can be maximum 1,000" },
          })}
        />
        <br />
        {errors.amount?.message && (
          <span className="red">{errors.amount?.message}</span>
        )}
        <br />
        Price:
        <br />
        <input
          type="number"
          placeholder="Price"
          {...register("price", {
            required: { value: true, message: "**This field is mandatory" },
            min: { value: 1, message: "**Price cannot be less than 1" },
            max: {
              value: 1000000,
              message: "**Price can be maximum 1,000,000",
            },
          })}
        />
        <br />
        {errors.price && <span className="red">{errors.price.message}</span>}
        <br />
        <br />
        </div>
        <div className="submitButtonDiv">
          <button className="submitButton" type="submit">
            ADD
          </button>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default AddCouponForm;
