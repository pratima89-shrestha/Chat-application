import React from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

export const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent='center'
        padding={3}
        bg={"#f0f4f8"}
        width="100%"
        margin="40px 0 15px 0"  // TRBM
        borderRadius='lg'
        borderWidth='3px'
        align='center'
      >
        <Text fontSize="1.875rem" fontFamily="Source sans Pro" color="blue" fontWeight="bold">
          Guff Ghar
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px"></Box>

      {/* Enclosed Tabs in Box */}
      <Box w="100%" p={4} borderRadius="lg" borderWidth="1px" mt={4} bg="gray.100">
        <Tabs variant="soft-rounded" defaultIndex={0}>
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <login /> 
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
