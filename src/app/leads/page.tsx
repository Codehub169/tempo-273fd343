'use client';

import { Box, Flex, Heading, Button, Icon, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton, useColorModeValue, InputGroup, InputLeftElement, Input, HStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import { FiPlusCircle, FiEdit, FiEye, FiTrash2, FiSearch, FiChevronRight, FiFilter } from 'react-icons/fi'; // Using react-icons as placeholder
import NextLink from 'next/link'; // For client-side navigation

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
  const accentColor = "#28A745";
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    // This Box would be the main content area within AppLayout in the future
    <Box p={{ base: 4, md: 8 }} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Flex direction="column" gap={6}>
        {/* Header Section */}
        <Flex justifyContent="space-between" alignItems="center" wrap="wrap" gap={2}>
          <Heading as="h1" size="xl" color={headingColor} fontFamily="Poppins, sans-serif">
            Manage Leads
          </Heading>
          <NextLink href="/leads/new" passHref>
            <Button 
              as="a" 
              leftIcon={<Icon as={FiPlusCircle} />} 
              bg={accentColor} 
              color={'white'} 
              _hover={{ bg: '#218838' }}
              fontFamily="Inter, sans-serif"
              boxShadow="md"
              size="lg"
            >
              Add New Lead
            </Button>
          </NextLink>
        </Flex>

        {/* Search and Filter Bar - Placeholder */}
        <HStack spacing={4} mb={4}>
          <InputGroup flex={1}>
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
            />
          </InputGroup>
          <Button leftIcon={<Icon as={FiFilter} />} variant="outline" borderColor={primaryColor} color={primaryColor} _hover={{bg: useColorModeValue('blue.50', 'blue.900')}}>
            Filters
          </Button>
        </HStack>

        {/* Leads Table */}
        <Box bg={cardBg} shadow="lg" borderRadius="xl" overflowX="auto">
          <Table variant="simple" size="md">
            <Thead bg={useColorModeValue('gray.100', 'gray.700')}>
              <Tr>
                <Th fontFamily="Poppins, sans-serif" color={headingColor}>Lead Name</Th>
                <Th fontFamily="Poppins, sans-serif" color={headingColor}>Company</Th>
                <Th fontFamily="Poppins, sans-serif" color={headingColor}>Status</Th>
                <Th fontFamily="Poppins, sans-serif" color={headingColor}>Assigned To</Th>
                <Th fontFamily="Poppins, sans-serif" color={headingColor}>Created Date</Th>
                <Th fontFamily="Poppins, sans-serif" color={headingColor} textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leadsData.map((lead) => (
                <Tr key={lead.id} _hover={{ bg: hoverBg, cursor: 'pointer', transition: 'background-color 0.2s ease' }} fontFamily="Inter, sans-serif">
                  <Td>
                    <NextLink href={`/leads/${lead.id}`} passHref>
                      <ChakraLink color={primaryColor} fontWeight="medium">{lead.name}</ChakraLink>
                    </NextLink>
                  </Td>
                  <Td>{lead.company}</Td>
                  <Td>
                    <Badge colorScheme={getStatusBadgeColor(lead.status)} variant="subtle" px={2} py={1} borderRadius="md">
                      {lead.status}
                    </Badge>
                  </Td>
                  <Td>{lead.assignedTo}</Td>
                  <Td>{lead.createdDate}</Td>
                  <Td textAlign="right">
                    <HStack spacing={2} justifyContent="flex-end">
                      <NextLink href={`/leads/${lead.id}`} passHref>
                        <IconButton as="a" icon={<FiEye />} aria-label="View Lead" variant="ghost" colorScheme="blue" size="sm" />
                      </NextLink>
                      <NextLink href={`/leads/${lead.id}/edit`} passHref> {/* Assuming an edit page route */} 
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
                    <Text color={useColorModeValue('gray.500', 'gray.400')} fontFamily="Inter, sans-serif">
                      No leads found. Start by <NextLink href="/leads/new" passHref><ChakraLink color={primaryColor}>adding a new lead</ChakraLink></NextLink>.
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
            <Button size="sm" variant="outline">Previous</Button>
            {/* Page numbers could go here */}
            <Button size="sm" variant="outline">Next</Button>
          </HStack>
        </Flex>

      </Flex>
    </Box>
  );
}
