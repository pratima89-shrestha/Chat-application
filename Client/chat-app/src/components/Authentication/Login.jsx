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
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
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

          <Button type="submit" colorScheme="blue" size="sm" width="full">
            Login
          </Button>
          <Button varient="solid" colorScheme="red" width="100%" onClick={()=>{
            setEmail("guest@example.com")
            setPassword("123")
          }}>Get Guest User credentials</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
