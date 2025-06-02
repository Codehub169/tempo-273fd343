'use client';

import { Button as ChakraButton, ButtonProps as ChakraButtonProps, forwardRef, useStyleConfig } from '@chakra-ui/react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface ButtonProps extends ChakraButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'danger' | 'subtle';
  leftIcon?: LucideIcon | React.ReactElement;
  rightIcon?: LucideIcon | React.ReactElement;
}

/**
 * Custom Button component built on Chakra UI Button.
 * It supports project-specific variants and styling.
 *
 * @param variant - 'primary', 'secondary', 'accent', 'outline', 'ghost', 'link', 'danger', 'subtle'
 * @param leftIcon - Optional LucideIcon or ReactElement to display on the left
 * @param rightIcon - Optional LucideIcon or ReactElement to display on the right
 */
export const Button = forwardRef<ButtonProps, 'button'>(({ variant = 'primary', children, leftIcon, rightIcon, ...props }, ref) => {
  const styles = useStyleConfig('Button', { variant });

  const renderIcon = (IconComponent: LucideIcon | React.ReactElement | undefined) => {
    if (!IconComponent) return null;
    if (React.isValidElement(IconComponent)) {
      return React.cloneElement(IconComponent as React.ReactElement, { style: { marginRight: children ? '0.5rem' : '0', marginLeft: children ? '0.5rem' : '0' }});
    }
    const Icon = IconComponent as LucideIcon;
    return <Icon size={props.size === 'sm' ? 16 : 20} />;
  };

  return (
    <ChakraButton
      ref={ref}
      sx={styles} // Apply custom variant styles primarily through theme
      variant={variant} // Pass Chakra-compatible variant if defined in theme, otherwise handled by sx
      leftIcon={leftIcon && React.isValidElement(leftIcon) ? leftIcon : (leftIcon ? renderIcon(leftIcon) : undefined)}
      rightIcon={rightIcon && React.isValidElement(rightIcon) ? rightIcon : (rightIcon ? renderIcon(rightIcon) : undefined)}
      fontWeight="medium"
      fontFamily="Inter, sans-serif"
      _hover={{
        transform: 'translateY(-1px)',
        boxShadow: 'md',
        ...props._hover,
      }}
      _active={{
        transform: 'translateY(0px)',
        boxShadow: 'sm',
        ...props._active,
      }}
      transition="all 0.2s ease-in-out"
      {...props}
    >
      {children}
    </ChakraButton>
  );
});

// It's recommended to define these variants in the Chakra UI theme for better reusability and consistency.
// For example, in your theme.ts or theme/components/button.ts:
/*
const Button = {
  baseStyle: {
    fontWeight: 'medium',
    fontFamily: 'Inter, sans-serif',
    borderRadius: 'md', // e.g., 6px
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    primary: {
      bg: '#0056B3',
      color: 'white',
      _hover: {
        bg: '#004494',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        bg: '#003575',
        transform: 'translateY(0px)',
        boxShadow: 'sm',
      }
    },
    accent: {
      bg: '#28A745',
      color: 'white',
      _hover: {
        bg: '#218838',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        bg: '#1e7e34',
        transform: 'translateY(0px)',
        boxShadow: 'sm',
      }
    },
    secondary: {
      bg: 'gray.100',
      color: 'gray.700',
      _hover: {
        bg: 'gray.200',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        bg: 'gray.300',
        transform: 'translateY(0px)',
        boxShadow: 'sm',
      }
    },
    outline: {
      border: '1px solid',
      borderColor: '#0056B3',
      color: '#0056B3',
      bg: 'transparent',
      _hover: {
        bg: 'rgba(0, 86, 179, 0.05)',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        bg: 'rgba(0, 86, 179, 0.1)',
        transform: 'translateY(0px)',
        boxShadow: 'sm',
      }
    },
    ghost: {
      bg: 'transparent',
      color: '#0056B3',
      _hover: {
        bg: 'rgba(0, 86, 179, 0.05)',
      },
    },
    link: {
      bg: 'transparent',
      color: '#0056B3',
      textDecoration: 'underline',
      _hover: {
        color: '#004494',
      },
    },
    danger: {
      bg: '#DC3545',
      color: 'white',
      _hover: {
        bg: '#c82333',
        transform: 'translateY(-1px)',
        boxShadow: 'md',
      },
      _active: {
        bg: '#bd2130',
        transform: 'translateY(0px)',
        boxShadow: 'sm',
      }
    },
    subtle: {
      bg: '#F8F9FA', // Secondary color from palette
      color: '#343A40', // Dark text
      border: '1px solid #DEE2E6', // Border color
      _hover: {
        bg: '#E9ECEF',
        borderColor: '#CED4DA',
        transform: 'translateY(-1px)',
        boxShadow: 'sm',
      },
      _active: {
        bg: '#DEE2E6',
        transform: 'translateY(0px)',
      }
    }
  },
  defaultProps: {
    variant: 'primary',
  },
};

export default Button;
*/
