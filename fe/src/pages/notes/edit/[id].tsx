import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Spacer,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { Form, Formik } from "formik";
import { Maybe } from "graphql/jsutils/Maybe";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "../../../components/customs/Card/Card";
import { InputField } from "../../../components/input-field/InputField";
import { Header } from "../../../components/NavBar";
import {
  Image as ImageGQL,
  useNoteQuery,
  useUpdateNoteMutation,
  useUploadImageMutation,
} from "../../../generated/graphql";
import { MyOCR } from "../../../type";
import { AutosaveFormik } from "../../../utils/autosaveFormik";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useCustomToast } from "../../../utils/customToast";
import { sleep } from "../../../utils/sleep";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useIsAuth } from "../../../utils/useIsAuth";
import Hashids from "hashids";
import { timeConverter } from "../../../utils/time";
import { FaSave } from "react-icons/fa";

interface ImagesDrawerProps {
  images:
    | Maybe<
        ({
          __typename?: "Image" | undefined;
        } & Pick<ImageGQL, "filename" | "filepath" | "ocr" | "event">)[]
      >
    | undefined;
}

export const ImagesDrawer: React.FC<ImagesDrawerProps> = ({ images }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allowMultiple, setAllowMultiple] = useState(false);
  return (
    <>
      <Flex direction="column">
        <Button colorScheme="gray" variant="outline" onClick={onOpen}>
          Uploaded Images
        </Button>
        <Flex spac>
          <Checkbox
            isChecked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
          />
          {"  "}
          allowMultiple
        </Flex>
      </Flex>
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        size="md"
        trapFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <Accordion allowMultiple={allowMultiple}>
              {images?.map((d, i) => {
                const ocr: MyOCR = d.ocr;
                return (
                  <>
                    <AccordionItem key={i}>
                      {({ isExpanded }) => (
                        <>
                          <h2>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                {isExpanded ? (
                                  <>
                                    <Image src={d.filepath} h="200px" />{" "}
                                    {d.filename}
                                  </>
                                ) : (
                                  d.filename
                                )}
                              </Box>

                              <Tag
                                w="15%"
                                size="md"
                                key={i}
                                variant="solid"
                                colorScheme="orange"
                                mr={2}
                              >
                                {capitalizeFirstLetter(d.event)}
                              </Tag>
                              {isExpanded ? (
                                <MinusIcon fontSize="12px" />
                              ) : (
                                <AddIcon fontSize="12px" />
                              )}
                            </AccordionButton>
                          </h2>
                          <AccordionPanel pb={4}>
                            {ocr.error ? (
                              <Box>{ocr.error}</Box>
                            ) : (
                              <Tabs isFitted variant="enclosed">
                                <TabList mb="1em">
                                  <Tab>Text</Tab>
                                  <Tab>Paragraphs</Tab>
                                  <Tab>Table</Tab>
                                  <Tab>Form</Tab>
                                </TabList>
                                <TabPanels>
                                  <TabPanel>
                                    <Box overflow="scroll" maxH="64">
                                      {ocr.text!.length > 0 &&
                                        ocr.text!.map((text, textId) => {
                                          return (
                                            <Text key={textId}>{text}</Text>
                                          );
                                        })}
                                    </Box>
                                  </TabPanel>
                                  <TabPanel>
                                    <Box overflow="scroll" maxH="64">
                                      {ocr.paragraphs!.length > 0 &&
                                        ocr.paragraphs!.map(
                                          (paragraphs, paragraphsId) => {
                                            return (
                                              <>
                                                <Text key={paragraphsId}>
                                                  {paragraphs.text}
                                                </Text>
                                                <Divider my={3} />
                                              </>
                                            );
                                          }
                                        )}
                                    </Box>
                                  </TabPanel>
                                  <TabPanel>
                                    <Box overflow="scroll" maxH="64">
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
                                    </Box>
                                  </TabPanel>
                                  <TabPanel>
                                    <Box overflow="scroll" maxH="64">
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
                                    </Box>
                                  </TabPanel>
                                </TabPanels>
                              </Tabs>
                            )}
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </>
                );
              })}
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const EditNote: React.FC<{}> = ({}) => {
  useIsAuth();
  const toast = useCustomToast();
  const intId = useGetIntId();
  const { colorMode } = useColorMode();
  const [{ data, fetching, error }] = useNoteQuery({
    // -1 kalau misal dapet id yg params aneh aneh, jadi gausah ngirim respon ke server
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  const [, updateNote] = useUpdateNoteMutation();
  const [, uploadImage] = useUploadImageMutation();
  const [lastSaved, setLastSaved] = React.useState<any>("-");

  if (error) {
    return <div>{error.message}</div>;
  }

  if (fetching) {
    return (
      <>
        <Box>Loading...</Box>
      </>
    );
  }

  if (!data?.note) {
    return (
      <Box>
        <Box>Could not find Post</Box>
      </Box>
    );
  }

  if (!data?.note.canEdit) {
    return (
      <Box>
        <Box>You Have no right to edit this post</Box>
      </Box>
    );
  }

  const { title, text, isPublic, images } = data.note;
  return (
    <>
      <Header />
      {/* <HStack alignItems="flex-start"> */}
      <Box position="fixed" zIndex={5} top={79} right={5}>
        <ImagesDrawer images={images} />
      </Box>
      <Card mt={0} w="80vw">
        {/* <Box w="70vw">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Box> */}
        <Formik
          initialValues={{
            title: title || "",
            text: text || "",
            isPublic: isPublic || false,
          }}
          onSubmit={async (values, { setErrors }) => {
            //   const response = await createNote({ input: values });
            const response = await updateNote({ input: values, id: intId });

            if (response.data?.updateNote.errors) {
              setErrors(toErrorMap(response.data.updateNote.errors));
            } else {
              let x = timeConverter(
                response.data!.updateNote.note!.updatedAt!,
                "hhmmss"
              );
              toast({
                title: "Note Saved",
                description: `${x}`,
              });
              setLastSaved(x);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              {/* <Box w="50vw">
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Box> */}
              <InputField name="isPublic" label="go public?" variant="switch" />
              <InputField
                name="title"
                label="Title goes brrraaaaa!"
                placeholder="Title goes brrrra"
              />
              <br />
              <Editor
                init={{
                  height: 500,
                  plugins: "link image code",

                  skin: colorMode === "dark" ? "oxide-dark" : "fabric",
                  content_css: colorMode === "dark" ? "dark" : "fabric",
                  toolbar:
                    "undo redo | image  media | formatselect | bold italic | \
                    alignleft aligncenter alignright | \
                    bullist numlist outdent indent | help ",
                  setup: (ed) => {
                    ed.on("paste", async (e) => {
                      if (e.clipboardData?.files.length) {
                        e.preventDefault();
                        var test = new FormData();
                        test.append("image", e.clipboardData.files[0]);
                        await sleep(2000); //tf is this even here
                        const response = await uploadImage({
                          image: test.get("image"),
                          noteId: intId,
                          event: "paste",
                        });
                        let content;
                        if (response.data?.UploadImage.image) {
                          const image = response.data.UploadImage.image;
                          // images.push(image);
                          content = `<img src='${image.filepath}' />`;
                        }
                        ed.execCommand("mceInsertContent", false, content);
                      }
                    });
                  },
                  images_upload_handler: async (
                    blobInfo,
                    success,
                    failure,
                    progress
                  ) => {
                    console.log({ blobInfo });
                    const formData = new FormData();
                    formData.append("image", blobInfo.blob());
                    const response = await uploadImage({
                      image: formData.get("image"),
                      noteId: intId,
                      event: "upload",
                    });

                    if (response.data?.UploadImage.image?.filepath) {
                      success(response.data.UploadImage.image.filepath);
                    } else {
                      failure("error");
                    }
                  },
                }}
                value={values.text}
                onEditorChange={(newValue, editor) => {
                  // setValue(newValue);
                  // setText(editor.getContent({ format: "text" }));
                  setFieldValue("text", newValue);
                }}
              />
              <Box position="fixed" type="submit" right={8} bottom={6}>
                <Button
                  leftIcon={<FaSave />}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="orange"
                >
                  Save
                </Button>
                <br />
                <Text fontSize="sm">
                  <AutosaveFormik
                    debounceMs={5000}
                    lastSaved={lastSaved}
                    setLastSaved={setLastSaved}
                  />
                </Text>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
      {/* </HStack> */}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(EditNote);
