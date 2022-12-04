import { Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";

export const HotelProfileFooter = ({ post }) => {
  return (
    <Flex alignItems="center" gap="0.5rem">
      <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
        Bid Status
      </Text>
      {post?.bidStatus === "accepted" ? (
        <Tag colorScheme="green">Accepted</Tag>
      ) : (
        <Tag colorScheme="red">Pending</Tag>
      )}
    </Flex>
  );
};
