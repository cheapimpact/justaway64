import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import * as React from "react";
import {
  Column,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: Column<Data>[];
};

export function DataTable<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    state,

    //untuk filter
    setGlobalFilter,

    // untuk pagination
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } as any },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const thColor = { light: "blue.700", dark: "gray.800" };
  const tdColor = { light: "gray.50", dark: "gray.600" };

  const { globalFilter, pageIndex, pageSize } = state as any;
  return (
    <>
      <GlobalFilter
        filter={globalFilter}
        setFilter={setGlobalFilter}
        float="right"
        width="30vw"
        mb={3}
      />
      <Box mb={50} overflowX="auto" w="100%">
        <Table size="lg" {...getTableProps()}>
          <Thead fontWeight="bold" bg={thColor[colorMode]}>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                    color={color[colorMode]}
                  >
                    <Box display="inline-flex">
                      {column.render("Header")}
                      <Box ml={2}>
                        {column.canSort ? (
                          column.isSorted ? (
                            column.isSortedDesc ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : (
                            <UpDownIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </Box>
                    </Box>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody bg={tdColor[colorMode]} {...getTableBodyProps()}>
            {page.length > 0 ? (
              page.map((row: any) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <Td
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={headerGroups[0].headers.length} textAlign="center">
                  Tidak Ada Data
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
        <Flex float="right" my={3}>
          <Box mr={3}>
            <IconButton
              aria-label="go-to-first-page"
              icon={<ArrowLeftIcon />}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            ></IconButton>{" "}
            <IconButton
              aria-label="previousPage"
              icon={<ChevronLeftIcon />}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            ></IconButton>
            <chakra.span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </chakra.span>
            <IconButton
              aria-label="nextPage"
              icon={<ChevronRightIcon />}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            ></IconButton>{" "}
            <IconButton
              aria-label="go-to-last-page"
              icon={<ArrowRightIcon />}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            ></IconButton>
          </Box>
          <Box my="auto"> Go To </Box>
          <Box mr={3}>
            <NumberInput
              defaultValue={0}
              max={pageCount}
              min={0}
              onChange={(value) => {
                const page = value ? Number(value) - 1 : 0;
                gotoPage(page);
              }}
              width="4rem"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>

          <Box>
            <Select
              value={pageSize}
              width="8rem"
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 15, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
