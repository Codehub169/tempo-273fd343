'use client'

import NextLink from 'next/link'
import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
  useToast,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Divider,
  Checkbox
} from '@chakra-ui/react'
import { ChevronRightIcon, ArrowLeftIcon, SaveIcon, BuildingIcon } from 'lucide-react'
import { useState, ChangeEvent, FormEvent } from 'react'

interface AccountFormData {
  accountName: string;
  industry: string;
  type: string;
  website: string;
  phone: string;
  annualRevenue: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingPostalCode: string;
  billingCountry: string;
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  description: string;
  copyBillingAddress: boolean;
}

export default function NewAccountPage() {
  const toast = useToast()
  const [formData, setFormData] = useState<AccountFormData>({
    accountName: '',
    industry: '',
    type: '',
    website: '',
    phone: '',
    annualRevenue: '',
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: 'India',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingPostalCode: '',
    shippingCountry: 'India',
    description: '',
    copyBillingAddress: false,
  });

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => {
        const updatedData = { ...prev, [name]: checked };
        if (name === 'copyBillingAddress' && checked) {
          return {
            ...updatedData,
            shippingStreet: prev.billingStreet,
            shippingCity: prev.billingCity,
            shippingState: prev.billingState,
            shippingPostalCode: prev.billingPostalCode,
            shippingCountry: prev.billingCountry,
          };
        }
        return updatedData;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Placeholder for API call
    console.log('Account Data:', formData)
    toast({
      title: 'Account Created',
      description: `${formData.accountName} has been successfully created. (Mock)`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    })
    // Reset form or redirect
  }

  return (
    <Box p={8} bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={6}>
        <BreadcrumbItem>
          <NextLink href="/dashboard" passHref>
            <BreadcrumbLink>Dashboard</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href="/accounts" passHref>
            <BreadcrumbLink>Accounts</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">New Account</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex mb={8} alignItems="center">
         <Icon as={BuildingIcon} w={8} h={8} color="blue.500" mr={3} />
        <Heading as="h1" size="xl" fontFamily="Poppins, sans-serif" color={useColorModeValue('gray.700', 'white')}>Create New Account</Heading>
        <Spacer />
        <NextLink href="/accounts" passHref>
          <Button as="a" leftIcon={<ArrowLeftIcon size={18} />} variant="outline" colorScheme="gray">
            Back to Accounts
          </Button>
        </NextLink>
      </Flex>

      <Box bg={cardBg} p={{ base: 6, md: 8 }} borderRadius="lg" shadow="xl" borderWidth="1px" borderColor={borderColor}>
        <form onSubmit={handleSubmit}>
          <Heading as="h2" size="lg" fontFamily="Poppins, sans-serif" mb={6} pb={2} borderBottomWidth="1px" borderColor={borderColor}>Account Information</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <FormControl isRequired>
              <FormLabel>Account Name</FormLabel>
              <Input name="accountName" value={formData.accountName} onChange={handleChange} placeholder="e.g., Acme Corporation" />
            </FormControl>
            <FormControl>
              <FormLabel>Industry</FormLabel>
              <Select name="industry" value={formData.industry} onChange={handleChange} placeholder="Select industry">
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Select name="type" value={formData.type} onChange={handleChange} placeholder="Select account type">
                <option value="Prospect">Prospect</option>
                <option value="Customer">Customer</option>
                <option value="Partner">Partner</option>
                <option value="Vendor">Vendor</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input name="website" type="url" value={formData.website} onChange={handleChange} placeholder="e.g., https://acme.com" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
            </FormControl>
            <FormControl>
              <FormLabel>Annual Revenue (INR)</FormLabel>
              <Input name="annualRevenue" type="number" value={formData.annualRevenue} onChange={handleChange} placeholder="e.g., 5000000" />
            </FormControl>
          </SimpleGrid>

          <Divider my={8} />
          <Heading as="h2" size="lg" fontFamily="Poppins, sans-serif" mb={6} pb={2} borderBottomWidth="1px" borderColor={borderColor}>Address Information</Heading>
          
          <Heading as="h3" size="md" fontFamily="Inter, sans-serif" mb={4} color={useColorModeValue('gray.600', 'gray.300')}>Billing Address</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <FormControl>
              <FormLabel>Street</FormLabel>
              <Input name="billingStreet" value={formData.billingStreet} onChange={handleChange} placeholder="123 Main St" />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input name="billingCity" value={formData.billingCity} onChange={handleChange} placeholder="Mumbai" />
            </FormControl>
            <FormControl>
              <FormLabel>State / Province</FormLabel>
              <Input name="billingState" value={formData.billingState} onChange={handleChange} placeholder="Maharashtra" />
            </FormControl>
            <FormControl>
              <FormLabel>Postal Code</FormLabel>
              <Input name="billingPostalCode" value={formData.billingPostalCode} onChange={handleChange} placeholder="400001" />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select name="billingCountry" value={formData.billingCountry} onChange={handleChange}>
                <option value="India">India</option>
                {/* Add other countries as needed */}
              </Select>
            </FormControl>
          </SimpleGrid>

          <Heading as="h3" size="md" fontFamily="Inter, sans-serif" mt={8} mb={4} color={useColorModeValue('gray.600', 'gray.300')}>Shipping Address</Heading>
          <Checkbox name="copyBillingAddress" isChecked={formData.copyBillingAddress} onChange={handleChange} mb={4}>
            Same as Billing Address
          </Checkbox>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <FormControl>
              <FormLabel>Street</FormLabel>
              <Input name="shippingStreet" value={formData.shippingStreet} onChange={handleChange} placeholder="123 Main St" isDisabled={formData.copyBillingAddress} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input name="shippingCity" value={formData.shippingCity} onChange={handleChange} placeholder="Mumbai" isDisabled={formData.copyBillingAddress} />
            </FormControl>
            <FormControl>
              <FormLabel>State / Province</FormLabel>
              <Input name="shippingState" value={formData.shippingState} onChange={handleChange} placeholder="Maharashtra" isDisabled={formData.copyBillingAddress} />
            </FormControl>
            <FormControl>
              <FormLabel>Postal Code</FormLabel>
              <Input name="shippingPostalCode" value={formData.shippingPostalCode} onChange={handleChange} placeholder="400001" isDisabled={formData.copyBillingAddress} />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select name="shippingCountry" value={formData.shippingCountry} onChange={handleChange} isDisabled={formData.copyBillingAddress}>
                <option value="India">India</option>
                {/* Add other countries as needed */}
              </Select>
            </FormControl>
          </SimpleGrid>

          <Divider my={8} />
          <Heading as="h2" size="lg" fontFamily="Poppins, sans-serif" mb={6} pb={2} borderBottomWidth="1px" borderColor={borderColor}>Additional Information</Heading>
          <FormControl mb={8}>
            <FormLabel>Description / Notes</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter any additional details about the account..." rows={5} />
          </FormControl>

          <Flex justifyContent="flex-end">
            <Button type="submit" colorScheme="blue" leftIcon={<SaveIcon size={18} />} size="lg" boxShadow="md" _hover={{ bg: 'blue.600' }}>
              Save Account
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
