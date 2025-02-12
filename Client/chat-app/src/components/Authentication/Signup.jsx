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
  useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevent form submission reload

    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill in all the fields!",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Incorrect Password!",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      // POST request to register user
      const { data } = await axios.post(
        "http://localhost:4001/api/user",  // Endpoint for user registration
        { name, email, password, pic },
        config
      );
      
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });

      // Store user data in localStorage (including JWT token)
      localStorage.setItem("userInfo", JSON.stringify(data)); 
      
      setLoading(false);
      
      // Redirect to /chats after successful registration
      navigate('/chats');
    } catch (error) {
      console.log("Sign up error!", error.response?.data || error.message);
      
      toast({
        title: "Error occurred!",
        description: error.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const postDetails = (pic) => {
    setLoading(true);

    if (pic === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dqsbhhsfz");

      fetch("https://api.cloudinary.com/v1_1/dqsbhhsfz/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleSetProfilePicture = () => {
    const imageURL = "/images/facelessAvatar.avif";
    setPic(imageURL); // Set the profile picture URL directly
    setName("guest");
  };

  return (
    <Box maxW="sm" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="md" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel fontSize="sm">Name</FormLabel>
            <Input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} size="sm" />
          </FormControl>

          <FormControl id="email">
            <FormLabel fontSize="sm">Email</FormLabel>
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} size="sm" />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel fontSize="sm">Password</FormLabel>
            <InputGroup size="sm">
              <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                <Button h="1.5rem" size="xs" onClick={() => setShowPassword(!showPassword)} variant="link" colorScheme="blue">
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="confirmpassword" isRequired>
            <FormLabel fontSize="sm">Confirm Password</FormLabel>
            <InputGroup size="sm">
              <Input type={showPassword ? "text" : "password"} placeholder="Confirm your password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
              <InputRightElement width="4.5rem">
                <Button h="1.5rem" size="xs" onClick={() => setShowPassword(!showPassword)} variant="link" colorScheme="blue">
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="profilepicture">
            <FormLabel fontSize="sm">Profile Picture</FormLabel>
            <Input type="file" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} size="sm" />
          </FormControl>

          {pic && (
            <Box>
              <FormLabel fontSize="sm">Preview</FormLabel>
              <Image src={pic} alt="Profile Preview" borderRadius="full" boxSize="100px" objectFit="cover" />
            </Box>
          )}

          <Button type="submit" colorScheme="blue" size="sm" width="full">Sign Up</Button>
          <Button width="full" colorScheme="red" onClick={handleSetProfilePicture} isLoading={loading}>Set Default Picture</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
