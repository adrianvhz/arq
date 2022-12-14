import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ArqPlataformRouter } from "./../app/router/ArqPlataformRouter";
import { AuthLayout } from "../auth/layouts/AuthLayout";
import { useAuthStore } from './../hooks/useCheckAuth';
import { CheckingAuth } from '../ui';
import PlanIndex from "../app/Builder/PlanIndex";

export const AppRouter = () => {
  const { status, useCheckAuth } = useAuthStore();

  useEffect(() => {
	  useCheckAuth();
  }, []);

  if (status === "checking") return <CheckingAuth />
  
  return (
    <Routes>
      {/*Login y Register */}
      {(status === "authenticated")
        ? (
          <>
            <Route path="/*" element={<ArqPlataformRouter />} />
            <Route path="/proyecto/:slug/:id" element={<PlanIndex />} />
          </>
        )
        : (
          <Route path="/auth/*" element={<AuthLayout />} />
        )
      }
      <Route path="/*" element={<Navigate to="/auth" />} />
    </Routes>
  )
}
