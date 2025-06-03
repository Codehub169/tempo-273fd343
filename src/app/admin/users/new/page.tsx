'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  useToast,
  Divider,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import {
  UserPlus,
  ArrowLeft,
  Save,
  Eye, 
  EyeOff,
} from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';

const NewUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
    status: 'Active',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toast = useToast();
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const primaryColor = "#0056B3";
  const accentColor = "#28A745";

  const headingColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please check and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    // TODO: Add more comprehensive validation
    // In a real application, never log passwords or sensitive data.
    console.log('New User Data (Simulated - contains sensitive info):', formData);
    toast({
      title: 'User Created',
      description: `User ${formData.firstName} ${formData.lastName} has been successfully created (simulated).`,
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top-right',
    });
    // Reset form or redirect (not implemented for this mock)
    // setFormData({ firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: '', status: 'Active' });
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin/users' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Create New User' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Box as="form" onSubmit={handleSubmit}>
        <Flex justify="space-between" align="center" mb={6}>
            <HStack>
                <Icon as={UserPlus} w={8} h={8} color={primaryColor} />
                <VStack align="start" spacing={0}>
                    <Heading as="h1" size="lg" fontFamily="var(--font-poppins)" color={headingColor}>
                        Create New User
                    </Heading>
                    <Text fontSize="sm" color={textColor} fontFamily="var(--font-inter)">
                        Fill in the details to add a new user to the system.
                    </Text>
                </VStack>
            </HStack>
          <HStack spacing={3}>
            <NextLink href="/admin/users" passHref>
              <Button
                as="a"
                leftIcon={<Icon as={ArrowLeft} />}
                variant="outline"
                borderColor={borderColor}
                color={headingColor}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.600')}}
                fontFamily="var(--font-inter)"
              >
                Back to Users
              </Button>
            </NextLink>
            <Button
              type="submit"
              leftIcon={<Icon as={Save} />}
              bg={accentColor}
              color="white"
              _hover={{ bg: '#218838' }}
              fontFamily="var(--font-inter)"
            >
              Save User
            </Button>
          </HStack>
        </Flex>

        <Card bg={cardBg} shadow="xl" borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <CardHeader pb={2}>
            <Heading size="md" fontFamily="var(--font-poppins)" color={headingColor}>User Information</Heading>
          </CardHeader>
          <CardBody pt={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g., Aarav"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={borderColor}
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>Last Name</FormLabel>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g., Sharma"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={borderColor}
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>Email Address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., aarav.sharma@example.com"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={borderColor}
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                />
                <FormHelperText fontFamily="var(--font-inter)" color={textColor}>This will be used for login.</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>Role</FormLabel>
                <Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Select user role"
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={borderColor}
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Sales Representative">Sales Representative</option>
                  <option value="Support Staff">Support Staff</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            
            <Divider my={8} borderColor={borderColor}/>

            <Heading size="md" fontFamily="var(--font-poppins)" color={headingColor} mb={4}>Security & Status</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a strong password"
                    bg={useColorModeValue('white', 'gray.800')}
                    borderColor={borderColor}
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                  />
                  <InputRightElement>
                    <IconButton 
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <EyeOff /> : <Eye />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>Confirm Password</FormLabel>
                 <InputGroup>
                    <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        bg={useColorModeValue('white', 'gray.800')}
                        borderColor={borderColor}
                        _hover={{ borderColor: 'gray.400' }}
                        _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                    />
                    <InputRightElement>
                        <IconButton 
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            icon={showConfirmPassword ? <EyeOff /> : <Eye />}
                            variant="ghost"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel fontFamily="var(--font-inter)" color={headingColor}>Status</FormLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  bg={useColorModeValue('white', 'gray.800')}
                  borderColor={borderColor}
                  _hover={{ borderColor: 'gray.400' }}
                  _focus={{ borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}`}}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </CardBody>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default NewUserPage;
