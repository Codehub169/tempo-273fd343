'use client';

import { Box, Flex, Grid, GridItem, Heading, Text, Icon, SimpleGrid, Card, CardHeader, CardBody, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue, VStack, HStack } from '@chakra-ui/react';
import { FiUsers, FiTrendingUp, FiActivity, FiDollarSign, FiPlusCircle, FiList, FiBarChart2 } from 'react-icons/fi';
import AppLayout from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/Button';

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
  const primaryColor = "#0056B3"; // Defined in theme or constants later
  // const accentColor = "#28A745"; // Defined in theme or constants later
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.700', 'white');

  const breadcrumbs = [
    { label: 'Dashboard' }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Flex direction="column" gap={8}>
        {/* Header Section */}
        <Flex justifyContent="space-between" alignItems="center" mb={4} wrap="wrap" gap={2}>
          <Heading as="h1" size="xl" color={headingColor} fontFamily="var(--font-poppins)">
            CRM Dashboard
          </Heading>
          <Button 
            leftIcon={<Icon as={FiPlusCircle} />}
            variant="accent"
            fontFamily="var(--font-inter)"
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
                  <Text fontSize="md" fontWeight="medium" color={textColor} fontFamily="var(--font-inter)">{stat.label}</Text>
                  <Icon as={stat.icon} w={8} h={8} color={stat.color} />
                </HStack>
              </CardHeader>
              <CardBody pt={0}>
                <Stat>
                  <StatNumber fontSize="3xl" fontWeight="bold" color={headingColor} fontFamily="var(--font-poppins)">{stat.value}</StatNumber>
                  <StatHelpText fontFamily="var(--font-inter)">
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
                <Heading size="md" color={headingColor} fontFamily="var(--font-poppins)">Sales Performance</Heading>
              </CardHeader>
              <CardBody>
                <Flex justifyContent="center" alignItems="center" h="full" flexDirection="column" color={textColor}>
                  <Icon as={FiBarChart2} w={16} h={16} mb={4} />
                  <Text fontSize="lg" fontFamily="var(--font-inter)">Sales Performance Chart Placeholder</Text>
                  <Text fontSize="sm" fontFamily="var(--font-inter)">Detailed chart will be displayed here.</Text>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>

          {/* Recent Activities List */}
          <GridItem>
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardHeader>
                <Heading size="md" color={headingColor} fontFamily="var(--font-poppins)">Recent Activities</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {recentActivities.map((activity) => (
                    <Box key={activity.id} p={3} borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} borderRadius="md" _hover={{ borderColor: primaryColor, bg: useColorModeValue('gray.50', 'gray.700')}}>
                      <Text fontWeight="medium" color={headingColor} fontFamily="var(--font-inter)">{activity.type}: {activity.description}</Text>
                      <Text fontSize="sm" color={textColor} fontFamily="var(--font-inter)">{activity.time}</Text>
                    </Box>
                  ))}
                  {recentActivities.length === 0 && (
                    <Text color={textColor} fontFamily="var(--font-inter)">No recent activities.</Text>
                  )}
                  <Button 
                    variant="outline" 
                    leftIcon={<Icon as={FiList}/>}
                    mt={2}
                    fontFamily="var(--font-inter)"
                    // The custom Button's 'outline' variant should use primaryColor by default from theme.
                    // Specific hover can be defined in theme or overridden here if necessary.
                    // _hover={{ bg: useColorModeValue('blue.50', 'blue.900') }} // Example if specific hover needed
                  >
                    View All Activities
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Flex>
    </AppLayout>
  );
}
