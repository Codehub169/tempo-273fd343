'use client';

import React from 'react';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Box,
  Text,
  Skeleton,
  Icon,
  TableProps as ChakraTableProps,
  TableColumnHeaderProps as ThProps,
  TableCellProps as TdProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { Database } from 'lucide-react';

export interface ColumnDefinition<T> {
  accessor: keyof T | string; // Can be a key or a custom accessor string for nested or computed values
  header: string;
  cell?: (item: T, index: number) => React.ReactNode;
  headerProps?: ThProps;
  cellProps?: TdProps;
  isNumeric?: boolean;
}

interface CustomTableProps<T> extends ChakraTableProps {
  columns: ColumnDefinition<T>[];
  data: T[];
  isLoading?: boolean;
  loadingRowCount?: number;
  emptyState?: React.ReactNode;
  caption?: string;
  onRowClick?: (item: T) => void;
}

/**
 * A reusable and styled Table component for displaying tabular data.
 * Features loading state (skeleton), empty state, and customizable columns.
 */
export function CustomTable<T extends { id?: string | number }>({ 
  columns,
  data,
  isLoading = false,
  loadingRowCount = 5,
  emptyState,
  caption,
  onRowClick,
  variant = 'simple',
  size = 'md',
  // colorScheme prop is inherited from ChakraTableProps via ...rest
  ...rest
}: CustomTableProps<T>) {

  const getNestedValue = (obj: any, path: string | keyof T): any => {
    const pathString = String(path); // Ensure path is a string for split
    return pathString.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Theme-aware color definitions
  const headerBgColor = useColorModeValue('gray.50', 'gray.800');
  const headerTextColor = useColorModeValue('gray.600', 'gray.300');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.700');
  const tableContainerBgColor = useColorModeValue('white', 'gray.700');
  const rowHoverBgColor = useColorModeValue('gray.100', 'gray.600');
  const cellTextColor = useColorModeValue('gray.700', 'gray.200');
  const captionColor = useColorModeValue('gray.700', 'gray.200');
  const defaultEmptyStateBg = useColorModeValue('gray.50', 'gray.800');
  const defaultEmptyStateBorderColor = useColorModeValue('gray.200', 'gray.700');

  const defaultEmptyState = (
    <Box 
      textAlign="center" 
      p={10} 
      borderWidth="1px" 
      borderRadius="md" 
      borderColor={defaultEmptyStateBorderColor} 
      bg={defaultEmptyStateBg}
    >
      <Icon as={Database} boxSize={12} color="gray.400" mb={4} />
      <Text fontSize="xl" fontWeight="medium" color={useColorModeValue('gray.600', 'gray.300')}>No Data Available</Text>
      <Text color={useColorModeValue('gray.500', 'gray.400')}>There is no data to display at the moment.</Text>
    </Box>
  );

  if (isLoading) {
    return (
      <TableContainer>
        <ChakraTable variant={variant} size={size} {...rest}>
          {caption && <TableCaption placement="top">{caption}</TableCaption>}
          <Thead bg={headerBgColor}>
            <Tr>
              {columns.map((col, index) => (
                <Th 
                  key={`header-${index}-${col.accessor.toString()}`} 
                  {...col.headerProps} 
                  isNumeric={col.isNumeric} 
                  fontFamily="var(--font-poppins)" 
                  fontWeight="semibold" 
                  color={headerTextColor} 
                  textTransform="uppercase" 
                  letterSpacing="wider"
                  borderColor={tableBorderColor}
                >
                  {col.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(loadingRowCount)].map((_, rowIndex) => (
              <Tr key={`skeleton-row-${rowIndex}`}>
                {columns.map((col, cellIndex) => (
                  <Td key={`skeleton-cell-${rowIndex}-${cellIndex}-${col.accessor.toString()}`} borderColor={tableBorderColor}>
                    <Skeleton height="20px" />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    );
  }

  if (data.length === 0) {
    return emptyState || defaultEmptyState;
  }

  return (
    <TableContainer borderWidth="1px" borderColor={tableBorderColor} borderRadius="lg" bg={tableContainerBgColor} boxShadow="sm">
      <ChakraTable variant={variant} size={size} {...rest}>
        {caption && 
          <TableCaption 
            placement="top" 
            fontWeight="medium" 
            fontFamily="var(--font-poppins)" 
            fontSize="lg" 
            color={captionColor} 
            m={0} 
            p={4} 
            borderBottomWidth="1px" 
            borderColor={tableBorderColor}
          >
            {caption}
          </TableCaption>}
        <Thead bg={headerBgColor}>
          <Tr>
            {columns.map((col, index) => (
              <Th 
                key={`header-${index}-${col.accessor.toString()}`} 
                {...col.headerProps} 
                isNumeric={col.isNumeric} 
                fontFamily="var(--font-poppins)" 
                fontWeight="semibold" 
                color={headerTextColor} 
                fontSize="sm"
                py={4}
                px={6}
                textTransform="uppercase"
                letterSpacing="wider"
                borderBottomWidth="2px"
                borderColor={tableBorderColor}
              >
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, rowIndex) => (
            <Tr 
              key={item.id || `row-${rowIndex}`} 
              _hover={{ bg: rowHoverBgColor, cursor: onRowClick ? 'pointer' : 'default'}}
              onClick={() => onRowClick && onRowClick(item)}
              transition="background-color 0.2s ease-in-out"
            >
              {columns.map((col, cellIndex) => (
                <Td 
                  key={`cell-${rowIndex}-${cellIndex}-${col.accessor.toString()}`} 
                  {...col.cellProps} 
                  isNumeric={col.isNumeric}
                  fontFamily="var(--font-inter)"
                  fontSize="sm"
                  color={cellTextColor}
                  py={4}
                  px={6}
                  borderBottomWidth="1px"
                  borderColor={tableBorderColor}
                >
                  {col.cell ? col.cell(item, rowIndex) : String(getNestedValue(item, col.accessor) ?? '')}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
