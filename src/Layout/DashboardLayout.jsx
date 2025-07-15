import { Outlet } from "react-router";
import DashboardHeader from "../Component/DashboardHeader";

export default function Layout() {
  return (
    <div className="dashboard-wrapper">
      <DashboardHeader />
      <div className="dashboard-main-content">
        <Outlet />
      </div>
    </div>
  );
}
