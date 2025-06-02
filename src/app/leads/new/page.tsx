'use client';

import { Box, Flex, Heading, Icon, VStack, FormControl, FormLabel, Input, Select, Textarea, useColorModeValue, HStack } from '@chakra-ui/react';
import { FiSave, FiArrowLeft, FiUser, FiBriefcase, FiMail, FiPhone, FiFileText, FiActivity, FiUsers, FiDollarSign } from 'react-icons/fi'; 
import NextLink from 'next/link'; 
import AppLayout from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import React from 'react'; // Import React for React.FormEvent

export default function NewLeadPage() {
  const primaryColor = "#0056B3";
  // const accentColor = "#28A745"; // Handled by Button variant='accent'
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');
  const labelColor = useColorModeValue('gray.600', 'gray.400');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission will go here
    alert('Form submitted (placeholder)');
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Leads', href: '/leads' },
    { label: 'Create New Lead' }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Flex direction="column" gap={6} maxW="3xl" mx="auto">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl" mt={0} color={headingColor} fontFamily="var(--font-poppins)">
            Create New Lead
          </Heading>
          <NextLink href="/leads" passHref>
            <Button 
              as="a" 
              leftIcon={<Icon as={FiArrowLeft} />}
              variant="outline"
              borderColor={primaryColor} // Explicitly set for outline if theme doesn't cover
              color={primaryColor} // Explicitly set for outline if theme doesn't cover
              _hover={{bg: useColorModeValue('blue.50', 'rgba(0, 86, 179, 0.2)')}}
              fontFamily="var(--font-inter)"
            >
              Back to Leads
            </Button>
          </NextLink>
        </Flex>

        <Box as="form" onSubmit={handleSubmit} bg={cardBg} p={{base: 6, md: 8}} shadow="lg" borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={6} align="stretch">
            <Heading as="h3" size="lg" fontFamily="var(--font-poppins)" color={headingColor} borderBottomWidth="1px" borderColor={borderColor} pb={3} mb={2}>
                Lead Information
            </Heading>
            
            <FormControl isRequired>
              <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiFileText} mr={2}/>Lead Name / Title</FormLabel>
              <Input placeholder="e.g., Project Alpha Inquiry" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
            </FormControl>

            <HStack spacing={4} direction={{base: 'column', md: 'row'}} w="full">
                <FormControl isRequired flex={1}>
                  <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiBriefcase} mr={2}/>Company Name</FormLabel>
                  <Input placeholder="e.g., Alpha Corp" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiDollarSign} mr={2}/>Potential Value (INR)</FormLabel>
                  <Input type="number" placeholder="e.g., 500000" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
                </FormControl>
            </HStack>

            <Heading as="h3" size="lg" fontFamily="var(--font-poppins)" color={headingColor} borderBottomWidth="1px" borderColor={borderColor} pb={3} mb={2} mt={4}>
                Contact Details
            </Heading>

            <HStack spacing={4} direction={{base: 'column', md: 'row'}} w="full">
                <FormControl flex={1}>
                  <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiUser} mr={2}/>Contact Person</FormLabel>
                  <Input placeholder="e.g., John Doe" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
                </FormControl>
                <FormControl isRequired flex={1}>
                  <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiMail} mr={2}/>Email Address</FormLabel>
                  <Input type="email" placeholder="e.g., john.doe@alphacorp.com" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
                </FormControl>
            </HStack>

            <FormControl>
              <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiPhone} mr={2}/>Phone Number</FormLabel>
              <Input type="tel" placeholder="e.g., +91 9876543210" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
            </FormControl>

            <Heading as="h3" size="lg" fontFamily="var(--font-poppins)" color={headingColor} borderBottomWidth="1px" borderColor={borderColor} pb={3} mb={2} mt={4}>
                Lead Status & Assignment
            </Heading>

            <HStack spacing={4} direction={{base: 'column', md: 'row'}} w="full">
                <FormControl isRequired flex={1}>
                  <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiActivity} mr={2}/>Lead Status</FormLabel>
                  <Select placeholder="Select status" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="negotiation">Negotiation</option>
                  </Select>
                </FormControl>
                <FormControl flex={1}>
                  <FormLabel color={labelColor} fontFamily="var(--font-inter)" display="flex" alignItems="center"><Icon as={FiUsers} mr={2}/>Assigned To</FormLabel>
                  <Select placeholder="Select user" focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)">
                    <option value="user1">Sales Rep A</option>
                    <option value="user2">Sales Rep B</option>
                  </Select>
                </FormControl>
            </HStack>

            <FormControl>
              <FormLabel color={labelColor} fontFamily="var(--font-inter)">Notes / Description</FormLabel>
              <Textarea placeholder="Enter any additional details about the lead..." rows={5} focusBorderColor={primaryColor} borderColor={borderColor} fontFamily="var(--font-inter)"/>
            </FormControl>

            <Flex justifyContent="flex-end" mt={6}>
              <Button 
                type="submit" 
                leftIcon={<Icon as={FiSave} />} 
                variant="accent"
                px={8}
                size="lg"
                fontFamily="var(--font-inter)"
              >
                Save Lead
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </AppLayout>
  );
}
