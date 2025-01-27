import React from 'react';
import { Container, Box, Text, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';

export const HomePage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent='center'
        padding={3}
        bg={"Gray"}
        width="100%"
        margin="40px 0 15px 0"  // TRBM
        borderRadius='lg'
        borderWidth='3px'
        align='center'
      >
        <Text fontSize="3xl" fontFamily="poppins" color="white">
          Guff Ghar
        </Text>
      </Box>
      <Box bg="white" w="80%" p={2} borderRadius="lg" borderWidth="1px"></Box>
      
      {/* Enclosed Tabs in Box */}
      <Box w="80%" p={4} borderRadius="lg" borderWidth="1px" mt={4} bg="gray.100">
        <Tabs variant="enclosed" defaultIndex={0}>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Content for Tab 1</Text>
            </TabPanel>
            <TabPanel>
              <Text>Content for Tab 2</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;
