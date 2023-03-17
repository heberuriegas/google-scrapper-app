import { SignUpForm } from "../components/SignUpForm";

/**
 * Allow a user to create an account
 * @returns {ReactElement}
 */
export const SignUp = () => {
  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign up
            </h1>
          </div>
          <div className="m-7">
            <SignUpForm />
            <p className="text-sm text-center text-gray-400">
              Already have an account yet?{" "}
              <a
                href="/sign_in"
                className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >
                Sign in
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
