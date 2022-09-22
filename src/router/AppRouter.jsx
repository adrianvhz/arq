import { Navigate, Route, Routes } from "react-router-dom";
import { ArqPlataformRouter } from "./../app/router";
import { AuthLayout } from "../auth/layouts/AuthLayout";
import { useSelector } from "react-redux";
import { useAuthStore } from './../hooks/useCheckAuth';
import { CheckingAuth } from '../ui';
import { useEffect } from 'react';

export const AppRouter = () => {
  const { status, useCheckAuth  } = useAuthStore();

  useEffect(() => {
	useCheckAuth();
  }, []);

  if (status === "checking") return <CheckingAuth />;
  return (
    <Routes>
      {/*Login y Register */}
  {(status === 'authenticated')
    ? <Route path="/*" element={<ArqPlataformRouter />} /> 
    : <Route path="/auth/*" element={<AuthLayout />} />
  }
  <Route path="/*" element={<Navigate to='/auth/' />} />

    </Routes>
  );
};
