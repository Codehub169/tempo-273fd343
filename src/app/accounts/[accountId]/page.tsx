'use client'

import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
  Tag,
  Avatar,
  HStack,
  VStack,
  Icon,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon,
  Link,
  IconButton
} from '@chakra-ui/react'
import {
  ChevronRightIcon,
  EditIcon,
  PlusIcon,
  BuildingIcon,
  UsersIcon,
  BriefcaseIcon,
  DollarSignIcon,
  GlobeIcon,
  PhoneIcon,
  MapPinIcon,
  FileTextIcon,
  MessageSquareIcon,
  CalendarDaysIcon,
  MailIcon,
  UserPlusIcon,
  ExternalLinkIcon
} from 'lucide-react'
import { useParams } from 'next/navigation'

// Mock data - replace with actual data fetching
const mockAccount = {
  id: 'acc_001',
  name: 'Innovatech Solutions Ltd.',
  industry: 'Information Technology',
  type: 'Customer',
  website: 'https://innovatech.example.com',
  phone: '+91 98765 43210',
  annualRevenue: 5000000,
  employees: 150,
  description: 'A leading provider of innovative IT solutions, specializing in cloud computing and AI-driven analytics. Strong partnership potential.',
  billingAddress: {
    street: '123 Tech Park Road',
    city: 'Bangalore',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India',
  },
  shippingAddress: {
    street: '123 Tech Park Road',
    city: 'Bangalore',
    state: 'Karnataka',
    postalCode: '560001',
    country: 'India',
  },
  dateCreated: '2022-08-15T10:00:00Z',
  lastActivityDate: '2023-10-25T14:30:00Z',
  primaryContact: { id: 'cont_001', name: 'Priya Sharma', title: 'CEO', avatar: 'https://i.pravatar.cc/150?u=priya' },
};

const mockContacts = [
  { id: 'cont_001', name: 'Priya Sharma', title: 'CEO', email: 'priya.sharma@innovatech.com', phone: '+91 98765 43210' },
  { id: 'cont_002', name: 'Arjun Mehta', title: 'CTO', email: 'arjun.mehta@innovatech.com', phone: '+91 98765 43211' },
  { id: 'cont_003', name: 'Sneha Reddy', title: 'Sales Director', email: 'sneha.reddy@innovatech.com', phone: '+91 98765 43212' },
];

const mockLeads = [
  { id: 'lead_001', name: 'Project Alpha Implementation', stage: 'Proposal Sent', value: 50000, closeDate: '2023-12-15' },
  { id: 'lead_002', name: 'Cloud Migration Services', stage: 'Negotiation', value: 75000, closeDate: '2024-01-30' },
];

const mockActivities = [
  { id: 'act_001', type: 'Call', subject: 'Introductory Call with Priya', date: '2023-10-25', user: 'Sales Rep A', notes: 'Discussed potential collaboration.' },
  { id: 'act_002', type: 'Email', subject: 'Follow-up on Proposal', date: '2023-10-20', user: 'Sales Rep B', notes: 'Sent proposal details.' },
  { id: 'act_003', type: 'Meeting', subject: 'Product Demo with Arjun', date: '2023-10-15', user: 'Sales Rep A', notes: 'Showcased new features.' },
];

const InfoItem = ({ icon, label, value, isLink = false, href = '#' }: { icon: React.ElementType, label: string, value?: string | number | null, isLink?: boolean, href?: string }) => {
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  if (!value) return null;
  return (
    <HStack spacing={3} align="start">
      <Icon as={icon} color="blue.500" mt={1} boxSize={5} />
      <Box>
        <Text fontSize="sm" color={labelColor} fontWeight="medium">{label}</Text>
        {isLink ? (
          <Link href={href} color="blue.500" _hover={{ textDecoration: 'underline' }} isExternal={href.startsWith('http')}>
            <Text fontWeight="medium" color={textColor}>{value}</Text>
          </Link>
        ) : (
          <Text fontWeight="medium" color={textColor}>{value}</Text>
        )}
      </Box>
    </HStack>
  );
};

