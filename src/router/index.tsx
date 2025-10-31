import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import LoadingScreen from "@/components/atoms/LoadingScreen";

const Users = React.lazy(async () => await import("@/pages/User"));

const RoutePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Suspense fallback={<LoadingScreen />}>
              <Layout />
            </Suspense>
          }
        >
          <Route index path={""} element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePage;
