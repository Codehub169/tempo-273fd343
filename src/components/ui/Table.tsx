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
  Stack,
  Icon,
  TableProps as ChakraTableProps,
  ThProps,
  TdProps,
} from '@chakra-ui/react';
import { AlertTriangle, Database } from 'lucide-react'; // Example icons

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
  colorScheme = 'gray',
  ...rest
}: CustomTableProps<T>) {

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const defaultEmptyState = (
    <Box textAlign="center" p={10} borderWidth="1px" borderRadius="md" borderColor="gray.200" bg="gray.50">
      <Icon as={Database} boxSize={12} color="gray.400" mb={4} />
      <Text fontSize="xl" fontWeight="medium" color="gray.600">No Data Available</Text>
      <Text color="gray.500">There is no data to display at the moment.</Text>
    </Box>
  );

  if (isLoading) {
    return (
      <TableContainer>
        <ChakraTable variant={variant} size={size} colorScheme={colorScheme} {...rest}>
          {caption && <TableCaption placement="top">{caption}</TableCaption>}
          <Thead bg="#F8F9FA">
            <Tr>
              {columns.map((col, index) => (
                <Th key={`header-${index}`} {...col.headerProps} isNumeric={col.isNumeric} fontFamily="Poppins, sans-serif" fontWeight="semibold" color="#343A40" textTransform="uppercase" letterSpacing="wider">
                  {col.header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(loadingRowCount)].map((_, rowIndex) => (
              <Tr key={`skeleton-row-${rowIndex}`}>
                {columns.map((_, cellIndex) => (
                  <Td key={`skeleton-cell-${rowIndex}-${cellIndex}`}>
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
    <TableContainer borderWidth="1px" borderColor="#DEE2E6" borderRadius="lg" bg="white" boxShadow="sm">
      <ChakraTable variant={variant} size={size} colorScheme={colorScheme} {...rest}>
        {caption && <TableCaption placement="top" fontWeight="medium" fontFamily="Poppins, sans-serif" fontSize="lg" color="#343A40" m={0} p={4} borderBottomWidth="1px" borderColor="#DEE2E6">{caption}</TableCaption>}
        <Thead bg="#F8F9FA">
          <Tr>
            {columns.map((col, index) => (
              <Th 
                key={`header-${index}`} 
                {...col.headerProps} 
                isNumeric={col.isNumeric} 
                fontFamily="Poppins, sans-serif" 
                fontWeight="semibold" 
                color="#343A40" 
                fontSize="sm"
                py={4}
                px={6}
                textTransform="uppercase"
                letterSpacing="wider"
                borderBottomWidth="2px"
                borderColor="#DEE2E6"
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
              _hover={{ bg: '#F8F9FA', cursor: onRowClick ? 'pointer' : 'default'}}
              onClick={() => onRowClick && onRowClick(item)}
              transition="background-color 0.2s ease-in-out"
            >
              {columns.map((col, cellIndex) => (
                <Td 
                  key={`cell-${rowIndex}-${cellIndex}`} 
                  {...col.cellProps} 
                  isNumeric={col.isNumeric}
                  fontFamily="Inter, sans-serif"
                  fontSize="sm"
                  color="#343A40"
                  py={4}
                  px={6}
                  borderBottomWidth="1px"
                  borderColor="#DEE2E6"
                >
                  {col.cell ? col.cell(item, rowIndex) : String(getNestedValue(item, col.accessor as string) ?? '')}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
