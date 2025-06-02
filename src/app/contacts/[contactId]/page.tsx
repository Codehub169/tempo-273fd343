'use client';

import { ArrowLeft, Edit3, PlusCircle, Calendar, Briefcase, User, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  VStack,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  Avatar,
  Badge,
  Card, 
  CardBody, 
  CardHeader,
  Link as ChakraLink
} from '@chakra-ui/react';
import AppLayout from '@/components/layouts/AppLayout';
import { Button } from '@/components/ui/Button';
import React from 'react'; // Added React for React.ElementType

// Mock data for a single contact - replace with actual data fetching
const contactData = {
  id: 'contact001',
  firstName: 'Riya',
  lastName: 'Chopra',
  fullName: 'Riya Chopra',
  email: 'riya.chopra@techgen.dev',
  phone: '+91 91234 56789',
  mobile: '+91 81234 56780',
  account: { id: 'acc001', name: 'TechGen Solutions' },
  title: 'Senior Software Engineer',
  department: 'Engineering',
  address: {
    street: 'Plot 45, Infocity',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500081',
    country: 'India',
  },
  createdDate: '2023-05-20',
  lastActivityDate: '2023-11-18',
  description: 'Key contact for Project Alpha. Specialized in backend development with Node.js and Python. Very responsive and technically proficient.',
  activities: [
    { id: 'actC1', type: 'Email', summary: 'Discussed API integration details', date: '2023-11-18', notes: 'Sent over the API documentation.' },
    { id: 'actC2', type: 'Meeting', summary: 'Project Alpha weekly sync', date: '2023-11-15', notes: 'Progress on track, discussed next milestones.' },
    { id: 'actC3', type: 'Call', summary: 'Quick query on data schema', date: '2023-11-10', notes: 'Clarified schema requirements.' },
  ],
  linkedLeads: [
    { id: 'lead005', name: 'Project Alpha - Phase 2', status: 'Proposal' },
    { id: 'lead008', name: 'New Mobile App Development', status: 'Qualification' },
  ]
};

interface ContactDetailPageProps {
  params: { contactId: string };
}

