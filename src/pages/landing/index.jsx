import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LandingImg } from "../../assets/landing/landing.svg";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box
      maxWidth="1280px"
      margin="0 auto"
      height="100vh"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text fontSize="2.5rem" fontWeight="700">
          Welcome to Lodger Living
        </Text>
        <Text
          fontSize="1rem"
          textTransform="uppercase"
          fontWeight="600"
          letterSpacing="2px"
        >
          Get your dream space, in Budget!
        </Text>
        <Button
          onClick={() => navigate("/register")}
          variant="solid"
          colorScheme="blue"
          mt="0.5rem"
        >
          Get Started
        </Button>
      </Box>
      <Box width="50%">
        <LandingImg />
      </Box>
    </Box>
  );
};

export default Landing;
