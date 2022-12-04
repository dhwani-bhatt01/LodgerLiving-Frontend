import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export const AcceptBidNotificationCard = ({ notification }) => {
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
          🎉 {notification?.guest?.name}
        </Text>
        <Text>accepted a bid of</Text>
        <Text fontWeight="600" color="blue.600">
          {notification?.bidAmt}
        </Text>
      </Flex>
    </Flex>
  );
};
