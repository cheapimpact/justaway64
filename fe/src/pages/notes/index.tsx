import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  StackDivider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CreatorActions } from "@components/notes/CreatorActions";
import { createUrqlClient } from "@utils/createUrqlClient";
import { Form, Formik } from "formik";
import Hashids from "hashids";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
// import Swiper core and required modules
// install Swiper modules
import SwiperCore, { Mousewheel, Scrollbar } from "swiper/core";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import "swiper/swiper.min.css";
import { Card } from "../../components/customs/Card/Card";
import { InputField } from "../../components/input-field/InputField";
import { NoteContext, NoteWrapper } from "../../components/notes/NoteWrapper";
import { useCreateNoteMutation, useNotesQuery } from "../../generated/graphql";
import { defaultColor } from "../../utils/defaultColor";
import { timeConverter } from "../../utils/time";
import { toErrorMap } from "../../utils/toErrorMap";

// install Swiper modules
SwiperCore.use([Scrollbar, Mousewheel]);

interface IndexProps {}
const hashids = new Hashids();

// CREATE NOTE
const CreateNote = () => {
  const { meData } = useContext(NoteContext);
  const { color } = defaultColor();

  const { colorMode } = useColorMode();
  const router = useRouter();
  const [, createNote] = useCreateNoteMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenPrivacy, onToggle: onTogglePrivacy } = useDisclosure();

  const initialRef: React.RefObject<any> = React.useRef();
  return (
    <>
      <Box p={5}>
        <Button
          onClick={onOpen}
          colorScheme="orange"
          variant="outline"
          size="md"
        >
          Create Note
        </Button>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                title: "",
                text: "Write your note here...",
                isPublic: false,
              }}
              onSubmit={async (values, { setErrors }) => {
                const response = await createNote({ input: values });
                if (response.data?.createNote.errors) {
                  setErrors(toErrorMap(response.data.createNote.errors));
                }
                const id = response.data?.createNote.note!.id;
                router.push(`/notes/edit/${hashids.encode(id!.toString())}`);
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <Heading size="md" as="h3">
                    Create Notes
                  </Heading>
                  <Divider />
                  <Flex align="center" m={3}>
                    <Image
                      borderRadius="full"
                      boxSize="50px"
                      src="/images/default.jpg"
                      alt={meData?.me?.username}
                    />
                    <VStack spacing={0.2} align="start" ml={5} w="100%">
                      <Text fontSize="md" as="b">
                        {meData?.me?.username}
                      </Text>
                      <Button
                        m={0}
                        leftIcon={values.isPublic ? <BiWorld /> : <FaLock />}
                        colorScheme="gray"
                        variant="outline"
                        size="xs"
                        onClick={onTogglePrivacy}
                      >
                        {values.isPublic ? "Anyone" : "Only Me"}
                      </Button>
                      <Collapse
                        in={isOpenPrivacy}
                        animateOpacity
                        style={{ width: "100%" }}
                      >
                        <Card
                          w="64%"
                          color="white"
                          m={0}
                          p={2}
                          borderColor="black"
                          rounded="sm"
                          shadow="sm"
                        >
                          <VStack
                            divider={<StackDivider />}
                            spacing={2}
                            align="stretch"
                          >
                            <Button
                              variant="unstyled"
                              color={color[colorMode]}
                              h="auto"
                              onClick={() => {
                                setFieldValue("isPublic", true);
                                onTogglePrivacy();
                              }}
                            >
                              <Flex verticalAlign="middle">
                                <Center flex={1}>
                                  <Icon as={BiWorld} boxSize={6} />
                                </Center>
                                <VStack flex={6} align="start" spacing={0}>
                                  <Heading size="sm">Anyone</Heading>
                                  <Text fontSize="sm">
                                    Every single people who waste his/her time
                                    here
                                  </Text>
                                </VStack>
                              </Flex>
                            </Button>
                            <Button
                              variant="unstyled"
                              color={color[colorMode]}
                              h="auto"
                              onClick={() => {
                                setFieldValue("isPublic", false);
                                onTogglePrivacy();
                              }}
                            >
                              <Flex verticalAlign="middle">
                                <Center flex={1}>
                                  <Icon as={FaLock} boxSize={6} />
                                </Center>
                                <VStack flex={6} align="start" spacing={0}>
                                  <Heading size="sm">Only Me</Heading>
                                  <Text fontSize="sm">
                                    Its self-explanatory
                                  </Text>
                                </VStack>
                              </Flex>
                            </Button>
                          </VStack>
                        </Card>
                      </Collapse>
                      <Text fontSize="xx-small">
                        {timeConverter(Date.now())}
                      </Text>
                    </VStack>
                    <Spacer />
                  </Flex>
                  <HStack>
                    <Box flex={8}>
                      <InputField
                        name="title"
                        placeholder="Title goes brrrra"
                        ref={initialRef}
                      />
                    </Box>
                  </HStack>
                  <Button
                    type="submit"
                    float="right"
                    isLoading={isSubmitting}
                    w="100%"
                    mt={2}
                  >
                    Create Note
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Index: React.FC<IndexProps> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, error, stale, extensions, operation }] =
    useNotesQuery({
      variables,
    });

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!fetching && !data) {
    return <Box>you got query failed for some reason</Box>;
  }
  return (
    <>
      <NoteWrapper>
        {!data && fetching && "loading"}
        <CreateNote />
        <VStack spacing={8} w="64%">
          {data?.notes.notes.map((d) => (
            <Card key={d.id} shadow="md" w="100%" m={0} p={0}>
              <Flex align="center" m={3}>
                <Image
                  borderRadius="full"
                  boxSize="30px"
                  src="/images/default.jpg"
                  alt={d.creator.username}
                />
                <VStack spacing={0.2} align="start" ml={5}>
                  <Text fontSize="xs" as="b">
                    {d.creator.username}
                  </Text>
                  <Text fontSize="xx-small">{timeConverter(d.createdAt)}</Text>
                </VStack>
                <Spacer />
                {d.canEdit && <CreatorActions id={d.id} />}
              </Flex>
              <Divider />
              <Box p={5} pt={2}>
                <NextLink
                  href="/notes/[id]"
                  as={`/notes/${hashids.encode(d.id.toString())}`}
                >
                  <Link>
                    <Heading as="h4" size="md">
                      {d.title}
                    </Heading>
                  </Link>
                </NextLink>
                <HStack spacing={4} m={2}>
                  {["do", "yu", "knaw", "da", "way"].map((text, i) => (
                    <Tag
                      size="sm"
                      key={i}
                      variant="subtle"
                      colorScheme="orange"
                    >
                      <TagLeftIcon boxSize="12px" as={AddIcon} />
                      <TagLabel>{text}</TagLabel>
                    </Tag>
                  ))}
                </HStack>

                <Flex align="start" maxW="100%">
                  <Box w="50%">
                    <Swiper
                      scrollbar={{
                        hide: true,
                      }}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <Image
                          src="images/doyonowdawae.jpg"
                          maxH="64"
                          borderRadius="sm"
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src="images/doyonowdawae.jpg"
                          maxH="64"
                          borderRadius="sm"
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src="images/doyonowdawae.jpg"
                          maxH="64"
                          borderRadius="sm"
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Box>
                  <Box w="50%" h="150">
                    <Swiper
                      direction={"vertical"}
                      slidesPerView={"auto"}
                      scrollbar={true}
                      mousewheel={true}
                    >
                      <SwiperSlide
                        style={{
                          maxHeight: 64,
                        }}
                      >
                        <Text>{d.textSnippet}</Text>
                      </SwiperSlide>
                    </Swiper>
                  </Box>
                </Flex>
              </Box>
            </Card>
          ))}
        </VStack>
        {data && data.notes.hasMore && (
          <Flex m="auto" mt={5}>
            <Button
              isLoading={fetching}
              onClick={() => {
                console.log({ stale, extensions, operation });

                setVariables({
                  ...variables,
                  cursor:
                    data.notes.notes[data.notes.notes.length - 1].createdAt,
                });
              }}
            >
              Load More
            </Button>
          </Flex>
        )}
      </NoteWrapper>
    </>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
