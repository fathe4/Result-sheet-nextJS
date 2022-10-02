import React, { ReactNode } from "react";
import Dashboard from "../../pages/dashboard";
import DashboardAnalytics from "../DashboardAnalytics";

const Layout = ({
  children,
  currentPath,
}: {
  children: ReactNode;
  currentPath: string;
}) => {
  const dashboardNestedPath = [
    "/dashboard/DashboardResultTable",
    "/dashboard/CreateTable",
    "/dashboard/ManageResults",
  ];
  const dashboardPath = ["/dashboard/"];
  return (
    <div>
      {dashboardPath.includes(currentPath) && (
        <Dashboard>
          <DashboardAnalytics />
        </Dashboard>
      )}
      {dashboardNestedPath.includes(currentPath) && (
        <Dashboard>{children}</Dashboard>
      )}
      {!dashboardNestedPath.includes(currentPath) && <main>{children}</main>}
    </div>
  );
};

export default Layout;
