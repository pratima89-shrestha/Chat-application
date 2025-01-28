import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Image,
} from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [pic, setPic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, password, confirmpassword, pic });
  };

  // Function to handle file uploads and generate preview
  const postDetails = (file) => {
    if (file) {
      console.log("Uploaded file:", file);
      setPic(URL.createObjectURL(file)); // Generate a preview URL for the uploaded image
    }
  };

  // Function to set a default profile picture URL
  const handleSetProfilePicture = () => {
    const imageURL = "/images/facelessAvatar.avif"
    setPic(imageURL); // Set the profile picture URL directly
    setName("guest");

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
          <FormControl id="name" isRequired>
            <FormLabel fontSize="sm">Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="sm"
            />
          </FormControl>

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

          <FormControl id="confirmpassword" isRequired>
            <FormLabel fontSize="sm">Confirm Password</FormLabel>
            <InputGroup size="sm">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
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

          <FormControl id="profilepicture">
            <FormLabel fontSize="sm">Profile Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
              size="sm"
            />
          </FormControl>

          {/* Profile Picture Preview (New Section) */}
          {pic && (
            <Box>
              <FormLabel fontSize="sm">Preview</FormLabel>
              <Image
                src={pic} // Dynamically set the source of the image
                alt="Profile Preview"
                borderRadius="full"
                boxSize="100px"
                objectFit="cover"
              />
            </Box>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            size="sm"
            width="full"
          >
            Sign Up
          </Button>
            <Button
            width="full"
            colorScheme="red"
            onClick={handleSetProfilePicture} // Set the predefined profile picture
          >
            Set Default Picture
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
