import React, { useState } from "react";
import { Header } from "@components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { Editor } from "@tinymce/tinymce-react";
import {
  useCreateNoteMutation,
  useUploadImageMutation,
} from "../../generated/graphql";
import { Form, Formik } from "formik";
import { Card, CardHeader } from "../../components/customs/Card/Card";
import { Button } from "@chakra-ui/button";
import { sleep } from "../../utils/sleep";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
} from "@chakra-ui/react";
import { InputField } from "../../components/input-field/InputField";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { toErrorMap } from "../../utils/toErrorMap";

const CreateNote: React.FC<{}> = ({}) => {
  const [, createNote] = useCreateNoteMutation();
  const [, uploadImage] = useUploadImageMutation();

  return (
    <>
      <Header />
      <HStack alignItems="flex-start">
        <Card mt={0}>
          <Formik
            initialValues={{ title: "", text: "", isPublic: false }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createNote({ input: values });

              if (response.data?.createNote.errors) {
                setErrors(toErrorMap(response.data.createNote.errors));
              }
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form>
                <InputField
                  name="isPublic"
                  label="go public?"
                  variant="switch"
                />
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
                            noteId: 1,
                          });
                          let content;
                          if (response.data?.UploadImage.image?.filepath) {
                            const imageData = response.data.UploadImage.image;
                            console.log({ imageData });

                            content = `<img src='${imageData.filepath}' />`;
                            // console.log(response.data?.pasteImage.pastedImage);
                          }
                          ed.execCommand("mceInsertContent", false, content);
                        }
                      });
                    },
                  }}
                  onEditorChange={(newValue, editor) => {
                    // setValue(newValue);
                    // setText(editor.getContent({ format: "text" }));
                    setFieldValue("text", newValue);
                  }}
                />

                <Button type="submit" float="right" isLoading={isSubmitting}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
        <Card>
          <CardHeader>Extracted Image</CardHeader>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 1 title
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Section 2 title
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Card>
      </HStack>
    </>
  );
};
export default withUrqlClient(createUrqlClient)(CreateNote);
