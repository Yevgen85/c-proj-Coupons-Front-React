import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CouponModel from "../../../../Models/CouponModel";
import couponService from "../../../../Services/CouponService";
import "./UpdateCouponForm.css";
import CategoryModel from "../../../../Models/CategoryModel";
import categoryService from "../../../../Services/CategoryService";
import { useParams } from "react-router-dom";
import { number } from "yup";
import { authStore } from "../../../../Redux/AuthorisationState";
import tokenService from "../../../../Services/TokenService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UpdateCouponForm(): JSX.Element {
  const navigate = useNavigate();

  const params = useParams();
  const couponId = +params.couponId!;
  const [categories, setCategories] = useState<CategoryModel[]>();
  const [couponToUpdate, setCouponToUpdate] = useState<CouponModel>();
  const [selected, setSelected] = useState<CategoryModel>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CouponModel>();
  const today = new Date();

  useEffect(() => {
    couponService
      .getSingleCoupon(couponId)
      .then((response) => {
        console.log(response);

        setSelected(response.category);

        setCouponToUpdate(response);
        setValue("title", response.title);
        setValue("description", response.description);
        setValue("image", response.image);
        setValue("category", response.category);
        setValue("startDate", response.startDate);
        setValue("endDate", response.endDate);
        setValue("amount", response.amount);
        setValue("price", response.price);
      })
      .catch((error) => toast.error(error.response.data.value));
  }, [couponId, setValue]);

  const updateCoupon = (coupon: CouponModel) => {
    if (
      authStore.getState().token !== null &&
      tokenService.isTokenNotExpired()
    ) {
      let categoryObj: CategoryModel | any = categories?.find((c) =>
        c.name.includes(coupon.category.name)
      );

      coupon.category = categoryObj;
      coupon.id = couponId;
      couponService
        .updateCoupon(couponId, coupon)
        .then(() => {
          toast.success("Success!")
          reset();
          navigate("/company/coupons");
        })
        .catch((error) => {
          console.log(error.response.data.value);
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
    <div className="UpdateCouponForm">
      <form onSubmit={handleSubmit(updateCoupon)}>
        <h1>Update Coupon</h1>
        Title:
        <br />
        <input
          type="text"
          placeholder={couponToUpdate?.title}
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
          // defaultChecked={}
          className="categorySelector"
          {...register("category.name", {
            required: { value: true, message: "**This field is mandatory" },
          })}
        >
          <option value="">--SELECT CATEGORY--</option>
          {categories &&
            categories.map((option) => (
              <option
                key={option.id}
                value={option.name}
                selected={selected?.name === option.name ? true : false}
              >
                {option.name}
              </option>
            ))}
        </select>
        <br />
        {errors.category?.message && (
          <span className="red">{errors.category?.message}</span>
        )}
        <br />
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
        <div className="submitButtonDiv">
          <button className="submitButton" type="submit">
            UPDATE
          </button>
          <br />
          <br />
        </div>
      </form>
    </div>
  );
}

export default UpdateCouponForm;
