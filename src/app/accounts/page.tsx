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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
  Tag,
  Avatar,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { ChevronRightIcon, SearchIcon, EditIcon, Trash2Icon, EyeIcon, PlusIcon, FilterIcon, BriefcaseIcon, UsersIcon, BuildingIcon } from 'lucide-react'
import { useState } from 'react'

const mockAccounts = [
  {
    id: 'acc_001',
    name: 'Innovatech Solutions Ltd.',
    industry: 'Information Technology',
    type: 'Customer',
    primaryContact: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=priya' },
    phone: '+91 98765 43210',
    lastActivity: '2023-10-25',
    revenue: 5000000,
    employees: 150,
  },
  {
    id: 'acc_002',
    name: 'GreenHarvest AgriCorp',
    industry: 'Agriculture',
    type: 'Prospect',
    primaryContact: { name: 'Rajesh Kumar', avatar: 'https://i.pravatar.cc/150?u=rajesh' },
    phone: '+91 87654 32109',
    lastActivity: '2023-10-20',
    revenue: 2000000,
    employees: 75,
  },
  {
    id: 'acc_003',
    name: 'BuildStrong Constructions',
    industry: 'Construction',
    type: 'Partner',
    primaryContact: { name: 'Anita Desai', avatar: 'https://i.pravatar.cc/150?u=anita' },
    phone: '+91 76543 21098',
    lastActivity: '2023-10-28',
    revenue: 10000000,
    employees: 300,
  },
  {
    id: 'acc_004',
    name: 'MediCare Hospitals Group',
    industry: 'Healthcare',
    type: 'Customer',
    primaryContact: { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram' },
    phone: '+91 65432 10987',
    lastActivity: '2023-10-15',
    revenue: 7500000,
    employees: 500,
  },
];

const AccountTypeColors: { [key: string]: string } = {
  Customer: 'green',
  Prospect: 'blue',
  Partner: 'purple',
  Vendor: 'orange',
};

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [filterType, setFilterType] = useState('');

  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const filteredAccounts = mockAccounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterIndustry === '' || account.industry === filterIndustry) &&
    (filterType === '' || account.type === filterType)
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
          <BreadcrumbLink href="#">Accounts</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex mb={8} alignItems="center">
        <Box>
          <Heading as="h1" size="xl" fontFamily="Poppins, sans-serif" color={useColorModeValue('gray.700', 'white')}>Manage Accounts</Heading>
          <Text mt={1} color={textColor} fontSize="md">View, create, and manage your company accounts.</Text>
        </Box>
        <Spacer />
        <NextLink href="/accounts/new" passHref>
          <Button as="a" leftIcon={<PlusIcon size={18} />} colorScheme="blue" variant="solid" size="md" boxShadow="md" _hover={{ bg: 'blue.600' }}>
            Add New Account
          </Button>
        </NextLink>
      </Flex>

      <Box bg={cardBg} p={6} borderRadius="lg" shadow="lg" borderWidth="1px" borderColor={borderColor}>
        <HStack spacing={4} mb={6}>
          <InputGroup flex={2}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" size={20} />
            </InputLeftElement>
            <Input 
              placeholder="Search by account name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="md"
              _focus={{ borderColor: 'blue.500', boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`}}
            />
          </InputGroup>
          <Select 
            placeholder="Filter by Industry" 
            flex={1} 
            value={filterIndustry} 
            onChange={(e) => setFilterIndustry(e.target.value)}
            icon={<BriefcaseIcon size={16} />} 
            borderRadius="md"
            _focus={{ borderColor: 'blue.500', boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`}}
          >
            <option value="Information Technology">Information Technology</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Construction">Construction</option>
            <option value="Healthcare">Healthcare</option>
            {/* Add more industries as needed */}
          </Select>
          <Select 
            placeholder="Filter by Type" 
            flex={1} 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            icon={<UsersIcon size={16} />} 
            borderRadius="md"
            _focus={{ borderColor: 'blue.500', boxShadow: `0 0 0 1px var(--chakra-colors-blue-500)`}}
          >
            <option value="Customer">Customer</option>
            <option value="Prospect">Prospect</option>
            <option value="Partner">Partner</option>
            <option value="Vendor">Vendor</option>
          </Select>
          <Button leftIcon={<FilterIcon size={16} />} variant="outline" colorScheme="gray">
            More Filters
          </Button>
        </HStack>

        <TableContainer>
          <Table variant="simple" size="md">
            <Thead bg={useColorModeValue('gray.100', 'gray.700')}>
              <Tr>
                <Th>Account Name</Th>
                <Th>Industry</Th>
                <Th>Type</Th>
                <Th>Primary Contact</Th>
                <Th>Phone</Th>
                <Th>Last Activity</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAccounts.map((account) => (
                <Tr key={account.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.600'), transition: 'background-color 0.2s ease-in-out' }}>
                  <Td>
                    <NextLink href={`/accounts/${account.id}`} passHref>
                      <Text as="a" fontWeight="medium" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                        {account.name}
                      </Text>
                    </NextLink>
                  </Td>
                  <Td>{account.industry}</Td>
                  <Td>
                    <Tag size="sm" colorScheme={AccountTypeColors[account.type] || 'gray'} variant="subtle" borderRadius="full">
                      {account.type}
                    </Tag>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Avatar size="sm" name={account.primaryContact.name} src={account.primaryContact.avatar} />
                      <Text>{account.primaryContact.name}</Text>
                    </HStack>
                  </Td>
                  <Td>{account.phone}</Td>
                  <Td>{new Date(account.lastActivity).toLocaleDateString()}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <NextLink href={`/accounts/${account.id}`} passHref>
                        <IconButton as="a" icon={<EyeIcon size={18} />} aria-label="View account" variant="ghost" colorScheme="blue" size="sm" />
                      </NextLink>
                      <IconButton icon={<EditIcon size={18} />} aria-label="Edit account" variant="ghost" colorScheme="yellow" size="sm" onClick={() => alert(`Edit ${account.name}`)} />
                      <IconButton icon={<Trash2Icon size={18} />} aria-label="Delete account" variant="ghost" colorScheme="red" size="sm" onClick={() => alert(`Delete ${account.name}`)} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {filteredAccounts.length === 0 && (
          <Box textAlign="center" p={10}>
             <Icon as={BuildingIcon} boxSize={12} color="gray.400" mb={4} />
            <Heading as="h3" size="md" color="gray.500">No Accounts Found</Heading>
            <Text color="gray.400">Try adjusting your search or filters, or add a new account.</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
