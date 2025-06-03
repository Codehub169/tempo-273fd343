'use client';

import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonPropsBase, // Renamed to avoid conflict and clarify it's the base
  forwardRef,
  useStyleConfig,
} from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react'; // LucideProps was unused, removed it.
import React, { ReactElement } from 'react';

// Props specific to our custom Button, including the flexible icon types
interface CustomButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'danger' | 'subtle';
  /**
   * Icon to be displayed on the left side of the button.
   * Can be a LucideIcon component type (e.g., FiUser) or a ReactElement (e.g., <FiUser />).
   */
  leftIcon?: LucideIcon | ReactElement;
  /**
   * Icon to be displayed on the right side of the button.
   * Can be a LucideIcon component type or a ReactElement.
   */
  rightIcon?: LucideIcon | ReactElement;
}

// Final props for our Button: combines ChakraButtonProps (excluding original icon props to avoid type conflict)
// with our custom ones that handle LucideIcon types.
export type ButtonProps = Omit<ChakraButtonPropsBase, 'leftIcon' | 'rightIcon'> & CustomButtonOwnProps;

/**
 * Custom Button component built on Chakra UI Button.
 * It supports project-specific variants and styling.
 *
 * @param variant - 'primary', 'secondary', 'accent', 'outline', 'ghost', 'link', 'danger', 'subtle'
 * @param leftIcon - Optional LucideIcon component or ReactElement to display on the left
 * @param rightIcon - Optional LucideIcon component or ReactElement to display on the right
 */
export const Button = forwardRef<ButtonProps, 'button'>(({
  variant = 'primary',
  children,
  leftIcon: customLeftIcon, // Renamed to avoid conflict with ChakraButton's prop pre-Omit
  rightIcon: customRightIcon, // Renamed to avoid conflict
  ...chakraButtonRestProps // These are the Omit<ChakraButtonPropsBase, 'leftIcon' | 'rightIcon'> props
}, ref) => {
  const styles = useStyleConfig('Button', { variant });

  // Helper function to process custom icon props into ReactElements for ChakraButton
  const renderProcessedIcon = (iconInput: LucideIcon | ReactElement | undefined): ReactElement | undefined => {
    if (!iconInput) {
      return undefined;
    }

    // If the input is already a ReactElement (e.g., <FiUser /> or <Icon as={FiUser} />)
    if (React.isValidElement(iconInput)) {
      return iconInput;
    }

    // If the input is a LucideIcon component type (e.g., FiUser)
    // We create an element from it. Lucide icons typically accept a 'size' prop.
    const IconComponent = iconInput as LucideIcon; // Type cast is safe here due to prop types
    
    // Determine icon size based on button size, similar to original logic
    // Access size from chakraButtonRestProps which holds props for ChakraButton
    const buttonSize = chakraButtonRestProps.size;
    let iconPixelSize = 20; // Default for md or unspecified

    if (buttonSize === 'sm') iconPixelSize = 16;
    else if (buttonSize === 'xs') iconPixelSize = 12;
    else if (buttonSize === 'lg') iconPixelSize = 24;
    
    return <IconComponent size={iconPixelSize} />;
  };

  const finalChakraLeftIcon = renderProcessedIcon(customLeftIcon);
  const finalChakraRightIcon = renderProcessedIcon(customRightIcon);

  return (
    <ChakraButton
      ref={ref}
      sx={styles} // Apply custom variant styles primarily through theme
      variant={variant} // Pass Chakra-compatible variant if defined in theme, otherwise handled by sx
      leftIcon={finalChakraLeftIcon} // Pass the processed ReactElement or undefined
      rightIcon={finalChakraRightIcon} // Pass the processed ReactElement or undefined
      fontWeight="medium" // Example base style, ideally from theme.components.Button.baseStyle
      fontFamily="Inter, sans-serif" // Example base style, ideally from theme.components.Button.baseStyle
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'md',
        ...chakraButtonRestProps._hover, // Spread any _hover from passed props, allowing override
      }}
      _active={{
        transform: 'translateY(0px)',
        boxShadow: 'sm',
        ...chakraButtonRestProps._active, // Spread any _active from passed props, allowing override
      }}
      transition="all 0.2s ease-in-out" // Default transition
      {...chakraButtonRestProps} // Spread the rest of the Omit<...> props
    >
      {children}
    </ChakraButton>
  );
});

Button.displayName = 'CustomButton';

// Note: Ensure your Chakra UI theme (e.g., theme.ts or theme/components/button.ts)
// has definitions for variants like 'primary', 'secondary', etc. For example:
/*
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        fontFamily: 'Inter, sans-serif',
        borderRadius: 'md', // e.g., 6px
        transition: 'all 0.2s ease-in-out', // Default transition for all buttons
         _hover: { // Default hover for variants that don't define their own
          transform: 'translateY(-1px)',
          boxShadow: 'md',
        },
        _active: { // Default active for variants that don't define their own
          transform: 'translateY(0px)',
          boxShadow: 'sm',
        },
      },
      variants: {
        primary: {
          bg: '#0056B3', // Primary color from design system
          color: 'white',
          _hover: { 
            bg: '#004494', // Darker shade for primary
            // transform and boxShadow will be inherited from baseStyle if not overridden here
          },
           _active: {
            bg: '#003575',
          }
        },
        secondary: {
          bg: 'gray.100',
          color: 'gray.800',
           _hover: { bg: 'gray.200' },
           _active: { bg: 'gray.300' },
        },
        accent: {
          bg: '#28A745', // Accent color from design system
          color: 'white',
          _hover: { bg: '#218838' },
          _active: { bg: '#1e7e34' },
        },
        outline: {
          border: '1px solid',
          borderColor: '#0056B3', // Primary color
          color: '#0056B3',
          bg: 'transparent',
          _hover: { 
            bg: 'rgba(0, 86, 179, 0.05)', // Light primary background on hover
          },
        },
        ghost: {
          color: '#0056B3', // Primary color
          _hover: {
            bg: 'rgba(0, 86, 179, 0.05)', // Light primary background on hover
          },
        },
        link: {
          color: '#0056B3', // Primary color
          textDecoration: 'underline',
          _hover: {
            color: '#004494', // Darker primary on hover
            textDecoration: 'underline', // Ensure underline persists
          },
        },
        danger: {
          bg: '#DC3545', // Danger color
          color: 'white',
          _hover: { bg: '#c82333' },
          _active: { bg: '#bd2130' },
        },
        subtle: {
          bg: 'gray.50', // A very light gray
          color: 'gray.700',
          _hover: { bg: 'gray.100' },
          _active: { bg: 'gray.200' },
        }
        // Define other variants as needed
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
});
*/
