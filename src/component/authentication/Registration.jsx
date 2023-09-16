import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegisterAuthMutation } from "../../Features/apiSlice";
import { useEffect } from "react";

const Registration = () => {
  const [setAuthData, { data: authResponse, isLoading }] =
    useRegisterAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "alfaz@gmail.com", password: "12345678" },
    resolver: yupResolver(
      yup.object({
        name: yup.string().required("name is required"),
        email: yup
          .string()
          .required("email is required")
          .email("invalid email address"),
        password: yup
          .string()
          .required("password is required")
          .min(8, "Password must be 8 digits long"),
        confirmPassword: yup
          .string()
          .required("Confirm password is required")
          .oneOf(
            [yup.ref("password"), null],
            "Password and confirm password must match"
          ),
      })
    ),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await setAuthData(data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const naviagte = useNavigate();

  useEffect(() => {
    if (authResponse?.accessToken) {
      localStorage.setItem("token", authResponse?.accessToken);
      naviagte("/");
    }
  }, [authResponse]);

  return (
    <div>
      <form
        className="flex min-h-[70vh] gap-3 justify-center flex-col p-4 lg:w-1/4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
        onReset={reset}
      >
        <h3 className="text-5xl text-center mb-2 font-bold">Register here</h3>
        <hr />
        <label>Name</label>
        <input
          className="bg-gray-50 rounded py-1 px-2 border-[1px] focus:outline-sky-500/50"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <label>Email</label>
        <input
          className="bg-gray-50 rounded py-1 px-2 border-[1px] focus:outline-sky-500/50"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label>Password</label>
        <input
          className="bg-gray-50 rounded py-1 px-2 border-[1px] focus:outline-sky-500/50"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label>Confirm Password</label>
        <input
          className="bg-gray-50 rounded py-1 px-2 border-[1px] focus:outline-sky-500/50"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button className="border-[1px] border-red-100 bg-red-50 text-red-400 rounded font-semibold tracking-wider py-1 cursor-pointer hover:bg-red-100">
          {isLoading ? "sign up proccecing..." : "sign up"}
        </button>

        <hr />
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link
            className="text-cyan-700 hover:underline hover:text-orange-600"
            to="/auth/login"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Registration;
