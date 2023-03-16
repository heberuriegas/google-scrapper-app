import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./features/auth/components/RequireAuth";
import { SignIn } from "./features/auth/screens/SignIn";
import { SignUp } from "./features/auth/screens/SignUp";
import { ListKeywords } from "./features/searchKeywords/screens/ListKeywords";

function App() {
  return (
    <div id="app" data-testid="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <ListKeywords />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
