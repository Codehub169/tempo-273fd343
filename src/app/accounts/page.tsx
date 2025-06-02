'use client'

import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
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
  Flex,
  Tag,
  Avatar,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { SearchIcon, EditIcon, Trash2Icon, EyeIcon, PlusIcon, FilterIcon, BriefcaseIcon, UsersIcon, BuildingIcon } from 'lucide-react'
import { useState } from 'react'
import AppLayout from '@/components/layouts/AppLayout'; 
import { Button } from '@/components/ui/Button';

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
  const headingColor = useColorModeValue('gray.700', 'white');
  const primaryColor = "#0056B3"; // From design system

  const filteredAccounts = mockAccounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterIndustry === '' || account.industry === filterIndustry) &&
    (filterType === '' || account.type === filterType)
  );

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Accounts' }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Flex mb={6} alignItems="center" justifyContent="space-between" wrap="wrap" gap={4}>
        <Box>
          <Heading as="h1" size="xl" fontFamily="var(--font-poppins)" color={headingColor}>Manage Accounts</Heading>
          <Text mt={1} color={textColor} fontSize="md" fontFamily="var(--font-inter)">View, create, and manage your company accounts.</Text>
        </Box>
        <NextLink href="/accounts/new" passHref>
          <Button as="a" leftIcon={<Icon as={PlusIcon} size={18} />} variant="primary" size="md" fontFamily="var(--font-inter)">
            Add New Account
          </Button>
        </NextLink>
      </Flex>

      <Box bg={cardBg} p={6} borderRadius="lg" shadow="lg" borderWidth="1px" borderColor={borderColor}>
        <HStack spacing={4} mb={6} wrap={{base: "wrap", md: "nowrap"}}>
          <InputGroup flex={{base: "1 1 100%", md: 2}}>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} color="gray.400" boxSize={5} />
            </InputLeftElement>
            <Input 
              placeholder="Search by account name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="md"
              borderColor={borderColor}
              fontFamily="var(--font-inter)"
              _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
            />
          </InputGroup>
          <Select 
            placeholder="Filter by Industry" 
            flex={1} 
            value={filterIndustry} 
            onChange={(e) => setFilterIndustry(e.target.value)}
            icon={<Icon as={BriefcaseIcon} size={16} />}
            borderRadius="md"
            borderColor={borderColor}
            fontFamily="var(--font-inter)"
            _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
          >
            <option value="Information Technology">Information Technology</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Construction">Construction</option>
            <option value="Healthcare">Healthcare</option>
          </Select>
          <Select 
            placeholder="Filter by Type" 
            flex={1} 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            icon={<Icon as={UsersIcon} size={16} />} 
            borderRadius="md"
            borderColor={borderColor}
            fontFamily="var(--font-inter)"
            _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
          >
            <option value="Customer">Customer</option>
            <option value="Prospect">Prospect</option>
            <option value="Partner">Partner</option>
            <option value="Vendor">Vendor</option>
          </Select>
          <Button leftIcon={<Icon as={FilterIcon} size={16} />} variant="outline" colorScheme="gray" fontFamily="var(--font-inter)">
            More Filters
          </Button>
        </HStack>

        <TableContainer>
          <Table variant="simple" size="md">
            <Thead bg={useColorModeValue('gray.100', 'gray.800')}>
              <Tr>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Account Name</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Industry</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Type</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Primary Contact</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Phone</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Last Activity</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor} textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody fontFamily="var(--font-inter)">
              {filteredAccounts.map((account) => (
                <Tr key={account.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.600'), transition: 'background-color 0.2s ease-in-out' }}>
                  <Td>
                    <NextLink href={`/accounts/${account.id}`} passHref>
                      <Text as="a" fontWeight="medium" color={primaryColor} _hover={{ textDecoration: 'underline' }}>
                        {account.name}
                      </Text>
                    </NextLink>
                  </Td>
                  <Td color={textColor}>{account.industry}</Td>
                  <Td>
                    <Tag size="sm" colorScheme={AccountTypeColors[account.type] || 'gray'} variant="subtle" borderRadius="full">
                      {account.type}
                    </Tag>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Avatar size="sm" name={account.primaryContact.name} src={account.primaryContact.avatar} />
                      <Text color={textColor}>{account.primaryContact.name}</Text>
                    </HStack>
                  </Td>
                  <Td color={textColor}>{account.phone}</Td>
                  <Td color={textColor}>{new Date(account.lastActivity).toLocaleDateString()}</Td>
                  <Td textAlign="center">
                    <HStack spacing={1} justifyContent="center">
                      <NextLink href={`/accounts/${account.id}`} passHref>
                        <IconButton as="a" icon={<Icon as={EyeIcon} size={18} />} aria-label="View account" variant="ghost" colorScheme="blue" size="sm" />
                      </NextLink>
                      <IconButton icon={<Icon as={EditIcon} size={18} />} aria-label="Edit account" variant="ghost" colorScheme="yellow" size="sm" onClick={() => alert(`Edit ${account.name}`)} />
                      <IconButton icon={<Icon as={Trash2Icon} size={18} />} aria-label="Delete account" variant="ghost" colorScheme="red" size="sm" onClick={() => alert(`Delete ${account.name}`)} />
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
            <Heading as="h3" size="md" color="gray.500" fontFamily="var(--font-poppins)">No Accounts Found</Heading>
            <Text color="gray.400" fontFamily="var(--font-inter)">Try adjusting your search or filters, or add a new account.</Text>
          </Box>
        )}
      </Box>
    </AppLayout>
  )
}
