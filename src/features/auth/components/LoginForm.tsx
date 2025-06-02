'use client';

import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  VStack,
  Text,
  Link as ChakraLink,
  FormErrorMessage,
  useToast,
  Icon,
  Flex
} from '@chakra-ui/react';
import { Button } from '@/components/ui/Button'; // Custom Button
import NextLink from 'next/link';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  initialEmail?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, initialEmail = '' }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: initialEmail,
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.password) newErrors.password = 'Password is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please check your email and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={6} align="stretch">
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" fontWeight="medium" color="gray.700">
            <Icon as={Mail} mr={2} verticalAlign="middle" color="#0056B3" /> Email Address
          </FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            variant="filled"
            bg="gray.50"
            _hover={{ bg: 'gray.100' }}
            _focus={{ borderColor: '#0056B3', bg: 'white', boxShadow: `0 0 0 1px #0056B3` }}
            borderRadius="md"
            size="lg"
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" fontWeight="medium" color="gray.700">
            <Icon as={Lock} mr={2} verticalAlign="middle" color="#0056B3" /> Password
          </FormLabel>
          <InputGroup size="lg">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              variant="filled"
              bg="gray.50"
              _hover={{ bg: 'gray.100' }}
              _focus={{ borderColor: '#0056B3', bg: 'white', boxShadow: `0 0 0 1px #0056B3` }}
              borderRadius="md"
            />
            <InputRightElement width="4.5rem">
              <Button 
                h="1.75rem" 
                size="sm" 
                onClick={() => setShowPassword(!showPassword)} 
                variant="ghost"
                colorScheme="blue"
              >
                {showPassword ? <Icon as={EyeOff} /> : <Icon as={Eye} />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
        </FormControl>

        <Flex justifyContent="space-between" alignItems="center" mt={1}>
          <FormControl display="flex" alignItems="center" width="auto">
            <Checkbox 
              id="rememberMe" 
              name="rememberMe" 
              isChecked={formData.rememberMe} 
              onChange={handleChange}
              colorScheme="blue"
              borderColor="gray.400"
            >
              <Text fontSize="sm" color="gray.600">Remember me</Text>
            </Checkbox>
          </FormControl>
          <ChakraLink as={NextLink} href="/forgot-password" fontSize="sm" color="#0056B3" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
            Forgot password?
          </ChakraLink>
        </Flex>

        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isLoading} 
          width="100%" 
          size="lg"
          leftIcon={<Icon as={LogIn} size="1.2em"/>}
          mt={4}
          boxShadow="0 4px 14px 0 rgba(0, 86, 179, 0.39)"
          _hover={{
            boxShadow: "0 6px 16px 0 rgba(0, 86, 179, 0.45)",
            transform: 'translateY(-2px)'
          }}
        >
          Sign In
        </Button>

        <Text textAlign="center" fontSize="sm" color="gray.600" mt={2}>
          Don&apos;t have an account?{' '}
          <ChakraLink as={NextLink} href="/signup" color="#0056B3" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
            Sign Up
          </ChakraLink>
        </Text>
      </VStack>
    </Box>
  );
};
