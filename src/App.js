import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from './store/auth-context';
import { useContext, useEffect } from "react";

function App() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/auth", { replace: true });
    }
  }, [authCtx.isLoggedIn, navigate]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && (
          <Route path="/auth" element={<AuthPage />} />
        )}
        <Route path="/profile" element={authCtx.isLoggedIn ? <UserProfile /> : null} />
        <Route path="*" element={authCtx.isLoggedIn ? null : <Navigate to="/auth" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
