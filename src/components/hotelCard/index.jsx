/* eslint-disable default-case */
import { Badge, Box, Flex, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { camelToNormal } from "../../helpers/camelToNormal";
import { GuestProfileFooter } from "./guestProfileFooter";
import { HotelFeedFooter } from "./hotelFeedFooter";
import { HotelProfileFooter } from "./hotelProfileFooter";

const getFooter = (post, variant) => {
  switch (variant) {
    case "guest_profile":
      return <GuestProfileFooter post={post} />;
    case "hotel_profile":
      return <HotelProfileFooter post={post} />;
    case "hotel_feed":
      return <HotelFeedFooter post={post} />;
  }
};

export const HotelCard = ({ post, variant }) => {
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
        width="100%"
        maxWidth="400px"
      >
        {/* Post Title */}
        <Badge fontSize="1.5rem" colorScheme="blue">
          HOTEL
        </Badge>

        {/* Location & Budget*/}
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

        {/* Guests & Ac Preference */}
        <Flex gap="2rem">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
              Guests
            </Text>
            <Tag variant="subtle" colorScheme="blue" mt="0.35rem">
              {post?.guests}
            </Tag>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
              Ac Preference
            </Text>
            <Tag variant="outline" colorScheme="blue" mt="0.35rem">
              {camelToNormal(post?.acPreference)}
            </Tag>
          </Box>
        </Flex>

        {/* Occupancy */}
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Text fontSize="0.75rem" textTransform="uppercase" fontWeight="700">
            Room Type
          </Text>
          <Tag variant="outline" colorScheme="blue" mt="0.35rem">
            {camelToNormal(post?.occupancy)}
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
