'use client';

import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Drawer,
  DrawerContent,
  useDisclosure,
  IconButton,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Heading,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiActivity,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiBell,
  FiLogOut,
  FiUserPlus,
  FiGrid
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  icon: IconType;
  children: ReactNode;
  href: string;
}

const NavItem = ({ icon, children, href }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
  const activeBg = useColorModeValue('blue.500', 'blue.300');
  const activeColor = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Box
        as="a"
        display="flex"
        alignItems="center"
        p="3"
        mx="4"
        my="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? activeBg : 'transparent'}
        color={isActive ? activeColor : useColorModeValue('gray.700', 'gray.200')}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
          color: isActive ? activeColor : useColorModeValue('gray.800', 'gray.100'),
        }}
        transition=".15s ease-in-out"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: isActive ? activeColor : useColorModeValue('gray.600', 'gray.300'),
            }}
            as={icon}
          />
        )}
        {children}
      </Box>
    </NextLink>
  );
};

interface AppLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  breadcrumbs?: Array<{ href?: string; label: string }>;
}

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
  { name: 'Leads', icon: FiTrendingUp, href: '/leads' },
  { name: 'Contacts', icon: FiUsers, href: '/contacts' },
  { name: 'Accounts', icon: FiBriefcase, href: '/accounts' },
  { name: 'Activities', icon: FiActivity, href: '/activities' },
  { name: 'Users', icon: FiUserPlus, href: '/admin/users' }, // Changed icon and path for admin/users
  { name: 'Settings', icon: FiSettings, href: '/settings' }, // Placeholder
];

const SidebarContent = ({ onClose, ...rest }: { onClose: () => void }) => {
  return (
    <Box
      transition=".3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <HStack spacing={2}>
           <Icon as={FiGrid} w={8} h={8} color="blue.500" />
           <Text fontSize="2xl" fontFamily="Poppins, sans-serif" fontWeight="bold" color="#0056B3">
            CRM
           </Text>
        </HStack>
        {/* <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} /> */}
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const MobileNav = ({ onOpen, pageTitle, breadcrumbs, ...rest }: { onOpen: () => void; pageTitle?: string; breadcrumbs?: Array<{ href?: string; label: string }> }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={2} display={{ base: 'none', md: 'flex' }} flexGrow={1}>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumb separator='/' fontWeight='medium' fontSize='md'>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index} isCurrentPage={index === breadcrumbs.length - 1}>
                {crumb.href ? (
                  <BreadcrumbLink as={NextLink} href={crumb.href} _hover={{ color: '#0056B3', textDecoration: 'underline'}} color="gray.600">
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <Text color="#343A40">{crumb.label}</Text>
                )}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        ) : pageTitle ? (
            <Heading as="h1" size="lg" fontFamily="Poppins, sans-serif" color="#343A40">
                {pageTitle}
            </Heading>
        ) : null}
      </HStack>
      
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="Poppins, sans-serif"
        fontWeight="bold"
        color="#0056B3"
      >
        CRM
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  name={'Admin User'} // Placeholder
                  src={'https://bit.ly/broken-link'} // Placeholder
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm" fontFamily="Inter, sans-serif">Admin User</Text> {/* Placeholder */}
                  <Text fontSize="xs" color="gray.600" fontFamily="Inter, sans-serif">
                    Administrator
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem fontFamily="Inter, sans-serif">Profile</MenuItem>
              <MenuItem fontFamily="Inter, sans-serif">Settings</MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} color="red.500" fontFamily="Inter, sans-serif">Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default function AppLayout({ children, pageTitle, breadcrumbs }: AppLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box minH="100vh" bg={useColorModeValue('#F8F9FA', 'gray.800')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
      <Box ml={{ base: 0, md: 60 }} p="6" pt="8">
        <Container maxW="container.xl" p={0}>
         {children}
        </Container>
      </Box>
    </Box>
  );
}
