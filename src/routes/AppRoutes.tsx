import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { RequireAuth } from "../features/auth/components/RequireAuth";
import { useAuth } from "../features/auth/hooks/useAuth";
import { SignIn } from "../features/auth/screens/SignIn";
import { SignUp } from "../features/auth/screens/SignUp";
import { ListKeywords } from "../features/searchKeywords/screens/ListKeywords";

/**
 * If the initial user is loaded create the main application Routes
 * @returns {React Element | null}
 */
export const AppRoutes = () => {
  const { userLoading } = useAuth();
  return !userLoading ? (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <ListKeywords />
            </RequireAuth>
          }
        />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
      </Route>
    </Routes>
  ) : null;
};
