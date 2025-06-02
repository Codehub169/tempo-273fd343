'use client'

import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
  Tag,
  Icon,
  IconButton,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Link as ChakraLink
} from '@chakra-ui/react'
import {
  ChevronRightIcon,
  SearchIcon,
  PlusIcon,
  FilterIcon,
  ListChecksIcon,
  PhoneIcon,
  MailIcon,
  UsersIcon,
  MessageSquareIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  MoreVerticalIcon,
  EditIcon,
  Trash2Icon,
  EyeIcon
} from 'lucide-react'
import { useState } from 'react'

const mockActivities = [
  {
    id: 'act_001',
    type: 'Call',
    subject: 'Follow-up call with Innovatech Solutions',
    relatedTo: { type: 'Account', name: 'Innovatech Solutions Ltd.', id: 'acc_001' },
    dueDate: '2023-11-10T10:00:00Z',
    assignedTo: { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=aarav' },
    status: 'Upcoming',
    priority: 'High',
  },
  {
    id: 'act_002',
    type: 'Email',
    subject: 'Sent proposal to GreenHarvest AgriCorp',
    relatedTo: { type: 'Account', name: 'GreenHarvest AgriCorp', id: 'acc_002' },
    dueDate: '2023-11-05T14:30:00Z',
    assignedTo: { name: 'Priya Singh', avatar: 'https://i.pravatar.cc/150?u=priya2' },
    status: 'Completed',
    priority: 'Medium',
  },
  {
    id: 'act_003',
    type: 'Meeting',
    subject: 'Product Demo for BuildStrong Constructions',
    relatedTo: { type: 'Account', name: 'BuildStrong Constructions', id: 'acc_003' },
    dueDate: '2023-11-15T11:00:00Z',
    assignedTo: { name: 'Rohan Mehta', avatar: 'https://i.pravatar.cc/150?u=rohan' },
    status: 'Upcoming',
    priority: 'High',
  },
  {
    id: 'act_004',
    type: 'Note',
    subject: 'Internal discussion about MediCare account strategy',
    relatedTo: { type: 'Account', name: 'MediCare Hospitals Group', id: 'acc_004' },
    dueDate: '2023-11-08T16:00:00Z',
    assignedTo: { name: 'Aarav Sharma', avatar: 'https://i.pravatar.cc/150?u=aarav' },
    status: 'Overdue',
    priority: 'Low',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'Call': return PhoneIcon;
    case 'Email': return MailIcon;
    case 'Meeting': return UsersIcon;
    case 'Note': return MessageSquareIcon;
    default: return ListChecksIcon;
  }
};

const getStatusColorScheme = (status: string) => {
  switch (status) {
    case 'Completed': return 'green';
    case 'Upcoming': return 'blue';
    case 'Overdue': return 'red';
    default: return 'gray';
  }
};

const getPriorityColorScheme = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'gray';
      default: return 'gray';
    }
  };

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const filteredActivities = mockActivities.filter(activity => 
    activity.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === '' || activity.type === filterType) &&
    (filterStatus === '' || activity.status === filterStatus)
  );

  return (
    <Box p={8} bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={6}>
        <BreadcrumbItem>
          <NextLink href="/dashboard" passHref>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Activities</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex mb={8} alignItems="center">
        <Box>
          <Heading as="h1" size="xl" fontFamily="Poppins, sans-serif" color={useColorModeValue('gray.700', 'white')}>Manage Activities</Heading>
          <Text mt={1} color={textColor} fontSize="md">Track and manage all your CRM tasks and interactions.</Text>
        </Box>
        <Spacer />
        {/* Placeholder for New Activity Modal or Page */}
        <Button leftIcon={<PlusIcon size={18} />} colorScheme="blue" variant="solid" size="md" boxShadow="md" _hover={{ bg: 'blue.600' }}>
          Log New Activity
        </Button>
      </Flex>

      <Box bg={cardBg} p={6} borderRadius="lg" shadow="lg" borderWidth="1px" borderColor={borderColor}>
        <HStack spacing={4} mb={6}>
          <InputGroup flex={2}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" size={20} />
            </InputLeftElement>
            <Input 
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="md"
              _focus={{ borderColor: 'blue.500', boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`}}
            />
          </InputGroup>
          <Select 
            placeholder="Filter by Type" 
            flex={1} 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            icon={<ListChecksIcon size={16}/>}
            borderRadius="md"
            _focus={{ borderColor: 'blue.500', boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`}}
          >
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Note">Note</option>
          </Select>
          <Select 
            placeholder="Filter by Status" 
            flex={1} 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            icon={<CheckCircleIcon size={16}/>}
            borderRadius="md"
            _focus={{ borderColor: 'blue.500', boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`}}
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </Select>
          <Button leftIcon={<FilterIcon size={16} />} variant="outline" colorScheme="gray">
            More Filters
          </Button>
        </HStack>

        <VStack spacing={4} align="stretch">
          {filteredActivities.map((activity) => (
            <Box 
              key={activity.id} 
              p={4} 
              bg={useColorModeValue('white', 'gray.700')}
              borderWidth="1px" 
              borderColor={borderColor} 
              borderRadius="lg" 
              shadow="sm"
              _hover={{ shadow: 'md', transform: 'translateY(-2px)', transition: 'all 0.2s ease-out'}}
            >
              <Flex align="start" justify="space-between">
                <HStack align="start" spacing={4} flex={1} mr={4}>
                  <Icon as={getActivityIcon(activity.type)} color={`${getStatusColorScheme(activity.status)}.500`} boxSize={8} mt={1} />
                  <Box>
                    <Heading as="h3" size="md" fontFamily={'Inter, sans-serif'} noOfLines={2}>{activity.subject}</Heading>
                    <Text fontSize="sm" color={textColor} mt={1}>
                      Related to: 
                      <NextLink href={`/${activity.relatedTo.type.toLowerCase()}s/${activity.relatedTo.id}`} passHref legacyBehavior>
                        <ChakraLink color="blue.500" fontWeight="medium" _hover={{textDecoration: 'underline'}} ml={1}>{activity.relatedTo.name}</ChakraLink>
                      </NextLink>
                       {' ('}{activity.relatedTo.type}{')'}
                    </Text>
                    <HStack spacing={4} mt={2} color={textColor} fontSize="xs">
                        <HStack><Icon as={CalendarDaysIcon} boxSize={4}/> <Text>{new Date(activity.dueDate).toLocaleDateString()}</Text></HStack>
                        <HStack><Icon as={ClockIcon} boxSize={4}/> <Text>{new Date(activity.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text></HStack>
                    </HStack>
                  </Box>
                </HStack>
                
                <VStack align="end" spacing={2} minW="150px">
                    <Tag size="sm" variant="solid" colorScheme={getStatusColorScheme(activity.status)} borderRadius="full">
                        {activity.status}
                    </Tag>
                    <Tag size="xs" variant="outline" colorScheme={getPriorityColorScheme(activity.priority)} borderRadius="full" mt={1}>
                        {activity.priority} Priority
                    </Tag>
                    <HStack mt={2} spacing={1} align="center">
                        <Avatar size="xs" name={activity.assignedTo.name} src={activity.assignedTo.avatar} />
                        <Text fontSize="xs" color={textColor}>{activity.assignedTo.name}</Text>
                    </HStack>
                </VStack>
                <Menu>
                    <MenuButton 
                        as={IconButton} 
                        icon={<MoreVerticalIcon size={20} />} 
                        variant="ghost" 
                        size="sm" 
                        aria-label="Activity options"
                        ml={2}
                    />
                    <MenuList>
                        <MenuItem icon={<EyeIcon size={16}/>}>View Details</MenuItem>
                        {activity.status !== 'Completed' && <MenuItem icon={<CheckCircleIcon size={16}/>}>Mark as Complete</MenuItem>}
                        <MenuItem icon={<EditIcon size={16}/>}>Edit Activity</MenuItem>
                        <MenuDivider />
                        <MenuItem icon={<Trash2Icon size={16}/>} color="red.500">Delete Activity</MenuItem>
                    </MenuList>
                </Menu>
              </Flex>
            </Box>
          ))}
        </VStack>

        {filteredActivities.length === 0 && (
          <Box textAlign="center" p={10}>
            <Icon as={ListChecksIcon} boxSize={12} color="gray.400" mb={4} />
            <Heading as="h3" size="md" color="gray.500">No Activities Found</Heading>
            <Text color="gray.400">Try adjusting your search or filters, or log a new activity.</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
