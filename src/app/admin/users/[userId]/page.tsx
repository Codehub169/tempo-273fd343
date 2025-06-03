'use client';

import React from 'react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button,
  Avatar,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tag,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  Flex,
  Spacer,
  Badge,
  IconButton,
  useToast
} from '@chakra-ui/react';
import {
  User,
  Edit2,
  Trash2,
  ArrowLeft,
  Mail,
  Shield,
  Briefcase,
  Calendar,
  Clock,
  Activity,
  LogIn,
  Key,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  TrendingUp,
  FileText,
  ChevronRight,
} from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';
import { IconType } from 'react-icons'; // Retained for InfoItem if it's meant to be generic, though current usage is lucide

// Mock User Data (expanded for detail view)
const mockUsersData: { [key: string]: any } = {
  'usr_001': {
    id: 'usr_001',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@example.com',
    role: 'Administrator',
    status: 'Active',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedDate: '2023-01-15T09:00:00Z',
    lastLogin: '2024-03-10T10:00:00Z',
    bio: 'Seasoned IT professional with over 10 years of experience in system administration and network security. Passionate about optimizing CRM functionalities.',
    permissions: ['Manage Users', 'Configure Settings', 'View All Data', 'Export Reports'],
    recentActivity: [
      { id: 'act_001', type: 'login', description: 'Logged in successfully', timestamp: '2024-03-10T10:00:00Z' },
      { id: 'act_002', type: 'update', description: 'Updated global email templates', timestamp: '2024-03-09T14:30:00Z' },
      { id: 'act_003', type: 'create', description: 'Added new custom field for Leads', timestamp: '2024-03-08T11:15:00Z' },
    ],
  },
  'usr_002': {
    id: 'usr_002',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@example.com',
    role: 'Sales Manager',
    status: 'Active',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    joinedDate: '2023-03-01T10:00:00Z',
    lastLogin: '2024-03-10T09:30:00Z',
    bio: 'Dynamic Sales Manager with a proven track record of exceeding targets. Focused on team motivation and strategic account growth.',
    permissions: ['Manage Sales Team', 'View Sales Reports', 'Assign Leads'],
    recentActivity: [
      { id: 'act_004', type: 'login', description: 'Logged in successfully', timestamp: '2024-03-10T09:30:00Z' },
      { id: 'act_005', type: 'assign', description: 'Assigned 5 new leads to Rohan Das', timestamp: '2024-03-09T17:00:00Z' },
    ],
  },
  // Add more users if needed
};

