'use client';

import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SimpleGrid,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { ArrowLeft, Save, Users, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function NewContactPage() {
  const primaryColor = useColorModeValue('blue.600', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = "#28A745";
  const toast = useToast();

  // Form state - in a real app, this would be more robust with validation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    accountId: '', // Link to an existing account
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

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header and Breadcrumbs */}
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Breadcrumb spacing="8px" separator={<Icon as={Users} color="gray.500" />}>
              <BreadcrumbItem>
                <NextLink href="/dashboard" passHref>
                  <BreadcrumbLink>Dashboard</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <NextLink href="/contacts" passHref>
                  <BreadcrumbLink>Contacts</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="/contacts/new" fontWeight="medium" color={primaryColor}>New Contact</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading as="h1" size="xl" fontFamily="Poppins, sans-serif" mt={2} color={primaryColor} display="flex" alignItems="center">
              <Icon as={UserPlus} mr={3} boxSize={8}/> Create New Contact
            </Heading>
          </Box>
          <NextLink href="/contacts" passHref>
            <Button leftIcon={<Icon as={ArrowLeft} />} variant="outline" colorScheme="blue" _hover={{ bg: 'blue.50' }}>
              Back to Contacts
            </Button>
          </NextLink>
        </Flex>

        {/* Form Card */}
        <Box as="form" onSubmit={handleSubmit} bg={cardBg} p={{base: 6, md: 8}} shadow="xl" borderRadius="lg" borderColor={borderColor} borderWidth={1}>
          <VStack spacing={6} align="stretch">
            
            <Heading size="lg" fontFamily="Poppins, sans-serif" pb={2} borderBottomWidth="1px" borderColor={borderColor}>Contact Information</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g., Priya" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g., Sharma" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g., priya.sharma@example.com" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g., +91 98765 43210" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                <Input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="e.g., +91 87654 32109" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="accountId">Account (Company)</FormLabel>
                <Select id="accountId" name="accountId" value={formData.accountId} onChange={handleChange} placeholder="Select account" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}>
                  {/* Populate with actual accounts data */}
                  <option value="acc123">Innovatech Ltd.</option>
                  <option value="acc456">Tech Solutions Inc.</option>
                </Select>
                <FormHelperText>Link this contact to an existing company account.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="title">Job Title</FormLabel>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Marketing Manager" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="department">Department</FormLabel>
                <Input id="department" name="department" value={formData.department} onChange={handleChange} placeholder="e.g., Sales & Marketing" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
            </SimpleGrid>

            <Divider my={4}/>

            <Heading size="lg" fontFamily="Poppins, sans-serif" pb={2} borderBottomWidth="1px" borderColor={borderColor}>Address Details</Heading>
            <FormControl>
              <FormLabel htmlFor="street">Street Address</FormLabel>
              <Input id="street" name="street" value={formData.street} onChange={handleChange} placeholder="e.g., 123 MG Road" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <FormControl>
                <FormLabel htmlFor="city">City</FormLabel>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="e.g., Bangalore" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="state">State / Province</FormLabel>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="e.g., Karnataka" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="e.g., 560001" _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
              </FormControl>
            </SimpleGrid>
             <FormControl>
                <FormLabel htmlFor="country">Country</FormLabel>
                <Select id="country" name="country" value={formData.country} onChange={handleChange} _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}>
                    <option value="India">India</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    {/* Add more countries as needed */}
                </Select>
            </FormControl>

            <Divider my={4}/>

            <Heading size="lg" fontFamily="Poppins, sans-serif" pb={2} borderBottomWidth="1px" borderColor={borderColor}>Additional Information</Heading>
            <FormControl>
              <FormLabel htmlFor="description">Description / Notes</FormLabel>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Any additional notes about this contact..." rows={4} _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}/>
            </FormControl>

            <HStack justifyContent="flex-end" spacing={4} mt={6}>
              <NextLink href="/contacts" passHref>
                <Button variant="outline" colorScheme="gray">Cancel</Button>
              </NextLink>
              <Button 
                type="submit" 
                leftIcon={<Icon as={Save} />} 
                bg={accentColor} 
                color="white"
                _hover={{ bg: 'green.600', shadow: 'md' }}
              >
                Save Contact
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
