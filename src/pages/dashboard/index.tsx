import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import DashboardAnalytics from "../../Component/DashboardAnalytics";
import DashboardLayout from "../../Component/Layout/DashboardLayout";

const Dashboard = ({ children }: { children?: ReactNode }) => {
  return <DashboardAnalytics />;
};
Dashboard.Layout = DashboardLayout;
export default Dashboard;
