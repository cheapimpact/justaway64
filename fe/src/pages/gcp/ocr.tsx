import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Card } from "../../components/customs/Card/Card";
// import { DataTable } from "../../components/customs/ChakraReactTable";
import { InputField } from "../../components/input-field/InputField";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
interface ocrProps {}

const ocr: React.FC<ocrProps> = ({}) => {
  const [data, setData] = useState<any>();

  const responseString = JSON.stringify(data) || null;
  const fileUrl = data?.file_url;
  const dataForm = data?.data_form;
  const dataTable = data?.data_table;
  const dataText = data?.data_text;
  const dimensions = data?.raw.pages[0].dimension;
  if (dataForm) {
  }

  return (
    <>
      <Card w="95vw">
        <Formik
          initialValues={{ file: "" }}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("file", values.file);
            console.log({ values });
            const res = await fetch("http://localhost:4200/api/ocr/gcp", {
              method: "POST",
              body: formData,
            });
            const resJson = await res.json();
            console.log({ resJson });

            setData(resJson);
          }}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <InputField
                name="meocr"
                label="File"
                type="file"
                onChange={(e: any) => {
                  setFieldValue("file", e.currentTarget.files[0]);
                }}
              />
              <Button type="submit" isLoading={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton _expanded={{ bg: "gray", color: "white" }}>
                <Box flex="1" textAlign="left">
                  Data
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Flex>
                <Box flex={1} w="50%">
                  <Tabs>
                    <TabList>
                      <Tab>dataText</Tab>
                      <Tab>dataTable</Tab>
                      <Tab>Structured Data Table</Tab>
                      <Tab>dataForm</Tab>
                      <Tab>Simplified Data Form</Tab>
                      <Tab>dimensions</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <pre>{JSON.stringify(dataText, null, 2)}</pre>
                      </TabPanel>
                      <TabPanel>
                        <pre>{JSON.stringify(dataTable, null, 2)}</pre>
                      </TabPanel>
                      <TabPanel>
                        <Card overflowX="auto">
                          {dataTable &&
                            dataTable[0].map(
                              (d: any, i: number) => (
                                <>
                                  {/* <pre>{JSON.stringify(d.header, null, 2)}</pre> */}
                                  <Table>
                                    <Thead>
                                      <Tr>
                                        {d.header.map((el: any) => (
                                          <Th>{el}</Th>
                                        ))}
                                      </Tr>
                                    </Thead>
                                    <Thead>
                                      <Tr>
                                        {d.body.map((el: any) => (
                                          <Td>{el}</Td>
                                        ))}
                                      </Tr>
                                    </Thead>
                                  </Table>
                                </>
                              )

                              // <Table>
                              //   {d.forEach((element) => {
                              //     <Tr>{element}</Tr>;
                              //   })}
                              // </Table>
                            )}
                        </Card>
                      </TabPanel>
                      <TabPanel>
                        <pre>{JSON.stringify(dataForm, null, 2)}</pre>
                      </TabPanel>
                      <TabPanel>
                        {dataForm && (
                          <Table>
                            <Tr>
                              <Th>Key</Th>
                              <Th>Value</Th>
                            </Tr>
                            {dataForm[0].map((d: any, i: number) => {
                              return (
                                <Tr key={i}>
                                  <Td>{d.key}</Td>
                                  <Td>{d.value}</Td>
                                </Tr>
                              );
                            })}
                          </Table>
                        )}
                      </TabPanel>
                      <TabPanel>
                        <pre>{JSON.stringify(dimensions, null, 2)}</pre>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box>
                {dataForm && (
                  <Box flex={1}>
                    <svg
                      id="highlight-box"
                      style={{
                        width: dimensions?.width + "pt",
                        height: dimensions?.height + "pt",
                        position: "absolute",
                      }}
                    >
                      {/* <rect x="50" y="20" width="150" height="150" /> */}
                      {dataForm[0].map((itemForm: any, index: number) => {
                        console.log({ itemForm });
                        const dWidth = dimensions.width;
                        const dHeight = dimensions.height;

                        const itemKey = itemForm.key;
                        const itemVal = itemForm.value;
                        const rectClassName = `rect_class_${index}`;
                        const itemClassName = `item_class_${index}`;
                        const keyX =
                          itemForm.keyBoundingPoly?.normalizedVertices[0]?.x *
                          100;
                        const keyY =
                          itemForm.keyBoundingPoly?.normalizedVertices[0].y *
                          100;
                        const keyWidth =
                          (itemForm.keyBoundingPoly?.normalizedVertices[1]?.x -
                            itemForm.keyBoundingPoly?.normalizedVertices[0]
                              ?.x) *
                          100;
                        const keyHeight =
                          (itemForm.keyBoundingPoly?.normalizedVertices[2].y -
                            itemForm.keyBoundingPoly?.normalizedVertices[0].y) *
                          100;
                        const valX =
                          itemForm.valueBoundingPoly?.normalizedVertices[0]?.x *
                          dWidth;
                        const valY =
                          itemForm.valueBoundingPoly?.normalizedVertices[0].y *
                          dHeight;
                        const valWidth =
                          (itemForm.valueBoundingPoly?.normalizedVertices[1]
                            ?.x -
                            itemForm.valueBoundingPoly?.normalizedVertices[0]
                              ?.x) *
                          dWidth;
                        const valHeight =
                          (itemForm.valueBoundingPoly?.normalizedVertices[2].y -
                            itemForm.valueBoundingPoly?.normalizedVertices[0]
                              .y) *
                          dHeight;
                        return (
                          <rect
                            x={valX}
                            y={valY}
                            width={valWidth}
                            height={valHeight}
                            stroke="transparent"
                            strokeWidth="2px"
                            // fillOpacity="0.2"
                          />
                        );
                      })}
                    </svg>
                    <object
                      style={{
                        width: dimensions?.width + "pt",
                        height: dimensions?.height + "pt",
                      }}
                      type="application/pdf"
                      data="/test/testfiel3.pdf"
                    >
                      <p>
                        This browser does not support inline PDFs. Please
                        download the PDF to view it:{" "}
                        <a href="'+fileUrl+'">Download PDF</a>
                      </p>
                    </object>
                  </Box>
                )}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
          {data && dataText && (
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: "gray", color: "white" }}>
                  <Box flex="1" textAlign="left">
                    Form
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Tabs>
                  <TabList>
                    <Tab>AutoFill</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <TextInput
                        options={[
                          "Xin Cube Inc",
                          "380 Francisco St",
                          "San Francisco",
                          "CA 94133",
                          "United State",
                          "Phone: (415) 989-1188 Fax: (415) 989-2288",
                          "Email: admin@xincube.com",
                          "Website: 74-2999212",
                          "Code: CN13030001",
                          "Bill To:",
                          "Reg No:",
                          "Xin Cube",
                          "Currency Code: USD",
                          "Phone: (909) 628-7377 Fax: (909) 628-7378 Phone: (909) 628-7377 Fax: (909) 628-7378",
                          "Tax No:",
                          "Date",
                          "29-Mar-2013 Order No. Sales Person Charles Gordon ",
                          "Shipping Date",
                          "02-Feb-2013 Shipping Terms Payment Terms 30 Days ",
                          "Credit Note",
                          "Ship To:",
                          "Gary Butler Gary Butler",
                          "Go Voice Go Voice",
                          "3033 Schaefer Ave.",
                          "3033 Schaefer Ave.",
                          "Chino",
                          "Chino",
                          "CA 91710",
                          "CA 91710",
                          "US",
                          "US",
                          "No. Item Code Description Unit Price Quantity Discount",
                          "Amount ",
                          "1 STK000001 APPLE IPAD CASING - WHITE 160.00 50 PC 0.00",
                          "8,000.00 ",
                          "2 STK000002 APPLE IPAD CASING - BLACK 160.00 50 PC 0.00",
                          "8,000.00 ",
                          "US Dollar Sixteen thousand eight hundred and 00/100",
                          "Add. Discount: 0.00",
                          "Note:",
                          "Thanks for your business!",
                          "This credit note is generated using Xin Inventory 2.0",
                          "Sub Total:",
                          "16,000.00",
                          "Discount:",
                          "0.00",
                          "VAT",
                          "800.00",
                          "0.00",
                          "0.00",
                          "Shipping:",
                          "0.00 ",
                          "Tax: 0.00",
                          "Authorized Signature,",
                          "Total:",
                          "16,800.00 ",
                          "Page : 1 / 1",
                          "",
                        ]}
                        trigger={"@"}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
      </Card>
    </>
  );
};
export default ocr;
