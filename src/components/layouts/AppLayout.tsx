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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  BoxProps, 
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
  const linkTextColor = useColorModeValue('gray.700', 'gray.200');
  const hoverLinkTextColor = useColorModeValue('gray.800', 'gray.100');
  const iconHoverColor = useColorModeValue('gray.600', 'gray.300');

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
        color={isActive ? activeColor : linkTextColor}
        _hover={{
          bg: isActive ? activeBg : hoverBg,
          color: isActive ? activeColor : hoverLinkTextColor,
        }}
        transition=".15s ease-in-out"
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            _groupHover={{
              color: isActive ? activeColor : iconHoverColor,
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

const LinkItems: Array<{ name: string; icon: IconType; href: string }> = [
  { name: 'Dashboard', icon: FiHome, href: '/dashboard' },
  { name: 'Leads', icon: FiTrendingUp, href: '/leads' },
  { name: 'Contacts', icon: FiUsers, href: '/contacts' },
  { name: 'Accounts', icon: FiBriefcase, href: '/accounts' },
  { name: 'Activities', icon: FiActivity, href: '/activities' },
  { name: 'Users', icon: FiUserPlus, href: '/admin/users' },
  { name: 'Settings', icon: FiSettings, href: '/settings' }, 
];

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
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
        <NextLink href="/dashboard" passHref>
          <HStack as="a" spacing={2} _hover={{ textDecoration: 'none' }}>
            <Icon as={FiGrid} w={8} h={8} color="blue.500" />
            <Text fontSize="2xl" fontFamily="var(--font-poppins)" fontWeight="bold" color="#0056B3">
              CRM
            </Text>
          </HStack>
        </NextLink>
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

interface MobileNavProps extends BoxProps {
  onOpen: () => void;
  pageTitle?: string;
  breadcrumbs?: Array<{ href?: string; label: string }>;
}

const MobileNav = ({ onOpen, pageTitle, breadcrumbs, ...rest }: MobileNavProps) => {
  const menuBg = useColorModeValue('white', 'gray.900');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.700');
  const breadcrumbCurrentPageColor = useColorModeValue('gray.800', 'white');
  const breadcrumbLinkColor = useColorModeValue('gray.600', 'gray.300');
  const breadcrumbHoverColor = "#0056B3";
  const pageTitleColor = useColorModeValue('gray.800', 'white');
  const mobileCrmTextColor = "#0056B3";
  const userMenuTextColor = useColorModeValue('gray.700', 'gray.200');
  const userMenuRoleColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-start' }} // Changed to flex-start for md to align breadcrumbs left
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="Open Menu"
        icon={<FiMenu />}
      />

      <HStack spacing={2} display={{ base: 'none', md: 'flex' }} flexGrow={1}>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumb separator='/' fontWeight='medium' fontSize='md'>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index} isCurrentPage={index === breadcrumbs.length - 1}>
                {crumb.href ? (
                  <BreadcrumbLink 
                    as={NextLink} 
                    href={crumb.href} 
                    _hover={{ color: breadcrumbHoverColor, textDecoration: 'underline'}} 
                    color={breadcrumbLinkColor}
                    fontFamily="var(--font-inter)"
                  >
                    {crumb.label}
                  </BreadcrumbLink>
                ) : (
                  <Text color={breadcrumbCurrentPageColor} fontFamily="var(--font-inter)">{crumb.label}</Text>
                )}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        ) : pageTitle ? (
            <Heading as="h1" size="lg" fontFamily="var(--font-poppins)" color={pageTitleColor}>
                {pageTitle}
            </Heading>
        ) : null}
      </HStack>
      
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="var(--font-poppins)"
        fontWeight="bold"
        color={mobileCrmTextColor}
        flexGrow={{ base: 1, md: 0 }} // Allow CRM title to take space on mobile
        textAlign={{ base: 'center', md: 'left'}}
      >
        CRM
      </Text>

      <HStack spacing={{ base: '3', md: '6' }} ml={{ base: 0, md: 'auto' }}> {/* Added ml:auto for md */} 
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="View Notifications"
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
                  name={'Admin User'} // Placeholder - Should be dynamic
                  src={'https://bit.ly/broken-link'} // Placeholder - Should be dynamic & validated
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm" fontFamily="var(--font-inter)" color={userMenuTextColor}>Admin User</Text> {/* Placeholder */}
                  <Text fontSize="xs" color={userMenuRoleColor} fontFamily="var(--font-inter)">
                    Administrator
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={menuBg}
              borderColor={menuBorderColor}
              zIndex="popover" // Ensure menu is above other content
            >
              <MenuItem fontFamily="var(--font-inter)" as={NextLink} href="/profile">Profile</MenuItem>
              <MenuItem fontFamily="var(--font-inter)" as={NextLink} href="/settings">Settings</MenuItem>
              <MenuDivider />
              {/* Add actual sign out logic here */}
              <MenuItem icon={<FiLogOut />} color="red.500" fontFamily="var(--font-inter)" onClick={() => alert('Sign out clicked (placeholder)')}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default function AppLayout({ children, pageTitle, breadcrumbs }: AppLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainBg = useColorModeValue('#F8F9FA', 'gray.800');
  
  return (
    <Box minH="100vh" bg={mainBg}>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
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
      <MobileNav onOpen={onOpen} pageTitle={pageTitle} breadcrumbs={breadcrumbs} />
      <Box ml={{ base: 0, md: 60 }} p="6" pt="8">
        <Container maxW="container.xl" px={0}>
         {children}
        </Container>
      </Box>
    </Box>
  );
}