const UserDetailPage = () => {
  const params = useParams();
  const userId = params.userId as string;
  const user = mockUsersData[userId]; // In a real app, fetch this data
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const primaryColor = "#0056B3";
  const accentColor = "#28A745";
  
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const subtleTextColor = useColorModeValue('gray.700', 'gray.300');

  if (!user) {
    return (
      <AppLayout pageTitle="User Not Found">
        <Flex direction="column" align="center" justify="center" minH="60vh">
            <Icon as={User} boxSize={24} color="gray.400" mb={6} />
            <Heading fontFamily="var(--font-poppins)" mb={4} color={headingColor}>User Not Found</Heading>
            <Text color={textColor} fontFamily="var(--font-inter)" mb={6}>The user you are looking for does not exist or may have been removed.</Text>
            <NextLink href="/admin/users" passHref>
            <Button as="a" leftIcon={<Icon as={ArrowLeft} />} colorScheme="blue" variant="solid" bg={primaryColor} _hover={{bg: '#004494'}}>
                Back to Users List
            </Button>
            </NextLink>
        </Flex>
      </AppLayout>
    );
  }

  const breadcrumbs = [
    { label: 'Admin', href: '/admin/users' },
    { label: 'Users', href: '/admin/users' },
    { label: `${user.firstName} ${user.lastName}` },
  ];

  const handleToggleStatus = () => {
    // Mock status toggle
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    mockUsersData[userId].status = newStatus; // This won't persist across reloads, just for demo
    toast({
        title: `User ${newStatus === 'Active' ? 'Activated' : 'Deactivated'}`,
        description: `${user.firstName} ${user.lastName}'s status has been changed to ${newStatus}.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
    });
    // Force re-render if state was local, or refetch data in real app. For this demo, toast might trigger re-render.
  };

  const handleDeleteUser = () => {
    toast({
        title: 'User Deletion (Simulated)',
        description: `User ${user.firstName} ${user.lastName} would be deleted. This is a placeholder.`,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
    });
  }

  const InfoItem = ({ icon, label, value }: { icon: IconType; label: string; value: React.ReactNode }) => (
    <HStack spacing={3} align="start">
      <Icon as={icon} mt={1} color="gray.500" />
      <Box>
        <Text fontSize="sm" color={textColor} fontFamily="var(--font-inter)">{label}</Text>
        {typeof value === 'string' ? (
          <Text fontWeight="medium" color={headingColor} fontFamily="var(--font-inter)">{value}</Text>
        ) : value}
      </Box>
    </HStack>
  );
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return LogIn;
      case 'update': return Edit2;
      case 'create': return FileText;
      case 'assign': return TrendingUp;
      default: return Activity;
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      {/* Header Section */}
      <Flex mb={6} direction={{base: 'column', md: 'row'}} gap={4} align={{base: 'start', md: 'center'}}>
        <HStack spacing={4}>
            <Avatar size="lg" name={`${user.firstName} ${user.lastName}`} src={user.avatarUrl} boxShadow="md" borderColor={primaryColor} borderWidth={2} />
            <VStack align="start" spacing={0}>
                <Heading as="h1" size="xl" fontFamily="var(--font-poppins)" color={headingColor}>
                {user.firstName} {user.lastName}
                </Heading>
                <Text fontSize="md" color={textColor} fontFamily="var(--font-inter)">
                User ID: {user.id}
                </Text>
            </VStack>
        </HStack>
        <Spacer />
        <HStack spacing={3} mt={{base: 4, md: 0}}>
          <NextLink href={`/admin/users/${userId}/edit`} passHref> {/* Placeholder edit link */}
            <Button as="a" leftIcon={<Icon as={Edit2} />} variant="outline" borderColor={borderColor} color={headingColor} _hover={{bg: useColorModeValue('gray.100', 'gray.600')}} fontFamily="var(--font-inter)">
              Edit User
            </Button>
          </NextLink>
          <Button 
            leftIcon={<Icon as={user.status === 'Active' ? ToggleLeft : ToggleRight} />}
            onClick={handleToggleStatus}
            colorScheme={user.status === 'Active' ? 'yellow' : 'green'}
            fontFamily="var(--font-inter)"
          >
            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
          <IconButton 
            aria-label='Delete User'
            icon={<Icon as={Trash2} />}
            colorScheme='red' 
            variant='solid'
            onClick={handleDeleteUser}
          />
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
        {/* Left Column: User Details Card */}
        <VStack spacing={6} align="stretch" gridColumn={{ base: 'auto', lg: 'span 2' }}>
          <Card bg={cardBg} shadow="xl" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <CardHeader pb={2}>
              <HStack>
                 <Icon as={User} w={6} h={6} color={primaryColor} />
                 <Heading size="md" fontFamily="var(--font-poppins)" color={headingColor}>User Profile</Heading>
              </HStack>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <InfoItem icon={Mail} label="Email Address" value={user.email} />
                <InfoItem icon={Shield} label="Role" value={<Tag size="md" variant="subtle" colorScheme={user.role === 'Administrator' ? 'purple' : 'blue'} borderRadius="full">{user.role}</Tag>} />
                <InfoItem icon={Calendar} label="Joined Date" value={new Date(user.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })} />
                <InfoItem icon={Clock} label="Last Login" value={new Date(user.lastLogin).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} />
                <InfoItem icon={Briefcase} label="Status" value={<Badge colorScheme={user.status === 'Active' ? 'green' : 'red'} variant="solid" borderRadius="full" px={2} py={1}>{user.status}</Badge>} />
              </SimpleGrid>
              {user.bio && (
                <>
                  <Divider my={6} borderColor={borderColor} />
                  <InfoItem icon={MessageSquare} label="Biography" value={<Text whiteSpace="pre-wrap" fontSize="sm" color={subtleTextColor} fontFamily="var(--font-inter)">{user.bio}</Text>} />
                </>
              )}
            </CardBody>
          </Card>
        </VStack>

        {/* Right Column: Quick Info / Permissions */}
        <VStack spacing={6} align="stretch">
            <Card bg={cardBg} shadow="xl" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                <CardHeader pb={2}>
                    <HStack>
                        <Icon as={Key} w={6} h={6} color={accentColor} />
                        <Heading size="md" fontFamily="var(--font-poppins)" color={headingColor}>Permissions</Heading>
                    </HStack>
                </CardHeader>
                <CardBody>
                    <List spacing={2}>
                        {user.permissions.map((permission: string, index: number) => (
                        <ListItem key={index} fontSize="sm" fontFamily="var(--font-inter)" color={subtleTextColor}>
                            <ListIcon as={ChevronRight} color={accentColor} />
                            {permission}
                        </ListItem>
                        ))}
                    </List>
                </CardBody>
            </Card>
        </VStack>
      </SimpleGrid>

      {/* Tabs for Activity, etc. */}
      <Card mt={6} bg={cardBg} shadow="xl" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <Tabs variant="enclosed-colored" colorScheme="blue" m={1}>
          <TabList borderBottomColor={borderColor}>
            <Tab _selected={{ color: primaryColor, bg: useColorModeValue('blue.50', 'blue.900'), borderColor: borderColor, borderBottomColor: cardBg }} fontFamily="var(--font-poppins)">Recent Activity</Tab>
            <Tab _selected={{ color: primaryColor, bg: useColorModeValue('blue.50', 'blue.900'), borderColor: borderColor, borderBottomColor: cardBg }} fontFamily="var(--font-poppins)">Assigned Items (Placeholder)</Tab>
            <Tab _selected={{ color: primaryColor, bg: useColorModeValue('blue.50', 'blue.900'), borderColor: borderColor, borderBottomColor: cardBg }} fontFamily="var(--font-poppins)">Notes (Placeholder)</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                {user.recentActivity.length > 0 ? (
                    <List spacing={4}>
                        {user.recentActivity.map((activity: any) => (
                        <ListItem key={activity.id} display="flex" alignItems="center" p={2} _hover={{bg: useColorModeValue('gray.100', 'gray.700')}} borderRadius="md">
                            <ListIcon as={getActivityIcon(activity.type)} color={accentColor} boxSize={5} />
                            <Box ml={2}>
                            <Text fontWeight="medium" fontFamily="var(--font-inter)" color={headingColor}>{activity.description}</Text>
                            <Text fontSize="xs" color={textColor} fontFamily="var(--font-inter)">
                                {new Date(activity.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                            </Text>
                            </Box>
                        </ListItem>
                        ))}
                    </List>
                ) : (
                    <Text color={textColor} fontFamily="var(--font-inter)">No recent activity recorded for this user.</Text>
                )}
            </TabPanel>
            <TabPanel>
              <Text color={textColor} fontFamily="var(--font-inter)">Placeholder for items assigned to this user (e.g., leads, tasks).</Text>
            </TabPanel>
            <TabPanel>
              <Text color={textColor} fontFamily="var(--font-inter)">Placeholder for notes related to this user.</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </AppLayout>
  );
};

export default UserDetailPage;
