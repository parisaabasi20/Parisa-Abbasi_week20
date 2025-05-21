import styles from "./RegisterPage.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/auth";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const loginShema = Yup.object().shape({
  username: Yup.string()
    .required("نام کاربری لازم است")
    .min(4, "نام کاربری باید حداقل ۴ کاراکتر باشد")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "نام کاربری فقط می‌تواند شامل حروف، عدد و _ باشد"
    ),

  password: Yup.string()
    .required("رمز عبور الزامی است")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .matches(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
    .matches(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
    .matches(/[^a-zA-Z0-9]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"),

  confirmPassword: Yup.string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([Yup.ref("password")], "رمزهای عبور مطابقت ندارند"),
});

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginShema) });

  const navigate = useNavigate();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("ثبت نام موفق", data);
      navigate("/login");
    },
    onError: (error) => {
      console.log(
        "خطا در ثبت نام",
        error?.response?.data?.message || "خطایی رخ داده است"
      );
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <h1 className={styles.header}>بوت کمپ بوتواستارت</h1>
      <div className={styles.containerForm}>
        <div className={styles.title}>
          <img src="../../public/assets/icon.svg" alt="icon" />
          <h2>فرم ثبت نام</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            {...register("username")}
            placeholder="نام کاربری"
          />
          {errors.username && (
            <p style={styles.error}>{errors.username.message}</p>
          )}

          <input
            type="password"
            {...register("password")}
            placeholder="رمز عبور "
          />
          {errors.password && (
            <p style={styles.error}>{errors.password.message}</p>
          )}
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="تکرار رمز عبور "
          />
          {errors.password && (
            <p style={styles.error}>{errors.confirmPassword.message}</p>
          )}
          <button type="submit">ثبت نام</button>
        </form>
        <Link to="/login"> حساب کاربری دارید؟</Link>
      </div>
    </>
  );
}

export default RegisterPage;
