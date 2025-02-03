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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [pic, setPic] = useState("");
  const [loading,setLoading]= useState("");
  const toast = useToast();


  const handleSubmit = async(e)=>{
  // setLoading(true);

  e.preventDefault();
  console.log("Form submitted:", { name, email, password, confirmpassword, pic });

  if(!name||!email||!password||!confirmpassword){
   toast({
  title:"Please fill in all the fields!",
  status:"warning",
  duration:1000,
  isClosable:true,
  position:"top",
  });
  return;
  }
  if(password!==confirmpassword){
  toast({
  title:"Incorrect Password!",
  status:"warning",
  duration:1000,
  isClosable:true,
  position:"bottom",
  });
  return;
  }
  } 

  // Function to handle file uploads and generate preview
  const postDetails = (pic) => {
  setLoading(true);

  if(pic===undefined){
  toast({
  title:"Please Select an Image!",
  status:"warning",
  duration:5000,
  isClosable:true,
  position:"bottom",
  });
  return;
  }

  // Log the file details to the console
  console.log("Selected File:", pic);
  console.log("File Type:", pic.type); // Log the file type


  if (pic.type==="image/jpeg"||pic.type ==="image/png"){
  const data = new FormData();
  data.append("file",pic);
  data.append("upload_preset","chat-app");
  data.append("cloud_name","dqsbhhsfz")
   fetch("https://api.cloudinary.com/v1_1/dqsbhhsfz/image/upload",{
   method:"post",
   body:data,
   })

   .then((res)=>res.json())
   .then((data)=>{
   setPic(data.url.toString());
   setLoading(false);
   })
   .catch((err)=>{
   console.log(err);
   setLoading(false);
   })
  }
  else{
  toast({
  title:"Please Select an Image!",
  status:"warning",
  duration:5000,
  isClosable:true,
  position:"bottom",
  });
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

          <FormControl id="email">
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
              onChange={(e) => postDetails(e.target.files[0])}   //triggers the element to get the first value
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
            isLoading={loading}
          >
            Set Default Picture
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;
