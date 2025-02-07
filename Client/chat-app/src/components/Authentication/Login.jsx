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
import axios from 'axios'; // Import axios for API calls

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false); // Loading state
  const toast = useToast(); // Toast notification handler

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await axios.post("http://localhost:4001/api/user/login", {
        email,
        password,
      });

      // If login is successful, save user data to localStorage and navigate
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save user data
      toast({
        title: "Login successful",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      // Navigate to chat or dashboard page
      window.location.href = "/chats"; // Redirect to chats or dashboard page

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
      setLoading(false); // Reset loading state
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
            isLoading={loading} // Loading state for the button
          >
            Login
          </Button>

          {/* Optional: Pre-fill credentials for testing */}
          <Button
            variant="solid"
            colorScheme="red"
            width="100%"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("123");
            }}
          >
            Get Guest User credentials
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
