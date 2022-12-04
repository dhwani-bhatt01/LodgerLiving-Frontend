/* eslint-disable react-hooks/exhaustive-deps */
import { Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../api";
import { Layout } from "../layout";
import { AcceptBidNotificationCard } from "./acceptBidNotificationCard";
import { NewBidNotificationCard } from "./newBidNotificationCard";

export const Notifications = () => {
  const token = useSelector((state) => state?.auth?.token);
  const [notifications, setNotifications] = useState([]);

  const toast = useToast();

  const loadNotifications = async () => {
    try {
      const res = await API.get("/notifications", {
        headers: { authToken: token },
      });
      console.log(res?.data?.notifications);
      setNotifications(res?.data?.notifications);
    } catch (err) {
      toast({
        title: err?.response?.data?.message ?? "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <Layout>
      {notifications.length === 0 ? (
        <Text textAlign="center">No Notifications yet ☹️</Text>
      ) : (
        notifications?.map((n, i) => {
          if (n.type === "acceptBid") {
            return <AcceptBidNotificationCard notification={n} key={i} />;
          } else {
            return <NewBidNotificationCard notification={n} key={i} />;
          }
        })
      )}
    </Layout>
  );
};
