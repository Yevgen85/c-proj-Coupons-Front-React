import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import "./AddCouponForm.css";
import CategoryModel from "../../../../Models/CategoryModel";
import categoryService from "../../../../Services/CategoryService";

function AddCouponForm(): JSX.Element {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryModel[]>();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponModel>();
  const today = new Date();

  const addCoupon = (coupon: CouponModel) => {
    let categoryObj: CategoryModel | any = categories?.find((c) =>
      c.name.includes(coupon.category.name)
    );
    coupon.category = categoryObj;
    couponService
      .addCoupon(coupon)
      .then(() => {
        reset();
        navigate("/coupons");
      })
      .catch((error) => {
        alert(error.response.data.value);
      });
  };

  useEffect(() => {
    categoryService
      .getCategories()
      .then((response) => {
        console.log(response);
        setCategories(response);
      })
      .catch((error) => {
        alert(error.data);
      });
  }, []);

  return (
    <div className="AddCouponForm">
      <form onSubmit={handleSubmit(addCoupon)}>
        <h1>Add Coupon</h1>
        Title:
        <br />
        <input
          type="text"
          placeholder="Name"
          {...register("title", {
            required: { value: true, message: "**This field is mandatory" },
            minLength: { value: 2, message: "**Minimun 2..." },
          })}
        />
        <br />
        {errors.title?.message && (
          <span className="red">{errors.title?.message}</span>
        )}
        <br />
        <br />
        Description:
        <br />
        <input
          type="text"
          placeholder="Description"
          {...register("description", {
            required: { value: true, message: "**This field is mandatory" },
            minLength: { value: 2, message: "**Minimun 2..." },
          })}
        />
        <br />
        {errors.description?.message && (
          <span className="red">{errors.description?.message}</span>
        )}
        <br />
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
        <br />
        Start Date:
        <br />
        <input
          type="date"
          {...register("startDate", {
            required: { value: true, message: "**This field is mandatory" },
            validate: {
              notBeforeToday: (value) =>
                new Date(value) >= new Date(Date.now()) ||
                "**Start date should not be before today",
            },
          })}
        />
        <br />
        {errors.startDate?.message && (
          <span className="red">{errors.startDate?.message}</span>
        )}
        <br />
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
        <br />
        Amount:
        <br />
        <input
          type="number"
          placeholder="Amount"
          {...register("amount", {
            required: { value: true, message: "**This field is mandatory" },
            min: { value: 1, message: "**Amount cannot be less than 1" },
          })}
        />
        <br />
        {errors.amount?.message && (
          <span className="red">{errors.amount?.message}</span>
        )}
        <br />
        <br />
        Price:
        <br />
        <input
          type="number"
          placeholder="Price"
          {...register("price", {
            required: { value: true, message: "**This field is mandatory" },
            min: { value: 1, message: "**Price cannot be less than 1" },
          })}
        />
        <br />
        {errors.price && <span className="red">{errors.price.message}</span>}
        <br />
        <br />
        <br />
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
