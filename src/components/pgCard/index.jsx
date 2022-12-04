/* eslint-disable default-case */
import { Badge, Box, Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { camelToNormal } from "../../helpers/camelToNormal";
import { GuestProfileFooter } from "./guestProfileFooter";
import { PgFeedFooter } from "./pgFeedFooter";
import { PgProfileFooter } from "./pgProfileFooter";

const getFooter = (post, variant) => {
  switch (variant) {
    case "guest_profile":
      return <GuestProfileFooter post={post} />;
    case "pg_profile":
      return <PgProfileFooter post={post} />;
    case "pg_feed":
      return <PgFeedFooter post={post} />;
  }
};

export const PgCard = ({ post, variant }) => {
  return (
    <>
      <Box
        boxShadow="base"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="1rem"
        padding="1rem"
        rounded="md"
        width="40%"
      >
        {/* Post Title */}
        <Badge fontSize="1.5rem" colorScheme="green">
          PG
        </Badge>

        {/* Location & Budget */}
        <Flex width="100%" alignItems="flex-start" gap="5rem">
          <Box>
            <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
              Address
            </Text>
            <Text>{post?.location ?? ""}</Text>
          </Box>
          <Box>
            <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
              Budget
            </Text>
            <Text>
              <span style={{ fontWeight: 600, fontSize: "1.5rem" }}>
                {post?.budget?.[0]}
              </span>{" "}
              <i
                style={{
                  color: "blue",
                  margin: "0 0.5rem",
                }}
                className="ri-arrow-right-line"
              ></i>
              <span style={{ fontWeight: 600, fontSize: "1.5rem" }}>
                {post?.budget?.[1]}
              </span>
            </Text>
          </Box>
        </Flex>

        {/* Room Type & Gender */}
        <Flex gap="2rem">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
              Room Type
            </Text>
            <Tag variant="outline" colorScheme="blue" mt="0.35rem">
              {camelToNormal(post?.roomType)}
            </Tag>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
              PG for
            </Text>
            <Tag variant="outline" colorScheme="blue" mt="0.35rem">
              {camelToNormal(
                post?.gender === "both" ? "girlsAndBoys" : post?.gender
              )}
            </Tag>
          </Box>
        </Flex>

        {/* Furnish Status */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
            Furnish Status
          </Text>
          <Tag variant="outline" colorScheme="blue" mt="0.35rem">
            {camelToNormal(post?.furnishStatus)}
          </Tag>
        </Box>

        {/* Amenities */}
        <Box>
          <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
            Amenities
          </Text>
          <Flex gap="0.75rem" mt="0.35rem">
            {post?.amenities?.map((a, i) => (
              <Tag variant="outline" colorScheme="blue">
                {camelToNormal(a)}
              </Tag>
            ))}
          </Flex>
        </Box>

        {/* Dynamic Footer */}
        {getFooter(post, variant)}
      </Box>
    </>
  );
};
