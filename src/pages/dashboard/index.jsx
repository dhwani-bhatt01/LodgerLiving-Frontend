import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "../layout";
import { GuestDashboard } from "./guestDashboard";
import { HotelStaffDashboard } from "./hotelStaffDashboard";
import { PgStaffDashboard } from "./pgStaffDashboard";

export const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  if (user.userType === "guest") {
    return (
      <Layout>
        <GuestDashboard />
      </Layout>
    );
  }
  if (user.userType === "hotelStaff") {
    return (
      <Layout>
        <HotelStaffDashboard />
      </Layout>
    );
  }
  if (user.userType === "pgStaff") {
    return (
      <Layout>
        <PgStaffDashboard />
      </Layout>
    );
  }
  return <>Something went wrong 😟</>;
};
