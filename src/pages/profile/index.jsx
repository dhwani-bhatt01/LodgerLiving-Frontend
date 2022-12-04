/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../api";
import { HotelCard } from "../../components/hotelCard";
import { PgCard } from "../../components/pgCard";
import { Layout } from "../layout";

export const Profile = () => {
  const user = useSelector((state) => state?.auth?.user);
  const token = useSelector((state) => state?.auth?.token);
  const [isApiLoading, setIsApiLoading] = useState();
  const [posts, setPosts] = useState([]);

  const toast = useToast();

  const loadPosts = async () => {
    setIsApiLoading(true);
    try {
      const res = await API.get("/profile", {
        headers: {
          authToken: token,
        },
      });
      setPosts(res?.data?.posts);
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

  useEffect(() => {
    loadPosts();
  }, []);

  let cardVariant = "guest_profile";
  if (user?.userType === "pgStaff") cardVariant = "pg_profile";
  else if (user?.userType === "hotelStaff") cardVariant = "hotel_profile";

  return (
    <Layout>
      <Box display="flex" mt="1rem" gap="3rem" alignItems="flex-start">
        {/* Profile Card */}
        <Box
          boxShadow="md"
          p="1.5rem"
          rounded="md"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          fontSize="1rem"
          fontWeight={600}
        >
          <Avatar
            size="lg"
            cursor="pointer"
            alignSelf="center"
            name={user?.name ?? "John Abramov"}
          />
          <Flex flexDirection="column">
            <Text fontSize="12px" fontWeight="400">
              Name:
            </Text>
            <Text>{user?.name}</Text>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize="12px" fontWeight="400">
              Email:
            </Text>
            <Text>{user?.email}</Text>
          </Flex>
          {user?.userType === "hotelStaff" && (
            <Flex flexDirection="column">
              <Text fontSize="12px" fontWeight="400">
                Hotel Name:
              </Text>
              <Text>{user?.hotelName}</Text>
            </Flex>
          )}
          {user?.userType === "pgStaff" && (
            <Flex flexDirection="column">
              <Text fontSize="12px" fontWeight="400">
                Pg Name:
              </Text>
              <Text>{user?.pgName}</Text>
            </Flex>
          )}
        </Box>
        {/* Map posts here */}
        <Center width="100%" display="flex" gap="1rem" flexWrap="wrap">
          {isApiLoading ? (
            <Spinner />
          ) : posts.length === 0 ? (
            <Text>No Posts Yet ☹️</Text>
          ) : (
            posts.map((p, i) =>
              p.postType === "pg" ? (
                <PgCard post={p} variant={cardVariant} />
              ) : (
                <HotelCard post={p} variant={cardVariant} />
              )
            )
          )}
        </Center>
      </Box>
    </Layout>
  );
};
