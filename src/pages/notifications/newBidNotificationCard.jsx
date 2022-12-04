import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../api";

export const NewBidNotificationCard = ({ notification }) => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [btnText, setBtnText] = useState("Accept Bid");
  const token = useSelector((state) => state?.auth?.token);
  const toast = useToast();

  let name = "";
  if (notification?.bidder?.userType === "hotelStaff") {
    name = notification?.bidder?.hotelName;
  } else if (notification?.bidder?.userType === "pgStaff") {
    name = notification?.bidder?.pgName;
  }

  const acceptBid = async () => {
    setIsApiLoading(true);
    try {
      const res = await API.post(
        "/posts/bid-accept",
        {
          bidderId: notification?.bidder?._id,
          postId: notification?.post,
          bidAmt: notification?.bidAmt,
        },
        {
          headers: { authToken: token },
        }
      );
      if (res.status === 200) {
        setBtnText(res.data.message);
      }
    } catch (err) {
      toast({
        title: err?.response?.data?.message ?? "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsApiLoading(false);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      p="1rem"
      boxShadow="base"
      borderRadius="md"
    >
      {/* Message */}
      <Flex gap="0.25rem">
        <Text fontWeight="600" color="blue.600">
          {name}
        </Text>
        <Text>made a bid of</Text>
        <Text fontWeight="600" color="blue.600">
          {notification?.bidAmt}
        </Text>
      </Flex>

      {/* Accept Bid Button */}
      <Button isLoading={isApiLoading} colorScheme="blue" onClick={acceptBid}>
        {btnText}
      </Button>
    </Flex>
  );
};
