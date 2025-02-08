import React, { useState } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from "@chakra-ui/react";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:4001/api/user/login", {
        email,
        password,
      });

      // Save JWT to localStorage on successful login
      localStorage.setItem("userInfo", JSON.stringify(data));

      toast({
        title: "Login successful",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      // Redirect to chats page after successful login
      window.location.href = "/chats"; // Navigate to chat page

    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      toast({
        title: "Invalid email or password",
        description: error.response?.data?.message || "Please check your credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="sm"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel fontSize="sm">Password</FormLabel>
            <InputGroup size="sm">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.5rem"
                  size="xs"
                  onClick={() => setShowPassword(!showPassword)}
                  variant="link"
                  colorScheme="blue"
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            width="full"
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
