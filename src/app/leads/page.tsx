'use client';

import { Box, Flex, Heading, Icon, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton, useColorModeValue, InputGroup, InputLeftElement, Input, HStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import { FiPlusCircle, FiEdit, FiEye, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi'; 
import NextLink from 'next/link'; 
import AppLayout from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/Button';

// Placeholder data for leads - replace with actual data fetching
const leadsData = [
  { id: 'L001', name: 'Alpha Corp Inquiry', company: 'Alpha Corp', status: 'New', assignedTo: 'Sales Rep A', createdDate: '2023-10-01', email: 'contact@alphacorp.com', phone: '+91 9876543210' },
  { id: 'L002', name: 'Beta Solutions Demo Request', company: 'Beta Solutions', status: 'Qualified', assignedTo: 'Sales Rep B', createdDate: '2023-10-05', email: 'info@betasolutions.io', phone: '+91 8765432109' },
  { id: 'L003', name: 'Gamma Services Partnership', company: 'Gamma Services', status: 'Proposal Sent', assignedTo: 'Sales Rep A', createdDate: '2023-10-10', email: 'partner@gammaservices.co', phone: '+91 7654321098' },
  { id: 'L004', name: 'Delta Innovations Project', company: 'Delta Innovations', status: 'Negotiation', assignedTo: 'Sales Rep C', createdDate: '2023-10-15', email: 'sales@deltainnov.com', phone: '+91 6543210987' },
  { id: 'L005', name: 'Epsilon Tech Consultation', company: 'Epsilon Tech', status: 'Closed Won', assignedTo: 'Sales Rep B', createdDate: '2023-09-20', email: 'consult@epsilon.tech', phone: '+91 5432109876' },
];

const getStatusBadgeColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'new': return 'blue';
    case 'qualified': return 'yellow';
    case 'proposal sent': return 'orange';
    case 'negotiation': return 'purple';
    case 'closed won': return 'green';
    case 'closed lost': return 'red';
    default: return 'gray';
  }
};

export default function LeadsPage() {
  const primaryColor = "#0056B3";
  // const accentColor = "#28A745"; // Handled by Button variant='accent'
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const hoverBg = useColorModeValue('gray.50', 'gray.700'); 

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leads' }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Flex direction="column" gap={6}>
        {/* Header Section */}
        <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap={2}>
          <Heading as="h1" size="xl" color={headingColor} fontFamily="var(--font-poppins)">
            Manage Leads
          </Heading>
          <NextLink href="/leads/new" passHref>
            <Button 
              as="a" 
              leftIcon={<Icon as={FiPlusCircle} />}
              variant="accent"
              fontFamily="var(--font-inter)"
              size="lg"
            >
              Add New Lead
            </Button>
          </NextLink>
        </Flex>

        {/* Search and Filter Bar */}
        <HStack spacing={4} mb={4} wrap={{ base: 'wrap', md: 'nowrap'}} gap={{base: 2, md: 4}}>
          <InputGroup flex={{ base: '1 1 100%', md: 1 }}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input 
              type="text" 
              placeholder="Search leads by name, company, or email..." 
              bg={cardBg} 
              borderColor={borderColor}
              focusBorderColor={primaryColor}
              rounded="md"
              fontFamily="var(--font-inter)"
            />
          </InputGroup>
          <Button 
            leftIcon={<Icon as={FiFilter} />} 
            variant="outline"
            fontFamily="var(--font-inter)"
            // The custom Button's 'outline' variant should use primaryColor by default from theme.
            // Explicitly setting for clarity if theme is not fully configured:
            borderColor={primaryColor} 
            color={primaryColor}
            _hover={{bg: useColorModeValue('blue.50', 'rgba(0, 86, 179, 0.2)')}}
          >
            Filters
          </Button>
        </HStack>

        {/* Leads Table */}
        <Box bg={cardBg} shadow="lg" borderRadius="xl" overflowX="auto" borderWidth="1px" borderColor={borderColor}>
          <Table variant="simple" size="md">
            <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
              <Tr>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Lead Name</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Company</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Status</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Assigned To</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor}>Created Date</Th>
                <Th fontFamily="var(--font-poppins)" color={headingColor} textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody fontFamily="var(--font-inter)">
              {leadsData.map((lead) => (
                <Tr key={lead.id} _hover={{ bg: hoverBg, cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
                  <Td>
                    <NextLink href={`/leads/${lead.id}`} passHref legacyBehavior>
                      <ChakraLink color={primaryColor} fontWeight="medium" _hover={{textDecoration: 'underline'}}>{lead.name}</ChakraLink>
                    </NextLink>
                  </Td>
                  <Td>{lead.company}</Td>
                  <Td>
                    <Badge colorScheme={getStatusBadgeColor(lead.status)} variant="subtle" px={2} py={1} borderRadius="md">
                      {lead.status}
                    </Badge>
                  </Td>
                  <Td>{lead.assignedTo}</Td>
                  <Td>{new Date(lead.createdDate).toLocaleDateString()}</Td>
                  <Td textAlign="right">
                    <HStack spacing={2} justifyContent="flex-end">
                      <NextLink href={`/leads/${lead.id}`} passHref>
                        <IconButton as="a" icon={<FiEye />} aria-label="View Lead" variant="ghost" colorScheme="blue" size="sm" />
                      </NextLink>
                      <NextLink href={`/leads/${lead.id}/edit`} passHref> 
                        <IconButton as="a" icon={<FiEdit />} aria-label="Edit Lead" variant="ghost" colorScheme="green" size="sm" />
                      </NextLink>
                      <IconButton icon={<FiTrash2 />} aria-label="Delete Lead" variant="ghost" colorScheme="red" size="sm" onClick={() => alert(`Delete ${lead.id}? (placeholder)`)} />
                    </HStack>
                  </Td>
                </Tr>
              ))}
              {leadsData.length === 0 && (
                <Tr>
                  <Td colSpan={6} textAlign="center" py={10}>
                    <Text color={useColorModeValue('gray.500', 'gray.400')} fontFamily="var(--font-inter)">
                      No leads found. Start by <NextLink href="/leads/new" passHref legacyBehavior><ChakraLink color={primaryColor} _hover={{textDecoration: 'underline'}}>adding a new lead</ChakraLink></NextLink>.
                    </Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        
        {/* Placeholder for Pagination Controls */}
        <Flex justifyContent="flex-end" mt={4}>
          <HStack spacing={2}>
            <Button size="sm" variant="outline" fontFamily="var(--font-inter)">Previous</Button>
            {/* Page numbers could go here */}
            <Button size="sm" variant="outline" fontFamily="var(--font-inter)">Next</Button>
          </HStack>
        </Flex>

      </Flex>
    </AppLayout>
  );
}
