'use client';

import { Box, Flex, Heading, Text, VStack, FormControl, FormLabel, Input, Button, Link, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiLogIn, FiUser, FiLock } from 'react-icons/fi'; // Using react-icons as a placeholder for icon library

export default function LoginPage() {
  // Define colors based on the theme (light/dark mode)
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const formBgColor = useColorModeValue('white', 'gray.800');
  const primaryColor = "#0056B3"; // Primary color from design system
  const accentColor = "#28A745"; // Accent color from design system
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const headingColor = useColorModeValue('gray.800', 'white');

  return (
    <Flex 
      minH="100vh" 
      align="center" 
      justify="center" 
      bgGradient={`linear(to-br, ${primaryColor}, ${accentColor})`} // Engaging gradient background
      p={4}
    >
      <Box 
        maxW="md" 
        w="full" 
        bg={formBgColor} 
        boxShadow="2xl" // Sophisticated shadow for depth
        rounded="xl" // Modern rounded corners
        p={{ base: 6, md: 10 }}
        textAlign="center"
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            {/* Placeholder for a logo or app icon */}
            <Icon as={FiLogIn} w={16} h={16} color={primaryColor} mx="auto" mb={4} />
            <Heading as="h1" size="xl" fontWeight="bold" color={headingColor} fontFamily="Poppins, sans-serif">
              Welcome Back
            </Heading>
            <Text color={textColor} fontSize="lg" mt={2} fontFamily="Inter, sans-serif">
              Sign in to access your CRM Dashboard.
            </Text>
          </Box>

          {/* Placeholder for LoginForm component */}
          <Box as="form" mt={8}>
            <VStack spacing={5}>
              <FormControl id="email">
                <FormLabel display="flex" alignItems="center" color={textColor} fontFamily="Inter, sans-serif">
                  <Icon as={FiUser} mr={2} color={primaryColor}/>
                  Email Address
                </FormLabel>
                <Input 
                  type="email" 
                  placeholder="your.email@company.com"
                  focusBorderColor={primaryColor}
                  borderColor={useColorModeValue('gray.300', 'gray.600')}
                  rounded="md"
                  _hover={{ borderColor: useColorModeValue('gray.400', 'gray.500') }}
                  py={6} // Increased padding for better touch
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel display="flex" alignItems="center" color={textColor} fontFamily="Inter, sans-serif">
                  <Icon as={FiLock} mr={2} color={primaryColor}/>
                    Password
                  </FormLabel>
                <Input 
                  type="password" 
                  placeholder="Enter your password"
                  focusBorderColor={primaryColor}
                  borderColor={useColorModeValue('gray.300', 'gray.600')}
                  rounded="md"
                  _hover={{ borderColor: useColorModeValue('gray.400', 'gray.500') }}
                  py={6} // Increased padding for better touch
                />
              </FormControl>
              <Button 
                w="full" 
                bg={primaryColor} 
                color="white" 
                _hover={{ bg: '#004494' }} // Darker shade on hover
                rounded="md"
                size="lg"
                fontSize="md"
                fontWeight="semibold"
                fontFamily="Poppins, sans-serif"
                boxShadow="md"
                transition="background-color 0.2s ease-in-out"
                py={6} // Increased padding
              >
                Sign In
              </Button>
            </VStack>
          </Box>
          {/* End of LoginForm placeholder */}

          <Text textAlign="center" color={textColor} fontFamily="Inter, sans-serif" mt={4}>
            Forgot your password?{' '}
            <Link color={primaryColor} href="#" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
              Reset it here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}
