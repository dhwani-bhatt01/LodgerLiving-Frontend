/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../api";
import { HotelCard } from "../../components/hotelCard";

export const HotelStaffDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const toast = useToast();

  const fetchPosts = async () => {
    setIsApiLoading(true);
    try {
      const res = await API.get("/posts/hotel", {
        headers: { authToken: token },
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
    fetchPosts();
  }, []);

  return (
    <>
      {isApiLoading && (
        <Center>
          <Spinner />
        </Center>
      )}
      <Text fontSize="1.5rem" my="1.5rem" fontWeight="600" textAlign="center">
        Grow your Bussiness by bidding now! ⏱️
      </Text>
      <Flex gap="1rem" flexWrap="wrap">
        {posts.length === 0 ? (
          <Text textAlign="center">No Posts yet 😟</Text>
        ) : (
          posts.map((p, i) => <HotelCard post={p} variant="hotel_feed" />)
        )}
      </Flex>
    </>
  );
};