const getActivityIcon = (type: string) => {
  if (type === 'Call') return PhoneIcon;
  if (type === 'Email') return MailIcon;
  if (type === 'Meeting') return UsersIcon;
  return MessageSquareIcon; // Default for Notes etc.
};

export default function AccountDetailPage() {
  const params = useParams();
  const accountId = params.accountId as string;
  // In a real app, fetch account data using accountId
  const account = mockAccount; // Using mock data

  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');

  if (!account) {
    return <Box p={8}>Account not found.</Box>;
  }

  return (
    <Box p={8} bg={useColorModeValue('gray.50', 'gray.800')} minH="100vh">
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={6}>
        <BreadcrumbItem>
          <NextLink href="/dashboard" passHref><BreadcrumbLink>Dashboard</BreadcrumbLink></NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href="/accounts" passHref><BreadcrumbLink>Accounts</BreadcrumbLink></NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{account.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex mb={6} alignItems={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }}>
        <HStack mb={{ base: 4, md: 0 }}>
            <Icon as={BuildingIcon} w={10} h={10} color="blue.500" />
            <Box>
                <Heading as="h1" size="xl" fontFamily="Poppins, sans-serif" color={useColorModeValue('gray.700', 'white')}>{account.name}</Heading>
                <Text color={subtleTextColor}>Account ID: {account.id}</Text>
            </Box>
        </HStack>
        <Spacer />
        <HStack spacing={3}>
          <Button leftIcon={<EditIcon size={18} />} variant="outline" colorScheme="yellow">
            Edit Account
          </Button>
          <Button leftIcon={<PlusIcon size={18} />} colorScheme="teal">
            Log Activity
          </Button>
           <Button leftIcon={<UserPlusIcon size={18} />} colorScheme="purple">
            Add Contact
          </Button>
        </HStack>
      </Flex>

      <Card bg={cardBg} shadow="xl" borderWidth="1px" borderColor={borderColor} borderRadius="lg" mb={8}>
        <CardHeader pb={2}>
          <Heading size="md" fontFamily="Poppins, sans-serif">Account Overview</Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <InfoItem icon={BriefcaseIcon} label="Industry" value={account.industry} />
            <InfoItem icon={UsersIcon} label="Type" value={account.type} />
            <InfoItem icon={DollarSignIcon} label="Annual Revenue" value={account.annualRevenue ? `INR ${account.annualRevenue.toLocaleString('en-IN')}` : 'N/A'} />
            <InfoItem icon={GlobeIcon} label="Website" value={account.website} isLink href={account.website} />
            <InfoItem icon={PhoneIcon} label="Phone" value={account.phone} />
            <InfoItem icon={UsersIcon} label="Employees" value={account.employees?.toString()} />
            <InfoItem icon={MapPinIcon} label="Billing Address" value={`${account.billingAddress.street}, ${account.billingAddress.city}, ${account.billingAddress.state} ${account.billingAddress.postalCode}, ${account.billingAddress.country}`} />
            <InfoItem icon={MapPinIcon} label="Shipping Address" value={`${account.shippingAddress.street}, ${account.shippingAddress.city}, ${account.shippingAddress.state} ${account.shippingAddress.postalCode}, ${account.shippingAddress.country}`} />
            <InfoItem icon={CalendarDaysIcon} label="Date Created" value={new Date(account.dateCreated).toLocaleDateString()} />
            <InfoItem icon={CalendarDaysIcon} label="Last Activity" value={new Date(account.lastActivityDate).toLocaleDateString()} />
          </SimpleGrid>
          {account.description && (
            <Box mt={6} pt={4} borderTopWidth="1px" borderColor={borderColor}>
                <Heading size="sm" fontFamily="Inter, sans-serif" mb={2} color={useColorModeValue('gray.600', 'gray.300')}>Description</Heading>
                <Text color={subtleTextColor}>{account.description}</Text>
            </Box>
          )}
        </CardBody>
      </Card>

      <Tabs variant="enclosed-colored" colorScheme="blue" borderRadius="lg" bg={cardBg} shadow="xl" borderWidth="1px" borderColor={borderColor}>
        <TabList borderTopRadius="lg">
          <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontWeight="medium">Contacts ({mockContacts.length})</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontWeight="medium">Leads/Opportunities ({mockLeads.length})</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontWeight="medium">Activities ({mockActivities.length})</Tab>
        </TabList>
        <TabPanels borderBottomRadius="lg">
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {mockContacts.map(contact => (
                <Box key={contact.id} p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor} _hover={{ shadow: 'md', borderColor: 'blue.300' }}>
                  <Flex justify="space-between" align="center">
                    <HStack>
                        <Avatar size="md" name={contact.name} src={`https://i.pravatar.cc/150?u=${contact.email}`} />
                        <Box>
                            <NextLink href={`/contacts/${contact.id}`} passHref>
                                <Link fontWeight="bold" color="blue.500" _hover={{textDecoration: 'underline'}}>{contact.name}</Link>
                            </NextLink>
                            <Text fontSize="sm" color={subtleTextColor}>{contact.title}</Text>
                        </Box>
                    </HStack>
                    <VStack align="end" spacing={0}>
                         <Text fontSize="sm" color={subtleTextColor}>{contact.email}</Text>
                         <Text fontSize="sm" color={subtleTextColor}>{contact.phone}</Text>
                    </VStack>
                    <NextLink href={`/contacts/${contact.id}`} passHref>
                         <IconButton icon={<ExternalLinkIcon size={18}/>} aria-label="View Contact" variant="ghost" size="sm" />
                    </NextLink>
                  </Flex>
                </Box>
              ))}
              {mockContacts.length === 0 && <Text>No contacts associated with this account.</Text>}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {mockLeads.map(lead => (
                <Box key={lead.id} p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor} _hover={{ shadow: 'md', borderColor: 'blue.300' }}>
                  <Flex justify="space-between" align="center">
                    <Box>
                      <NextLink href={`/leads/${lead.id}`} passHref>
                         <Link fontWeight="bold" color="blue.500" _hover={{textDecoration: 'underline'}}>{lead.name}</Link>
                      </NextLink>
                      <Text fontSize="sm" color={subtleTextColor}>Value: INR {lead.value.toLocaleString('en-IN')}</Text>
                    </Box>
                    <Tag colorScheme={lead.stage === 'Proposal Sent' ? 'orange' : 'purple'} size="sm" borderRadius="full">{lead.stage}</Tag>
                    <Text fontSize="sm" color={subtleTextColor}>Close Date: {new Date(lead.closeDate).toLocaleDateString()}</Text>
                     <NextLink href={`/leads/${lead.id}`} passHref>
                         <IconButton icon={<ExternalLinkIcon size={18}/>} aria-label="View Lead" variant="ghost" size="sm" />
                    </NextLink>
                  </Flex>
                </Box>
              ))}
              {mockLeads.length === 0 && <Text>No leads/opportunities associated with this account.</Text>}
            </VStack>
          </TabPanel>
          <TabPanel>
            <List spacing={5}>
              {mockActivities.map(activity => (
                <ListItem key={activity.id} display="flex" alignItems="center" p={3} borderWidth="1px" borderRadius="md" borderColor={borderColor} _hover={{ shadow: 'md', borderColor: 'blue.300' }}>
                  <ListIcon as={getActivityIcon(activity.type)} color="blue.500" boxSize={6} />
                  <Box flexGrow={1} ml={3}>
                    <Text fontWeight="medium">{activity.subject}</Text>
                    <Text fontSize="sm" color={subtleTextColor}>Type: {activity.type} | Date: {new Date(activity.date).toLocaleDateString()} | By: {activity.user}</Text>
                    {activity.notes && <Text fontSize="xs" color={subtleTextColor} mt={1}>Notes: {activity.notes}</Text>}
                  </Box>
                </ListItem>
              ))}
              {mockActivities.length === 0 && <Text>No activities recorded for this account.</Text>}
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
