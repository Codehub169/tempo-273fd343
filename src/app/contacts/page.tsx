'use client';

import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tag,
} from '@chakra-ui/react';
import { PlusCircle, Search, Filter, MoreVertical, Eye, Edit3, Trash2, Users, Mail, Phone } from 'lucide-react';

// Mock data for contacts - replace with actual data fetching
const contactsData = [
  {
    id: 'contact1',
    name: 'Aarav Patel',
    email: 'aarav.patel@example.com',
    phone: '+91 99887 76655',
    company: 'Tech Solutions Inc.',
    role: 'Project Manager',
    createdDate: '2023-09-10',
    lastActivity: '2023-11-12',
  },
  {
    id: 'contact2',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@company.co.in',
    phone: '+91 88776 55443',
    company: 'Innovate Hub',
    role: 'Lead Developer',
    createdDate: '2023-08-22',
    lastActivity: '2023-11-15',
  },
  {
    id: 'contact3',
    name: 'Vikram Singh',
    email: 'vikram.singh@business.org',
    phone: '+91 77665 44332',
    company: 'Global Connect',
    role: 'Sales Director',
    createdDate: '2023-07-01',
    lastActivity: '2023-11-10',
  },
];

export default function ContactsPage() {
  const primaryColor = useColorModeValue('blue.600', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = "#28A745";
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header and Breadcrumbs */}
        <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
          <Box mb={{ base: 4, md: 0 }}>
            <Breadcrumb spacing="8px" separator={<Icon as={Users} color="gray.500" />}>
              <BreadcrumbItem>
                <NextLink href="/dashboard" passHref>
                  <BreadcrumbLink>Dashboard</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="/contacts" fontWeight="medium" color={primaryColor}>Contacts</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading as="h1" size="xl" fontFamily="Poppins, sans-serif" mt={2} color={primaryColor}>
              Manage Contacts
            </Heading>
            <Text color={subtleTextColor}>View, search, and manage all your business contacts.</Text>
          </Box>
          <NextLink href="/contacts/new" passHref>
            <Button 
              leftIcon={<Icon as={PlusCircle} />} 
              bg={accentColor} 
              color="white"
              _hover={{ bg: 'green.600', shadow: 'md' }}
              size="lg"
            >
              Add New Contact
            </Button>
          </NextLink>
        </Flex>

        {/* Search and Filters Bar */}
        <HStack spacing={4} mb={6} wrap="wrap">
          <InputGroup flex={1} minW={{ base: '100%', md: '300px' }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={Search} color="gray.400" />
            </InputLeftElement>
            <Input type="text" placeholder="Search contacts (e.g., name, email, company)" bg={cardBg} _hover={{ borderColor: primaryColor }} _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
          </InputGroup>
          <Select placeholder="Filter by Company" minW="200px" bg={cardBg} _hover={{ borderColor: primaryColor }} _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}>
            <option value="company1">Tech Solutions Inc.</option>
            <option value="company2">Innovate Hub</option>
            <option value="company3">Global Connect</option>
          </Select>
          <Button leftIcon={<Icon as={Filter} />} variant="outline" colorScheme="blue">
            More Filters
          </Button>
        </HStack>

        {/* Contacts Table */}
        <Box bg={cardBg} shadow="md" borderRadius="lg" overflowX="auto">
          <Table variant="simple" size="md">
            <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
              <Tr>
                <Th py={4} fontFamily="Poppins, sans-serif">Name</Th>
                <Th py={4} fontFamily="Poppins, sans-serif">Email</Th>
                <Th py={4} fontFamily="Poppins, sans-serif">Phone</Th>
                <Th py={4} fontFamily="Poppins, sans-serif">Company</Th>
                <Th py={4} fontFamily="Poppins, sans-serif">Role</Th>
                <Th py={4} fontFamily="Poppins, sans-serif">Last Activity</Th>
                <Th py={4} fontFamily="Poppins, sans-serif" textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contactsData.map((contact) => (
                <Tr key={contact.id} _hover={{ bg: useColorModeValue('gray.100', 'gray.600'), cursor:'pointer' }} transition="background-color 0.2s ease">
                  <Td>
                    <NextLink href={`/contacts/${contact.id}`} passHref>
                        <Text fontWeight="medium" color={primaryColor} _hover={{textDecoration: 'underline'}}>{contact.name}</Text>
                    </NextLink>
                  </Td>
                  <Td><HStack spacing={1}><Icon as={Mail} color={subtleTextColor} boxSize={4}/><Text color={subtleTextColor}>{contact.email}</Text></HStack></Td>
                  <Td><HStack spacing={1}><Icon as={Phone} color={subtleTextColor} boxSize={4}/><Text color={subtleTextColor}>{contact.phone}</Text></HStack></Td>
                  <Td>{contact.company}</Td>
                  <Td><Tag size="sm" variant="subtle" colorScheme="purple">{contact.role}</Tag></Td>
                  <Td color={subtleTextColor}>{new Date(contact.lastActivity).toLocaleDateString()}</Td>
                  <Td textAlign="center">
                    <HStack spacing={1} justifyContent="center">
                      <NextLink href={`/contacts/${contact.id}`} passHref>
                        <IconButton aria-label="View contact" icon={<Icon as={Eye} />} variant="ghost" colorScheme="blue" size="sm" _hover={{bg: 'blue.50'}}/>
                      </NextLink>
                      <IconButton aria-label="Edit contact" icon={<Icon as={Edit3} />} variant="ghost" colorScheme="gray" size="sm" _hover={{bg: 'gray.100'}}/>
                      <IconButton aria-label="Delete contact" icon={<Icon as={Trash2} />} variant="ghost" colorScheme="red" size="sm" _hover={{bg: 'red.50'}}/>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        {contactsData.length === 0 && (
            <Text textAlign="center" p={10} color={subtleTextColor}>No contacts found. Get started by adding a new contact!</Text>
        )}
      </VStack>
    </Container>
  );
}
