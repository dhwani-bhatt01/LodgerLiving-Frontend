import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../api";
import authImage from "../../assets/common/auth.svg";
import { login } from "../../redux/slices/auth.slice";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [isApiLoading, setIsApiLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
      dispatch(login({ ...res.data }));
    } catch (err) {
      toast({
        title: err?.response?.data?.message ?? "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setEmail("");
      setPassword("");
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
          Login
        </Text>
        <Text textAlign="center">
          Don't have an account?{" "}
          <Link
            style={{ textDecoration: "underline", color: "#2b6cb0" }}
            to="/register"
          >
            Register
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

        <Button
          w="100%"
          mt="20px"
          colorScheme="blue"
          loadingText="Logging in..."
          isLoading={isApiLoading}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
