import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/auth.slice";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Box
        backgroundColor="white"
        display="flex"
        position="fixed"
        width="100%"
        alignItems="center"
        boxShadow="base"
        height="64px"
      >
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="1rem"
          maxW="1280px"
          mx="auto"
        >
          {/* Logo */}
          <Flex color="#2b6cb0">
            <Text fontWeight="800">Lodger</Text>
            <Text fontWeight="400">Living</Text>
          </Flex>

          {/* Nav items */}
          <Box display="flex" alignItems="center" gap="1rem">
            <Link to="/dashboard">Home</Link>
            <Link to="/notification">Notifications</Link>
            <Link to="/profile">My Profile</Link>
            <Text
              cursor="pointer"
              color="red.500"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Text>
          </Box>
        </Box>
      </Box>
      <Box px="1rem" maxWidth="1280px" mx="auto" pt="70px">
        {children}
      </Box>
    </>
  );
};
