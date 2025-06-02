'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button as ChakraButton,
  VStack,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Heading,
  Icon,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { Button } from '@/components/ui/Button'; // Custom Button
import { Briefcase, User, DollarSign, Mail, Phone, ListChecks, Users, Info } from 'lucide-react';

export interface LeadFormData {
  id?: string;
  leadName: string;
  companyName: string;
  potentialValue: number | string; // string for input, number for submission
  contactPerson: string;
  email: string;
  phone: string;
  leadStatus: string; // e.g., 'New', 'Contacted', 'Qualified', 'Lost'
  assignedTo: string; // User ID or name
  notes?: string;
}

interface LeadFormProps {
  initialData?: LeadFormData;
  onSubmit: (data: LeadFormData) => Promise<void>;
  isLoading?: boolean;
  onCancel?: () => void;
}

const leadStatusOptions = [
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Proposal Sent', label: 'Proposal Sent' },
  { value: 'Negotiation', label: 'Negotiation' },
  { value: 'Won', label: 'Won' },
  { value: 'Lost', label: 'Lost' },
];

// Placeholder for users - in a real app, this would come from API/context
const assignableUsers = [
  { id: 'user1', name: 'Sales Rep A' },
  { id: 'user2', name: 'Sales Rep B' },
  { id: 'user3', name: 'Sales Manager' },
];

export const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, isLoading, onCancel }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    leadName: '',
    companyName: '',
    potentialValue: '',
    contactPerson: '',
    email: '',
    phone: '',
    leadStatus: 'New',
    assignedTo: assignableUsers[0]?.id || '', // Default to first user or empty
    notes: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const toast = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeadFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNumberChange = (valueAsString: string, valueAsNumber: number) => {
    setFormData(prev => ({ ...prev, potentialValue: valueAsString })); // Keep string for input control
     if (errors.potentialValue) {
      setErrors(prev => ({ ...prev, potentialValue: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};
    if (!formData.leadName.trim()) newErrors.leadName = 'Lead name is required.';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.leadStatus) newErrors.leadStatus = 'Lead status is required.';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned user is required.';
    if (formData.potentialValue && isNaN(Number(formData.potentialValue))) {
        newErrors.potentialValue = 'Potential value must be a number.';
    } else if (formData.potentialValue && Number(formData.potentialValue) < 0) {
        newErrors.potentialValue = 'Potential value cannot be negative.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: 'Validation Error',
        description: 'Please check the form for errors.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }
    await onSubmit({ 
        ...formData, 
        potentialValue: formData.potentialValue ? parseFloat(String(formData.potentialValue)) : 0 
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="lg" fontFamily="Poppins, sans-serif" borderBottomWidth="2px" borderColor="gray.200" pb={3} mb={2}>
          {initialData?.id ? 'Edit Lead' : 'Create New Lead'}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isRequired isInvalid={!!errors.leadName}>
            <FormLabel htmlFor="leadName" fontWeight="semibold" color="gray.600">
              <Icon as={User} mr={2} verticalAlign="middle" /> Lead Name
            </FormLabel>
            <Input id="leadName" name="leadName" value={formData.leadName} onChange={handleChange} placeholder="e.g., John Doe" variant="filled" _focus={{ borderColor: '#0056B3' }} />
            {errors.leadName && <FormErrorMessage>{errors.leadName}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.companyName}>
            <FormLabel htmlFor="companyName" fontWeight="semibold" color="gray.600">
              <Icon as={Briefcase} mr={2} verticalAlign="middle" /> Company Name
            </FormLabel>
            <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g., Acme Corp" variant="filled" _focus={{ borderColor: '#0056B3' }} />
            {errors.companyName && <FormErrorMessage>{errors.companyName}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.potentialValue}>
            <FormLabel htmlFor="potentialValue" fontWeight="semibold" color="gray.600">
              <Icon as={DollarSign} mr={2} verticalAlign="middle" /> Potential Value (INR)
            </FormLabel>
            <NumberInput 
              id="potentialValue" 
              name="potentialValue" 
              value={formData.potentialValue} 
              onChange={handleNumberChange} 
              precision={2} 
              step={1000}
              min={0}
              variant="filled"
            >
              <NumberInputField placeholder="e.g., 50000" _focus={{ borderColor: '#0056B3' }}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors.potentialValue && <FormErrorMessage>{errors.potentialValue}</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="contactPerson" fontWeight="semibold" color="gray.600">
              <Icon as={User} mr={2} verticalAlign="middle" /> Contact Person
            </FormLabel>
            <Input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="e.g., Jane Smith" variant="filled" _focus={{ borderColor: '#0056B3' }} />
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel htmlFor="email" fontWeight="semibold" color="gray.600">
              <Icon as={Mail} mr={2} verticalAlign="middle" /> Email Address
            </FormLabel>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g., contact@example.com" variant="filled" _focus={{ borderColor: '#0056B3' }} />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="phone" fontWeight="semibold" color="gray.600">
              <Icon as={Phone} mr={2} verticalAlign="middle" /> Phone Number
            </FormLabel>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g., +91 98765 43210" variant="filled" _focus={{ borderColor: '#0056B3' }} />
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.leadStatus}>
            <FormLabel htmlFor="leadStatus" fontWeight="semibold" color="gray.600">
              <Icon as={ListChecks} mr={2} verticalAlign="middle" /> Lead Status
            </FormLabel>
            <Select id="leadStatus" name="leadStatus" value={formData.leadStatus} onChange={handleChange} variant="filled" _focus={{ borderColor: '#0056B3' }}>
              {leadStatusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
            {errors.leadStatus && <FormErrorMessage>{errors.leadStatus}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.assignedTo}>
            <FormLabel htmlFor="assignedTo" fontWeight="semibold" color="gray.600">
              <Icon as={Users} mr={2} verticalAlign="middle" /> Assigned To
            </FormLabel>
            <Select id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} variant="filled" _focus={{ borderColor: '#0056B3' }}>
              {assignableUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </Select>
            {errors.assignedTo && <FormErrorMessage>{errors.assignedTo}</FormErrorMessage>}
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel htmlFor="notes" fontWeight="semibold" color="gray.600">
            <Icon as={Info} mr={2} verticalAlign="middle" /> Notes / Description
          </FormLabel>
          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Enter any additional information about the lead..." rows={5} variant="filled" _focus={{ borderColor: '#0056B3' }} />
        </FormControl>

        <Flex justifyContent="flex-end" gap={4} mt={4}>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} isDisabled={isLoading}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="accent" isLoading={isLoading} leftIcon={<Icon as={initialData?.id ? User : ListChecks} size="1.2em" />}>
            {initialData?.id ? 'Save Changes' : 'Create Lead'}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
