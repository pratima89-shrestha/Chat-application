import React from 'react'
import {Container, Box, Text} from '@chakra-ui/react';

export const HomePage = () => {
  return (
   <Container maxW='xl' centerContent>
    <Box
    d='flex'
    justifyContent='center'
    padding={3}
    bg={"white"}
    width="100%"
    margin="40px 0 15px 0"   //TRBM
    borderRadius='lg'
    borderWidth='3px'
    align='center'
    >
      <Text fontSize="4xl" fontFamily="Work sans" color="black" />
      <Text>GUFF GHAR</Text>
    </Box>
    <Box></Box>
   </Container>
  )
}

export default HomePage;