import "./App.scss";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div id="app" data-testid="app">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