export default function ContactDetailPage({ params }: ContactDetailPageProps) {
  const { contactId } = params;
  // In a real app, you would fetch contactData based on contactId
  const contact = contactData;

  const primaryColor = useColorModeValue('blue.600', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');

  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Contacts', href: '/contacts' },
    { label: contact.fullName }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <VStack spacing={6} align="stretch">
        <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
          {/* Page title/breadcrumbs are handled by AppLayout */}
          <HStack spacing={3} ml={{base: 0, md: 'auto'}} mt={{base: 4, md: 0}}> 
            <Button 
              leftIcon={<Icon as={Edit3} />}
              variant="outline"
              colorScheme="blue"
            >
              Edit Contact
            </Button>
            <Button 
              leftIcon={<Icon as={PlusCircle} />}
              variant="accent"
            >
              Log Activity
            </Button>
          </HStack>
        </Flex>

        <Card variant="outline" bg={cardBg} shadow="sm" borderRadius="md" borderColor={borderColor}>
          <CardHeader pb={2}>
            <Flex alignItems="center">
                <Avatar name={contact.fullName} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.firstName)}+${encodeURIComponent(contact.lastName)}&background=0056B3&color=fff&size=128`} size="lg" mr={4}/>
                <Box>
                    <Heading size="xl" fontFamily="var(--font-poppins)" color={primaryColor}>{contact.fullName}</Heading>
                    <Text fontSize="lg" color={subtleTextColor} fontFamily="var(--font-inter)">
                        {contact.title} at <NextLink href={`/accounts/${contact.account.id}`} passHref legacyBehavior><ChakraLink _hover={{textDecoration:'underline'}} color={primaryColor} fontWeight="medium">{contact.account.name}</ChakraLink></NextLink>
                    </Text>
                </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg:3 }} spacing={6} mb={6}>
              <InfoItem icon={Mail} label="Email" value={contact.email} isLink={`mailto:${contact.email}`} />
              <InfoItem icon={Phone} label="Phone" value={contact.phone} isLink={`tel:${contact.phone}`} />
              <InfoItem icon={Phone} label="Mobile" value={contact.mobile} isLink={`tel:${contact.mobile}`} />
              <InfoItem icon={Briefcase} label="Department" value={contact.department} />
              <InfoItem icon={Calendar} label="Created Date" value={new Date(contact.createdDate).toLocaleDateString()} />
              <InfoItem icon={Calendar} label="Last Activity" value={new Date(contact.lastActivityDate).toLocaleDateString()} />
            </SimpleGrid>

            {contact.address && (
              <Box mb={6}>
                <Heading size="md" fontFamily="var(--font-poppins)" mb={2}>Address</Heading>
                <HStack spacing={2} color={subtleTextColor} fontFamily="var(--font-inter)">
                    <Icon as={MapPin} /> 
                    <Text>{`${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.postalCode}, ${contact.address.country}`}</Text>
                </HStack>
              </Box>
            )}
            
            {contact.description && (
              <Box pt={4} borderTopWidth="1px" borderColor={borderColor}>
                <Heading size="md" fontFamily="var(--font-poppins)" mb={2}>Description / Notes</Heading>
                <Text whiteSpace="pre-wrap" color={subtleTextColor} bg={useColorModeValue('gray.50', 'gray.800')} p={3} borderRadius="md" fontFamily="var(--font-inter)">{contact.description}</Text>
              </Box>
            )}
          </CardBody>
        </Card>

        <Card variant="outline" bg={cardBg} shadow="sm" borderRadius="md" borderColor={borderColor}>
          <CardBody>
            <Tabs variant="enclosed-colored" colorScheme="blue">
              <TabList>
                <Tab _selected={{ color: 'white', bg: primaryColor }} fontWeight="medium" fontFamily="var(--font-inter)">Activities ({contact.activities.length})</Tab>
                <Tab _selected={{ color: 'white', bg: primaryColor }} fontWeight="medium" fontFamily="var(--font-inter)">Linked Leads ({contact.linkedLeads.length})</Tab>
                <Tab _selected={{ color: 'white', bg: primaryColor }} fontWeight="medium" fontFamily="var(--font-inter)">History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Flex justifyContent="space-between" alignItems="center" mb={2}>
                      <Heading size="md" fontFamily="var(--font-poppins)">Recent Activities</Heading>
                      <Button size="sm" variant="outline" colorScheme="blue" leftIcon={<Icon as={PlusCircle}/>}>Add Activity</Button>
                    </Flex>
                    {contact.activities.length > 0 ? (
                      <List spacing={5}>
                        {contact.activities.map(activity => (
                          <ListItem key={activity.id} p={4} borderWidth="1px" borderColor={borderColor} borderRadius="md" _hover={{ shadow: 'md', borderColor: primaryColor }} transition="all 0.2s ease-in-out">
                            <Flex align="center" justify="space-between">
                                <HStack spacing={3}>
                                  <Icon as={getActivityIcon(activity.type)} color={primaryColor} boxSize={6} />
                                  <Box fontFamily="var(--font-inter)">
                                    <Text fontWeight="semibold">{activity.summary}</Text>
                                    <Text fontSize="sm" color={subtleTextColor}>{activity.type} - {new Date(activity.date).toLocaleDateString()}</Text>
                                  </Box>
                                </HStack>
                                <Badge colorScheme={getActivityTypeColor(activity.type)} variant="subtle" fontFamily="var(--font-inter)">{activity.type}</Badge>
                            </Flex>
                            {activity.notes && <Text fontSize="sm" color={subtleTextColor} mt={2} pl={9} fontFamily="var(--font-inter)">{activity.notes}</Text>}
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Text fontFamily="var(--font-inter)">No activities logged for this contact yet.</Text>
                    )}
                  </VStack>
                </TabPanel>
                <TabPanel>
                   <VStack spacing={4} align="stretch">
                    <Heading size="md" fontFamily="var(--font-poppins)" mb={2}>Associated Leads/Deals</Heading>
                    {contact.linkedLeads.length > 0 ? (
                      <List spacing={3}>
                        {contact.linkedLeads.map(lead => (
                          <ListItem key={lead.id} p={3} borderWidth="1px" borderColor={borderColor} borderRadius="md" _hover={{ shadow: 'sm', borderColor: primaryColor}} transition="all 0.2s ease-in-out">
                            <Flex justifyContent="space-between" alignItems="center">
                              <NextLink href={`/leads/${lead.id}`} passHref legacyBehavior>
                                <ChakraLink fontWeight="medium" color={primaryColor} _hover={{textDecoration: 'underline'}} fontFamily="var(--font-inter)">{lead.name}</ChakraLink>
                              </NextLink>
                              <Tag colorScheme={getLeadStatusColorScheme(lead.status)} size="sm" fontFamily="var(--font-inter)">{lead.status}</Tag>
                            </Flex>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Text fontFamily="var(--font-inter)">No leads associated with this contact.</Text>
                    )}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Text fontFamily="var(--font-inter)">Placeholder for contact history and audit trail.</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        <NextLink href="/contacts" passHref>
          <Button leftIcon={<Icon as={ArrowLeft} />} variant="ghost" colorScheme="blue" mt={4}>
            Back to All Contacts
          </Button>
        </NextLink>
      </VStack>
    </AppLayout>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  isLink?: string;
}

const InfoItem = ({ icon, label, value, isLink }: InfoItemProps) => {
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');
  const primaryColor = useColorModeValue('blue.600', 'blue.300');
  return (
    <HStack spacing={3} align="start" fontFamily="var(--font-inter)">
      <Icon as={icon} boxSize={5} color={primaryColor} mt={1} />
      <Box>
        <Text fontSize="sm" color={subtleTextColor} fontWeight="medium">{label}</Text>
        {isLink ? (
          <NextLink href={isLink} passHref legacyBehavior>
            <ChakraLink target={isLink.startsWith('mailto:') || isLink.startsWith('tel:') ? '_self' : '_blank'} fontWeight="semibold" _hover={{ textDecoration: 'underline', color: primaryColor }}>{value}</ChakraLink>
          </NextLink>
        ) : (
          <Text fontWeight="semibold">{value}</Text>
        )}
      </Box>
    </HStack>
  );
};

const getActivityIcon = (type: string) => {
  if (type === 'Call') return Phone;
  if (type === 'Email') return Mail;
  if (type === 'Meeting') return User;
  return MessageSquare;
};

const getActivityTypeColor = (type: string) => {
  if (type === 'Call') return 'teal';
  if (type === 'Email') return 'cyan';
  if (type === 'Meeting') return 'purple';
  return 'gray';
};

const getLeadStatusColorScheme = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'gray';
      case 'qualification': return 'yellow';
      case 'proposal': return 'orange';
      case 'negotiation': return 'purple';
      case 'closed won': return 'green';
      case 'closed lost': return 'red';
      default: return 'blue';
    }
};
