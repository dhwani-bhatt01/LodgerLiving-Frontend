import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api/index";
import authImage from "../../assets/common/auth.svg";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [pgName, setPgName] = useState("");

  const [isApiLoading, setIsApiLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);
    setSelectedValue(e.target.value);

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        userType: selectedValue,
        hotelName,
        pgName,
      });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (err) {
      toast({
        title: err?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setEmail("");
      setHotelName("");
      setName("");
      setPassword("");
      setPgName("");
      setSelectedValue("");
      setIsApiLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      gap="1.5rem"
      justifyContent="space-between"
      alignItems="center"
      height="100vh"
      maxWidth="1280px"
      margin="0 auto"
      padding="0 1rem"
    >
      <img src={authImage} alt="Auth banner" style={{ width: "50%" }} />
      <Box width="100%" maxWidth="500px">
        <Text
          fontSize="2rem"
          fontWeight="700"
          textAlign="center"
          marginBottom="0.5rem"
        >
          Register Now
        </Text>
        <Text textAlign="center">
          Create a free account to bid or rent a place. Have an account?{" "}
          <Link
            style={{ textDecoration: "underline", color: "#2b6cb0" }}
            to="/login"
          >
            Login
          </Link>
        </Text>
        <Link
          style={{
            display: "flex",
            gap: "0.5rem",
            margin: "0 auto",
            color: "#2b6cb0",
            textAlign: "center",
          }}
          to="/"
        >
          <i className="ri-arrow-left-line"></i>
          <span>Go Back</span>
        </Link>

        {/* Name */}
        <FormControl mt="10px">
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        {/* Email */}
        <FormControl mt="10px">
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        {/* Password */}
        <FormControl mt="10px">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* User Type Check */}
        <FormControl mt="10px">
          <FormLabel>User Type</FormLabel>
          <RadioGroup onChange={setSelectedValue} value={selectedValue}>
            <HStack spacing="24px">
              <Radio value="hotelStaff">Hotel Staff</Radio>
              <Radio value="pgStaff">PG Staff</Radio>
              <Radio value="guest">Guest</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        {selectedValue === "hotelStaff" ? (
          <FormControl mt="10px">
            <FormLabel>Hotel Name</FormLabel>
            <Input
              placeholder="Enter your Hotel Name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
            ></Input>
          </FormControl>
        ) : selectedValue === "pgStaff" ? (
          <FormControl mt="10px">
            <FormLabel>PG Name</FormLabel>
            <Input
              placeholder="Enter your PG Name"
              value={pgName}
              onChange={(e) => setPgName(e.target.value)}
            ></Input>
          </FormControl>
        ) : null}
        <Button
          mt="20px"
          w="100%"
          colorScheme="blue"
          loadingText="Registering..."
          isLoading={isApiLoading}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
