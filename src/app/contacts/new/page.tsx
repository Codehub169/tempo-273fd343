'use client';

import NextLink from 'next/link';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Icon,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  useColorModeValue,
  SimpleGrid,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import React from 'react'; // Imported React for React.FormEvent

export default function NewContactPage() {
  const primaryColor = useColorModeValue('blue.600', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    accountId: '', 
    department: '',
    title: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual form submission logic
    // TODO: Add more robust validation here (e.g., for phone, postalCode)
    console.log('Form submitted:', formData);
    toast({
      title: 'Contact Created.',
      description: `${formData.firstName} ${formData.lastName} has been successfully added.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    // Reset form or redirect user, e.g., router.push('/contacts')
  };

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Contacts', href: '/contacts' },
    { label: 'New Contact' }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <VStack spacing={6} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="xl" fontFamily="var(--font-poppins)" color={primaryColor} display="flex" alignItems="center">
            <Icon as={UserPlus} mr={3} boxSize={8}/> Create New Contact
          </Heading>
          <NextLink href="/contacts" passHref>
            <Button as="a" leftIcon={<Icon as={ArrowLeft} />} variant="outline" colorScheme="blue" _hover={{ bg: useColorModeValue('blue.50', 'gray.700') }}>
              Back to Contacts
            </Button>
          </NextLink>
        </Flex>

        <Box as="form" onSubmit={handleSubmit} bg={cardBg} p={{base: 6, md: 8}} shadow="xl" borderRadius="lg" borderColor={borderColor} borderWidth={1}>
          <VStack spacing={6} align="stretch">
            
            <Heading size="lg" fontFamily="var(--font-poppins)" pb={2} borderBottomWidth="1px" borderColor={borderColor}>Contact Information</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName" fontFamily="var(--font-inter)">First Name</FormLabel>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g., Priya" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastName" fontFamily="var(--font-inter)">Last Name</FormLabel>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g., Sharma" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email" fontFamily="var(--font-inter)">Email Address</FormLabel>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g., priya.sharma@example.com" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone" fontFamily="var(--font-inter)">Phone Number</FormLabel>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g., +91 98765 43210" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="mobile" fontFamily="var(--font-inter)">Mobile Number</FormLabel>
                <Input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="e.g., +91 87654 32109" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="accountId" fontFamily="var(--font-inter)">Account (Company)</FormLabel>
                <Select id="accountId" name="accountId" value={formData.accountId} onChange={handleChange} placeholder="Select account" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)">
                  <option value="acc123">Innovatech Ltd.</option>
                  <option value="acc456">Tech Solutions Inc.</option>
                </Select>
                <FormHelperText fontFamily="var(--font-inter)">Link this contact to an existing company account.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="title" fontFamily="var(--font-inter)">Job Title</FormLabel>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Marketing Manager" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="department" fontFamily="var(--font-inter)">Department</FormLabel>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Sales & Marketing" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
            </SimpleGrid>

            <Divider my={4}/>

            <Heading size="lg" fontFamily="var(--font-poppins)" pb={2} borderBottomWidth="1px" borderColor={borderColor}>Address Details</Heading>
            <FormControl>
              <FormLabel htmlFor="street" fontFamily="var(--font-inter)">Street Address</FormLabel>
              <Input id="street" name="street" value={formData.street} onChange={handleChange} placeholder="e.g., 123 MG Road" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <FormControl>
                <FormLabel htmlFor="city" fontFamily="var(--font-inter)">City</FormLabel>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="e.g., Bangalore" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="state" fontFamily="var(--font-inter)">State / Province</FormLabel>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="e.g., Karnataka" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="postalCode" fontFamily="var(--font-inter)">Postal Code</FormLabel>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="e.g., 560001" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
              </FormControl>
            </SimpleGrid>
             <FormControl>
                <FormLabel htmlFor="country" fontFamily="var(--font-inter)">Country</FormLabel>
                <Select id="country" name="country" value={formData.country} onChange={handleChange} _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)">
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                </Select>
            </FormControl>

            <Divider my={4}/>

            <Heading size="lg" fontFamily="var(--font-poppins)" pb={2} borderBottomWidth="1px" borderColor={borderColor}>Additional Information</Heading>
            <FormControl>
              <FormLabel htmlFor="description" fontFamily="var(--font-inter)">Description / Notes</FormLabel>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Any additional notes about this contact..." rows={4} _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}} fontFamily="var(--font-inter)"/>
            </FormControl>

            <HStack justifyContent="flex-end" spacing={4} mt={6}>
              <NextLink href="/contacts" passHref>
                <Button as="a" variant="outline" colorScheme="gray">Cancel</Button>
              </NextLink>
              <Button 
                type="submit" 
                leftIcon={<Icon as={Save} />}
                variant="accent"
              >
                Save Contact
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </AppLayout>
  );
}
