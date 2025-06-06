'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  HStack,
  VStack,
  Avatar,
  Flex,
  Icon,
  useColorModeValue,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  Users,
} from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';

// Mock User Data
const mockUsers = [
  {
    id: 'usr_001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2024-03-10T10:00:00Z',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'usr_002',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    role: 'Sales Manager',
    status: 'Active',
    lastLogin: '2024-03-10T09:30:00Z',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'usr_003',
    name: 'Rohan Das',
    email: 'rohan.das@example.com',
    role: 'Sales Representative',
    status: 'Active',
    lastLogin: '2024-03-09T15:45:00Z',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 'usr_004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    role: 'Sales Representative',
    status: 'Inactive',
    lastLogin: '2024-02-20T11:00:00Z',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 'usr_005',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2024-03-11T08:15:00Z',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
];

type User = typeof mockUsers[0];

const getStatusColorScheme = (status: string) => {
  if (status === 'Active') return 'green';
  if (status === 'Inactive') return 'red';
  return 'gray';
};

const getRoleColorScheme = (role: string) => {
  if (role === 'Administrator') return 'purple';
  if (role === 'Sales Manager') return 'blue';
  if (role === 'Sales Representative') return 'teal';
  return 'gray';
};

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const primaryColor = "#0056B3";
  const accentColor = "#28A745";
  
  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const roleMatch = roleFilter === '' || user.role === roleFilter;
      const statusMatch = statusFilter === '' || user.status === statusFilter;
      return (nameMatch || emailMatch) && roleMatch && statusMatch;
    });
  }, [searchTerm, roleFilter, statusFilter, mockUsers]); // Added mockUsers to dependency array for correctness, though it's constant here

  const breadcrumbs = [
    { label: 'Admin', href: '/admin/users' }, 
    { label: 'Users' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Box p={0} bg={useColorModeValue('gray.50', 'gray.800')} borderRadius="xl" shadow="md">
        {/* Header Section */}
        <Flex justify="space-between" align="center" p={6} borderBottomWidth="1px" borderColor={borderColor}>
          <VStack align="start">
            <Heading as="h1" size="lg" fontFamily="var(--font-poppins)" color={headingColor}>
              Manage Users
            </Heading>
            <Text fontSize="sm" color={textColor} fontFamily="var(--font-inter)">
              Oversee all user accounts, roles, and statuses within the CRM.
            </Text>
          </VStack>
          <NextLink href="/admin/users/new" passHref>
            <Button
              as="a"
              leftIcon={<Icon as={Plus} />}
              bg={accentColor}
              color="white"
              _hover={{ bg: '#218838' }}
              fontFamily="var(--font-inter)"
              size="md"
              boxShadow="sm"
            >
              Add New User
            </Button>
          </NextLink>
        </Flex>

        {/* Filters and Search Section */}
        <Flex p={6} gap={4} direction={{ base: 'column', md: 'row' }} align={{ base: 'stretch', md: 'center' }}>
          <InputGroup flex={1}>
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={cardBg}
              borderColor={borderColor}
              _hover={{ borderColor: 'gray.400' }}
              _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
              fontFamily="var(--font-inter)"
            />
          </InputGroup>
          <Select
            placeholder="Filter by Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            icon={<Icon as={Filter} color="gray.400" />}
            bg={cardBg}
            borderColor={borderColor}
            fontFamily="var(--font-inter)"
            minW="200px"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
          >
            <option value="Administrator">Administrator</option>
            <option value="Sales Manager">Sales Manager</option>
            <option value="Sales Representative">Sales Representative</option>
          </Select>
          <Select
            placeholder="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            icon={<Icon as={Filter} color="gray.400" />}
            bg={cardBg}
            borderColor={borderColor}
            fontFamily="var(--font-inter)"
            minW="200px"
            _hover={{ borderColor: 'gray.400' }}
            _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </Flex>

        {/* Users Table */}
        <Box overflowX="auto" p={6} pt={0}>
          {filteredUsers.length > 0 ? (
            <Table variant="simple" bg={cardBg} borderRadius="md" shadow="sm" borderWidth="1px" borderColor={borderColor}>
              <Thead bg={useColorModeValue('gray.100', 'gray.800')}>
                <Tr>
                  <Th fontFamily="var(--font-poppins)" color={headingColor}>User</Th>
                  <Th fontFamily="var(--font-poppins)" color={headingColor}>Role</Th>
                  <Th fontFamily="var(--font-poppins)" color={headingColor}>Status</Th>
                  <Th fontFamily="var(--font-poppins)" color={headingColor}>Last Login</Th>
                  <Th fontFamily="var(--font-poppins)" color={headingColor}>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.700')}} transition="background 0.2s ease-in-out">
                    <Td>
                      <HStack spacing={3}>
                        <Avatar size="sm" name={user.name} src={user.avatarUrl} />
                        <VStack align="start" spacing={0}>
                          <NextLink href={`/admin/users/${user.id}`} passHref>
                            <Text as="a" fontWeight="medium" color={primaryColor} _hover={{ textDecoration: 'underline'}} cursor="pointer" fontFamily="var(--font-inter)">
                              {user.name}
                            </Text>
                          </NextLink>
                          <Text fontSize="sm" color={textColor} fontFamily="var(--font-inter)">{user.email}</Text>
                        </VStack>
                      </HStack>
                    </Td>
                    <Td>
                      <Tag size="md" variant="subtle" colorScheme={getRoleColorScheme(user.role)} borderRadius="full">
                        <TagLabel fontFamily="var(--font-inter)">{user.role}</TagLabel>
                      </Tag>
                    </Td>
                    <Td>
                      <Badge colorScheme={getStatusColorScheme(user.status)} variant="solid" borderRadius="full" px={2} py={1} fontFamily="var(--font-inter)">
                        {user.status}
                      </Badge>
                    </Td>
                    <Td fontSize="sm" color={textColor} fontFamily="var(--font-inter)">
                      {new Date(user.lastLogin).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<Icon as={MoreVertical} />}
                          variant='ghost'
                          size='sm'
                          color={textColor}
                        />
                        <MenuList minW="150px" shadow="lg" borderColor={borderColor}>
                          <MenuItem as={NextLink} href={`/admin/users/${user.id}`} icon={<Icon as={Eye} boxSize={4} color="gray.500"/>} fontFamily="var(--font-inter)">
                            View Details
                          </MenuItem>
                          <MenuItem as={NextLink} href={`/admin/users/${user.id}/edit`} icon={<Icon as={Edit2} boxSize={4} color="gray.500"/>} fontFamily="var(--font-inter)"> {/* Placeholder Edit Link */}
                            Edit User
                          </MenuItem>
                          {user.status === 'Active' ? (
                            <MenuItem icon={<Icon as={UserX} boxSize={4} color="orange.500"/>} color="orange.500" fontFamily="var(--font-inter)">
                              Deactivate User
                            </MenuItem>
                          ) : (
                            <MenuItem icon={<Icon as={UserCheck} boxSize={4} color="green.500"/>} color="green.500" fontFamily="var(--font-inter)">
                              Activate User
                            </MenuItem>
                          )}
                          <MenuItem icon={<Icon as={Trash2} boxSize={4} color="red.500"/>} color="red.500" fontFamily="var(--font-inter)">
                            Delete User
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : (
            <Flex direction="column" align="center" justify="center" p={10} bg={cardBg} borderRadius="md" borderWidth="1px" borderColor={borderColor} minH="300px">
              <Icon as={Users} boxSize={16} color="gray.400" mb={4} />
              <Heading as="h3" size="md" color={headingColor} fontFamily="var(--font-poppins)" mb={2}>No Users Found</Heading>
              <Text color={textColor} fontFamily="var(--font-inter)">Try adjusting your search or filter criteria.</Text>
            </Flex>
          )}
        </Box>
      </Box>
    </AppLayout>
  );
};

export default UsersPage;
