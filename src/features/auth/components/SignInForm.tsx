import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { responseErrors } from "../../../utils/handleErrors";
import { useAuth } from "../hooks/useAuth";
YupPassword(yup); // extend yup

type SignInInputs = {
  email: string;
  password: string;
};

/**
 * Form that allow a user to sign in with email and password using react hook form
 * @returns {ReactElement}
 */
export const SignInForm = () => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Form validations
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().password().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInInputs>({ resolver: yupResolver(schema) });

  /**
   * Call sign in api call or set form validation errors
   * @param {Object} obj
   * @param {string} obj.email
   * @param {string} obj.password
   */
  const onSubmit: SubmitHandler<SignInInputs> = async ({ email, password }) => {
    try {
      setLoading(true);
      await signIn({ email, password });
      navigate("/");
    } catch (err: unknown) {
      const validationErrors = responseErrors(err as AxiosError);
      if (validationErrors) {
        Object.keys(validationErrors).forEach((attribute) => {
          setError(attribute as any, {
            type: "custom",
            message: validationErrors[attribute].join(", "),
          });
        });
      } else {
        setError("password", {
          type: "custom",
          message: "The password was incorrect. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@company.com"
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Password
          </label>
        </div>
        <input
          type="password"
          id="password"
          placeholder="Your Password"
          className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="mb-6">
        <button
          disabled={loading}
          type="submit"
          className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
        >
          {loading ? "..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};
