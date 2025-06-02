'use client';

import { ArrowLeft, Edit3, PlusCircle, Calendar, DollarSign, Briefcase, User, Phone, Mail, Info, ListChecks, MessageSquare } from 'lucide-react';
import NextLink from 'next/link';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
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
  ListIcon,
  Badge,
} from '@chakra-ui/react';

// Mock data for a single lead - replace with actual data fetching
const leadData = {
  id: 'lead123',
  name: 'Innovatech Solutions Project',
  company: 'Innovatech Ltd.',
  potentialValue: 50000,
  status: 'Qualification',
  contactPerson: 'Priya Sharma',
  email: 'priya.sharma@innovatech.com',
  phone: '+91 98765 43210',
  assignedTo: 'Rohan Kumar',
  createdDate: '2023-10-15',
  lastContactedDate: '2023-11-05',
  notes: 'Initial discussion positive. Interested in our AI solutions. Follow-up meeting scheduled for next week. Needs a detailed proposal on cloud migration services.',
  source: 'Website Inquiry',
  activities: [
    { id: 'act1', type: 'Call', summary: 'Initial discovery call', date: '2023-11-05', notes: 'Discussed needs, seemed interested.' },
    { id: 'act2', type: 'Email', summary: 'Sent follow-up material', date: '2023-11-06', notes: 'Included case studies.' },
    { id: 'act3', type: 'Meeting', summary: 'Demo of Product X', date: '2023-11-10', notes: 'Positive feedback, asked about pricing.' },
  ],
};

