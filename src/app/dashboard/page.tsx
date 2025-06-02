'use client';

import { Box, Flex, Grid, GridItem, Heading, Text, Icon, SimpleGrid, Card, CardHeader, CardBody, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue, VStack, HStack, Button } from '@chakra-ui/react';
import { FiUsers, FiTrendingUp, FiActivity, FiDollarSign, FiPlusCircle, FiList, FiBarChart2 } from 'react-icons/fi'; // Using react-icons as placeholder

// Placeholder data for dashboard cards - replace with actual data fetching
const summaryStats = [
  { id: 1, label: 'Active Leads', value: '78', change: '12%', changeType: 'increase', icon: FiTrendingUp, color: 'green.500' },
  { id: 2, label: 'New Contacts This Month', value: '120', change: '5%', changeType: 'increase', icon: FiUsers, color: 'blue.500' },
  { id: 3, label: 'Deals Closed (QTD)', value: '25', change: '2.5M INR', changeType: 'increase', icon: FiDollarSign, color: 'purple.500' },
  { id: 4, label: 'Upcoming Activities', value: '15', change: 'Today', changeType: 'info', icon: FiActivity, color: 'orange.500' },
];

const recentActivities = [
  { id: 1, description: 'Called John Doe regarding Project Alpha', time: '2 hours ago', type: 'Call' },
  { id: 2, description: 'Meeting with ACME Corp scheduled for tomorrow', time: '1 day ago', type: 'Meeting' },
  { id: 3, description: 'Email sent to Jane Smith following up on proposal', time: '3 days ago', type: 'Email' },
];

export default function DashboardPage() {
  const primaryColor = "#0056B3";
  const accentColor = "#28A745";
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.700', 'white');

  return (
    // This Box would be the main content area within AppLayout in the future
    <Box p={{ base: 4, md: 8 }} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Flex direction="column" gap={8}>
        {/* Header Section */}
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h1" size="xl" color={headingColor} fontFamily="Poppins, sans-serif">
            CRM Dashboard
          </Heading>
          <Button 
            leftIcon={<Icon as={FiPlusCircle} />} 
            bg={accentColor} 
            color={'white'} 
            _hover={{ bg: '#218838' }}
            fontFamily="Inter, sans-serif"
            boxShadow="md"
            size="lg"
          >
            Quick Add
          </Button>
        </Flex>

        {/* Summary Statistics Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {summaryStats.map((stat) => (
            <Card key={stat.id} bg={cardBg} shadow="lg" borderRadius="xl" transition="all 0.3s ease-in-out" _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}>
              <CardHeader pb={2}>
                <HStack justifyContent="space-between">
                  <Text fontSize="md" fontWeight="medium" color={textColor} fontFamily="Inter, sans-serif">{stat.label}</Text>
                  <Icon as={stat.icon} w={8} h={8} color={stat.color} />
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <Stat>
                  <StatNumber fontSize="3xl" fontWeight="bold" color={headingColor} fontFamily="Poppins, sans-serif">{stat.value}</StatNumber>
                  <StatHelpText fontFamily="Inter, sans-serif">
                    {stat.changeType !== 'info' && <StatArrow type={stat.changeType === 'increase' ? 'increase' : 'decrease'} />}
                    {stat.change}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Main Dashboard Grid for Charts and Lists */}
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
          {/* Placeholder for Main Chart (e.g., Sales Pipeline) */}
          <GridItem>
            <Card bg={cardBg} shadow="lg" borderRadius="xl" h={{ base: '300px', md: '400px' }}>
              <CardHeader>
                <Heading size="md" color={headingColor} fontFamily="Poppins, sans-serif">Sales Performance</Heading>
              </CardHeader>
              <CardBody>
                <Flex justifyContent="center" alignItems="center" h="full" flexDirection="column" color={textColor}>
                  <Icon as={FiBarChart2} w={16} h={16} mb={4} />
                  <Text fontSize="lg" fontFamily="Inter, sans-serif">Sales Performance Chart Placeholder</Text>
                  <Text fontSize="sm" fontFamily="Inter, sans-serif">Detailed chart will be displayed here.</Text>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>

          {/* Recent Activities List */}
          <GridItem>
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardHeader>
                <Heading size="md" color={headingColor} fontFamily="Poppins, sans-serif">Recent Activities</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {recentActivities.map((activity) => (
                    <Box key={activity.id} p={3} borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} borderRadius="md" _hover={{ borderColor: primaryColor, bg: useColorModeValue('gray.100', 'gray.700')}}>
                      <Text fontWeight="medium" color={headingColor} fontFamily="Inter, sans-serif">{activity.type}: {activity.description}</Text>
                      <Text fontSize="sm" color={textColor} fontFamily="Inter, sans-serif">{activity.time}</Text>
                    </Box>
                  ))}
                  {recentActivities.length === 0 && (
                    <Text color={textColor} fontFamily="Inter, sans-serif">No recent activities.</Text>
                  )}
                  <Button 
                    variant="outline" 
                    colorScheme={primaryColor.split('.')[0]} // Assuming primaryColor is like 'blue.500'
                    borderColor={primaryColor}
                    color={primaryColor}
                    _hover={{ bg: useColorModeValue(`${primaryColor.split('.')[0]}.50`, `${primaryColor.split('.')[0]}.700`) }}
                    leftIcon={<Icon as={FiList}/>}
                    mt={2}
                    fontFamily="Inter, sans-serif"
                  >
                    View All Activities
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}
