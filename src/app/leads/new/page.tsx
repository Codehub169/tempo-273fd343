'use client';

import { Box, Flex, Heading, Button, Icon, VStack, FormControl, FormLabel, Input, Select, Textarea, useColorModeValue, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack } from '@chakra-ui/react';
import { FiSave, FiArrowLeft, FiUser, FiBriefcase, FiMail, FiPhone, FiFileText, FiActivity, FiUsers, FiDollarSign } from 'react-icons/fi'; // Using react-icons as placeholder
import NextLink from 'next/link'; // For client-side navigation

export default function NewLeadPage() {
  const primaryColor = "#0056B3";
  const accentColor = "#28A745";
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.400');

  // Placeholder for form state and submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission will go here
    alert('Form submitted (placeholder)');
  };

  return (
    // This Box would be the main content area within AppLayout in the future
    <Box p={{ base: 4, md: 8 }} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Flex direction="column" gap={6} maxW="3xl" mx="auto">
        {/* Breadcrumbs and Header */}
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Breadcrumb separator={<Icon as={FiArrowLeft} color="gray.500" transform="rotate(180deg)" /> } fontFamily="Inter, sans-serif">
              <BreadcrumbItem>
                <NextLink href="/leads" passHref>
                  <BreadcrumbLink color={primaryColor} _hover={{textDecoration: 'underline'}}>Leads</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink fontWeight="medium" color={headingColor}>Create New Lead</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading as="h1" size="xl" mt={2} color={headingColor} fontFamily="Poppins, sans-serif">
              Create New Lead
            </Heading>
          </Box>
          <NextLink href="/leads" passHref>
            <Button 
              as="a" 
              leftIcon={<Icon as={FiArrowLeft} />} 
              variant="outline"
              borderColor={primaryColor}
              color={primaryColor}
              _hover={{bg: useColorModeValue('blue.50', 'blue.900')}}
            >
              Back to Leads
            </Button>
          </NextLink>
        </Flex>

        {/* Lead Form Placeholder - to be replaced by LeadForm.tsx component */}
        <Box as="form" onSubmit={handleSubmit} bg={cardBg} p={{base: 6, md: 8}} shadow="lg" borderRadius="xl">
          <VStack spacing={6} align="stretch">
            <Heading as="h3" size="lg" fontFamily="Poppins, sans-serif" color={headingColor} borderBottomWidth="1px" borderColor={borderColor} pb={3} mb={2}>
                Lead Information
            </Heading>
            
            <FormControl isRequired>
              <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiFileText} mr={2}/>Lead Name / Title</FormLabel>
              <Input placeholder="e.g., Project Alpha Inquiry" focusBorderColor={primaryColor} borderColor={borderColor} />
            </FormControl>

            <HStack spacing={4} direction={{base: 'column', md: 'row'}} w="full">
                <FormControl isRequired flex={1}>
                  <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiBriefcase} mr={2}/>Company Name</FormLabel>
                  <Input placeholder="e.g., Alpha Corp" focusBorderColor={primaryColor} borderColor={borderColor} />
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiDollarSign} mr={2}/>Potential Value (INR)</FormLabel>
                  <Input type="number" placeholder="e.g., 500000" focusBorderColor={primaryColor} borderColor={borderColor} />
                </FormControl>
            </HStack>

            <Heading as="h3" size="lg" fontFamily="Poppins, sans-serif" color={headingColor} borderBottomWidth="1px" borderColor={borderColor} pb={3} mb={2} mt={4}>
                Contact Details
            </Heading>

            <HStack spacing={4} direction={{base: 'column', md: 'row'}} w="full">
                <FormControl flex={1}>
                  <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiUser} mr={2}/>Contact Person</FormLabel>
                  <Input placeholder="e.g., John Doe" focusBorderColor={primaryColor} borderColor={borderColor} />
                </FormControl>
                <FormControl isRequired flex={1}>
                  <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiMail} mr={2}/>Email Address</FormLabel>
                  <Input type="email" placeholder="e.g., john.doe@alphacorp.com" focusBorderColor={primaryColor} borderColor={borderColor} />
                </FormControl>
            </HStack>

            <FormControl>
              <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiPhone} mr={2}/>Phone Number</FormLabel>
              <Input type="tel" placeholder="e.g., +91 9876543210" focusBorderColor={primaryColor} borderColor={borderColor} />
            </FormControl>

            <Heading as="h3" size="lg" fontFamily="Poppins, sans-serif" color={headingColor} borderBottomWidth="1px" borderColor={borderColor} pb={3} mb={2} mt={4}>
                Lead Status & Assignment
            </Heading>

            <HStack spacing={4} direction={{base: 'column', md: 'row'}} w="full">
                <FormControl isRequired flex={1}>
                  <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiActivity} mr={2}/>Lead Status</FormLabel>
                  <Select placeholder="Select status" focusBorderColor={primaryColor} borderColor={borderColor}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="negotiation">Negotiation</option>
                  </Select>
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel color={labelColor} fontFamily="Inter, sans-serif" display="flex" alignItems="center"><Icon as={FiUsers} mr={2}/>Assigned To</FormLabel>
                  <Select placeholder="Select user" focusBorderColor={primaryColor} borderColor={borderColor}>
                    {/* Placeholder options - to be fetched dynamically */}
                    <option value="user1">Sales Rep A</option>
                    <option value="user2">Sales Rep B</option>
                  </Select>
                </FormControl>
            </HStack>

            <FormControl>
              <FormLabel color={labelColor} fontFamily="Inter, sans-serif">Notes / Description</FormLabel>
              <Textarea placeholder="Enter any additional details about the lead..." rows={5} focusBorderColor={primaryColor} borderColor={borderColor} />
            </FormControl>

            <Flex justifyContent="flex-end" mt={6}>
              <Button 
                type="submit" 
                leftIcon={<Icon as={FiSave} />} 
                bg={accentColor} 
                color={'white'} 
                _hover={{ bg: '#218838' }}
                fontFamily="Inter, sans-serif"
                px={8}
                size="lg"
                boxShadow="md"
              >
                Save Lead
              </Button>
            </Flex>
          </VStack>
        </Box>
        {/* End of LeadForm placeholder */}
      </Flex>
    </Box>
  );
}