interface LeadDetailPageProps {
  params: { leadId: string };
}

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { leadId } = params;
  // In a real app, you would fetch leadData based on leadId
  const lead = leadData; 

  const primaryColor = useColorModeValue('blue.600', 'blue.300');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const accentColor = "#28A745"; // Green for positive actions
  const subtleTextColor = useColorModeValue('gray.600', 'gray.400');

  const getStatusColorScheme = (status: string) => {
    switch (status) {
      case 'New': return 'gray';
      case 'Qualification': return 'yellow';
      case 'Proposal': return 'orange';
      case 'Negotiation': return 'purple';
      case 'Closed Won': return 'green';
      case 'Closed Lost': return 'red';
      default: return 'blue';
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Breadcrumbs and Header */}
        <Flex justifyContent="space-between" alignItems="center">
          <Breadcrumb spacing="8px" separator={<Icon as={Info} color="gray.500" />}>
            <BreadcrumbItem>
              <NextLink href="/dashboard" passHref>
                <BreadcrumbLink>Dashboard</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <NextLink href="/leads" passHref>
                <BreadcrumbLink>Leads</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`/leads/${lead.id}`} fontWeight="medium" color={primaryColor}>{lead.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <HStack spacing={3}>
            <Button 
              leftIcon={<Icon as={Edit3} />} 
              colorScheme="blue" 
              variant="outline"
              _hover={{ bg: 'blue.50', shadow: 'sm' }}
            >
              Edit Lead
            </Button>
            <Button 
              leftIcon={<Icon as={PlusCircle} />} 
              bg={accentColor} 
              color="white"
              _hover={{ bg: 'green.600', shadow: 'md' }}
            >
              Log Activity
            </Button>
          </HStack>
        </Flex>

        {/* Lead Overview Card */}
        <Card variant="outline" bg={cardBg} shadow="sm" borderRadius="md">
          <CardHeader pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="lg" fontFamily="Poppins, sans-serif" color={primaryColor}>{lead.name}</Heading>
              <Tag size="lg" colorScheme={getStatusColorScheme(lead.status)} variant="solid" borderRadius="full">
                {lead.status}
              </Tag>
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize="lg" color={subtleTextColor} mb={4}>Managed by: <Text as="span" fontWeight="semibold" color={useColorModeValue('gray.700', 'gray.200')}>{lead.assignedTo}</Text></Text>
            <SimpleGrid columns={{ base: 1, md: 2, lg:3 }} spacing={6}>
              <InfoItem icon={Briefcase} label="Company" value={lead.company} />
              <InfoItem icon={DollarSign} label="Potential Value" value={`₹${lead.potentialValue.toLocaleString('en-IN')}`} />
              <InfoItem icon={User} label="Contact Person" value={lead.contactPerson} />
              <InfoItem icon={Mail} label="Email" value={lead.email} isLink={`mailto:${lead.email}`} />
              <InfoItem icon={Phone} label="Phone" value={lead.phone} isLink={`tel:${lead.phone}`} />
              <InfoItem icon={Calendar} label="Created Date" value={new Date(lead.createdDate).toLocaleDateString()} />
              <InfoItem icon={Info} label="Source" value={lead.source} />
              <InfoItem icon={Calendar} label="Last Contacted" value={new Date(lead.lastContactedDate).toLocaleDateString()} />
            </SimpleGrid>
            
            {lead.notes && (
              <Box mt={6} pt={4} borderTopWidth="1px" borderColor={borderColor}>
                <Heading size="md" fontFamily="Poppins, sans-serif" mb={2}>Notes</Heading>
                <Text whiteSpace="pre-wrap" color={subtleTextColor} bg={useColorModeValue('gray.50', 'gray.800')} p={3} borderRadius="md">{lead.notes}</Text>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Tabs for Activities, Related Contacts, etc. */}
        <Card variant="outline" bg={cardBg} shadow="sm" borderRadius="md">
          <CardBody>
            <Tabs variant="enclosed-colored" colorScheme="blue">
              <TabList>
                <Tab _selected={{ color: 'white', bg: primaryColor }} fontWeight="medium">Activities ({lead.activities.length})</Tab>
                <Tab _selected={{ color: 'white', bg: primaryColor }} fontWeight="medium">Related Contacts</Tab>
                <Tab _selected={{ color: 'white', bg: primaryColor }} fontWeight="medium">History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Flex justifyContent="space-between" alignItems="center" mb={2}>
                      <Heading size="md" fontFamily="Poppins, sans-serif">Recent Activities</Heading>
                      <Button size="sm" variant="outline" colorScheme="blue" leftIcon={<Icon as={PlusCircle}/>}>Add Activity</Button>
                    </Flex>
                    {lead.activities.length > 0 ? (
                      <List spacing={5}>
                        {lead.activities.map(activity => (
                          <ListItem key={activity.id} p={4} borderWidth="1px" borderColor={borderColor} borderRadius="md" _hover={{ shadow: 'md', borderColor: primaryColor }} transition="all 0.2s ease-in-out">
                            <Flex align="center" justify="space-between">
                                <HStack spacing={3}>
                                  <Icon as={getActivityIcon(activity.type)} color={primaryColor} boxSize={6} />
                                  <Box>
                                    <Text fontWeight="semibold">{activity.summary}</Text>
                                    <Text fontSize="sm" color={subtleTextColor}>{activity.type} - {new Date(activity.date).toLocaleDateString()}</Text>
                                  </Box>
                                </HStack>
                                <Badge colorScheme={getActivityTypeColor(activity.type)} variant="subtle">{activity.type}</Badge>
                            </Flex>
                            {activity.notes && <Text fontSize="sm" color={subtleTextColor} mt={2} pl={9}>{activity.notes}</Text>}
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Text>No activities logged for this lead yet.</Text>
                    )}
                  </VStack>
                </TabPanel>
                <TabPanel>
                  <Text>Placeholder for related contacts information.</Text>
                  {/* Example: <RelatedContactsList leadId={lead.id} /> */}
                </TabPanel>
                <TabPanel>
                  <Text>Placeholder for lead history and audit trail.</Text>
                  {/* Example: <LeadHistory leadId={lead.id} /> */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        <NextLink href="/leads" passHref>
          <Button leftIcon={<Icon as={ArrowLeft} />} variant="ghost" colorScheme="blue" mt={4}>
            Back to All Leads
          </Button>
        </NextLink>
      </VStack>
    </Container>
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
    <HStack spacing={3} align="start">
      <Icon as={icon} boxSize={5} color={primaryColor} mt={1} />
      <Box>
        <Text fontSize="sm" color={subtleTextColor} fontWeight="medium">{label}</Text>
        {isLink ? (
          <NextLink href={isLink} passHref target="_blank">
            <Text fontWeight="semibold" _hover={{ textDecoration: 'underline', color: primaryColor }}>{value}</Text>
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