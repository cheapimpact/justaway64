import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import React from "react";
import { MyOCR } from "../../type";

interface AccordionOCRProps {
  filePath: string;
  fileName: string;
  event: string;
  ocr: MyOCR;
}

export const AccordionOCR: React.FC<AccordionOCRProps> = ({ ocr }) => {
  return (
    <Accordion allowMultiple>
      {ocr?.map((d, i) => {
        const ocr: MyOCR = d.ocr;
        if (ocr.error) {
          return <>error</>;
        }
        return (
          <>
            <AccordionItem key={i}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {d.filename}
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Tabs isFitted variant="enclosed">
                      {}
                      <TabList mb="1em">
                        <Tab>Text</Tab>
                        <Tab>Paragraphs</Tab>
                        <Tab>Table</Tab>
                        <Tab>Form</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          {ocr.text!.length > 0 &&
                            ocr.text!.map((text, textId) => {
                              return <Text key={textId}>{text}</Text>;
                            })}
                        </TabPanel>
                        <TabPanel>
                          {ocr.paragraphs!.length > 0 &&
                            ocr.paragraphs!.map((paragraphs, paragraphsId) => {
                              return (
                                <Text key={paragraphsId}>
                                  {paragraphs.text}
                                </Text>
                              );
                            })}
                        </TabPanel>
                        <TabPanel>
                          {ocr.table!.length > 0 &&
                            ocr.table!.map((d, i) => {
                              <>
                                <Table>
                                  <Thead>
                                    <Tr>
                                      {d.header.map((el) => (
                                        <Th>{el}</Th>
                                      ))}
                                    </Tr>
                                  </Thead>
                                  <Thead>
                                    <Tr>
                                      {d.body.map((el) => (
                                        <Td>{el}</Td>
                                      ))}
                                    </Tr>
                                  </Thead>
                                </Table>
                              </>;
                            })}
                        </TabPanel>
                        <TabPanel>
                          <Table>
                            <Tr>
                              <Th>Key</Th>
                              <Th>Value</Th>
                            </Tr>
                            {ocr.form!.length > 0 &&
                              ocr.form!.map((d, i) => (
                                <Tr key={i}>
                                  <Td>{d.key}</Td>
                                  <Td>{d.value}</Td>
                                </Tr>
                              ))}
                          </Table>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </>
        );
      })}
    </Accordion>
  );
};
