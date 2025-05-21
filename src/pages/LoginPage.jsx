import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth";

import styles from "./LoginPage.module.css";

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
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginShema) });

  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("ورود موفق", data);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(
        "خطا در ورود",
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
          <h2>فرم ورود</h2>
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
          <button type="submit">ورود</button>
        </form>
        <Link to="/signup">ایجاد حساب کاربری!</Link>
      </div>
    </>
  );
}

export default LoginPage;
