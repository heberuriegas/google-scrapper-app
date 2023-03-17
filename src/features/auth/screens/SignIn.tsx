import { SignInForm } from "../components/SignInForm";

/**
 * Allow a user to authenticate to the application
 * @returns {ReactElement}
 */
export const SignIn = () => {
  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign in
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <div className="m-7">
            <SignInForm />
            <p className="text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?{" "}
              <a
                href="/sign_up"
                className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
              >
                Sign up
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
