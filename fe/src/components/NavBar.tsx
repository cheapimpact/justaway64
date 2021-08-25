import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  chakra,
  HTMLChakraProps,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/system";
import { useViewportScroll } from "framer-motion";
import React from "react";
import NextLink from "next/link";
import {
  HStack,
  Link,
  Icon,
  IconButton,
  Button,
  Avatar,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import {
  FaMoon,
  FaSun,
  FaSignInAlt,
  FaInstagram,
  FaSignOutAlt,
  FaRegLaughWink,
  FaRegLaugh,
  FaItunesNote,
  FaStickyNote,
  FaLinkedin,
} from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const DiscordIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 146 146" {...props}>
    <path
      fill="currentColor"
      d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
      fillRule="nonzero"
    />
  </svg>
);

const GithubIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  </svg>
);

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let rightEl;
  if (!data?.me) {
    rightEl = (
      <NextLink href="/login">
        <Button
          size="md"
          fontSize="lg"
          aria-label={`Log in`}
          variant="ghost"
          color="current"
          ml={3}
          leftIcon={<FaSignInAlt />}
        >
          Login
        </Button>
      </NextLink>
    );
  } else {
    rightEl = (
      <Box>
        <Menu>
          {({ isOpen }) => (
            <>
              <Button
                as={MenuButton}
                size="md"
                fontSize="lg"
                aria-label={`Log in`}
                variant="ghost"
                color="current"
                ml={3}
                leftIcon={isOpen ? <FaRegLaughWink /> : <FaRegLaugh />}
              >
                Profile
              </Button>
              <Box as={MenuList}>
                <Center>
                  <Avatar size="xl" />
                </Center>
                <Center as={VStack}>
                  <Text fontWeight="bold" isTruncated>
                    {data.me?.username}
                  </Text>
                  <Text isTruncated>you're awesome</Text>
                </Center>

                <MenuDivider />
                <MenuGroup title="Profile">
                  <MenuItem>
                    <Icon
                      as={FaRegLaughWink}
                      mr="2"
                      color="current"
                      onClick={() => {}}
                    />
                    Profile
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="Action">
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}
                  >
                    <Icon as={FaSignOutAlt} mr="2" color="current" />
                    {logoutFetching ? "Loading..." : "Log out"}
                  </MenuItem>
                </MenuGroup>
              </Box>
            </>
          )}
        </Menu>
      </Box>
    );
  }

  return (
    <>
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center" color="#DF7356" fontWeight="semibold">
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="justaway64, Back to homepage">
              <Box minW="3rem">
                <img src="/logo/justawaylogo.svg" />
              </Box>
            </chakra.a>
          </NextLink>
          <Text variant="ghost" fontSize="20px" color="current">
            h3h3
          </Text>
        </Flex>
        <Flex
          justify="flex-end"
          w="100%"
          align="center"
          color="gray.400"
          maxW="1100px"
        >
          <HStack spacing="5" bg="gray.20" rounded="md" p="3">
            <NextLink href="/notes" as={`/notes`}>
              <Link aria-label="Notes">
                <Icon
                  as={CgNotes}
                  display="block"
                  w="5"
                  h="5"
                  _hover={{ color: "gray.600" }}
                />
              </Link>
            </NextLink>
            <NextLink
              href="https://www.linkedin.com/in/abdurrochman-h-hasibuan-744bb6207/"
              passHref
            >
              <Link isExternal aria-label="Go to justaway LinkedIn page">
                <Icon
                  as={FaLinkedin}
                  display="block"
                  transition="color 0.2s"
                  w="5"
                  h="5"
                  _hover={{ color: "gray.600" }}
                />
              </Link>
            </NextLink>
            <NextLink href="https://github.com/cheapimpact" passHref>
              <Link isExternal aria-label="Go to justaway GitHub page">
                <Icon
                  as={GithubIcon}
                  display="block"
                  transition="color 0.2s"
                  w="5"
                  h="5"
                  _hover={{ color: "gray.600" }}
                />
              </Link>
            </NextLink>
            <NextLink href="/discord" passHref>
              <Link isExternal aria-label="Go to justaway Discord page">
                <Icon
                  as={DiscordIcon}
                  display="block"
                  transition="color 0.2s"
                  w="5"
                  h="5"
                  _hover={{ color: "gray.600" }}
                />
              </Link>
            </NextLink>
            <NextLink href="https://www.instagram.com/abdhsb1/" passHref>
              <Link isExternal aria-label="Go to justaway Instagram page">
                <Icon
                  as={FaInstagram}
                  display="block"
                  transition="color 0.2s"
                  w="5"
                  h="5"
                  _hover={{ color: "gray.600" }}
                />
              </Link>
            </NextLink>
          </HStack>
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: "0", md: "3" }}
            onClick={toggleMode}
            icon={<SwitchIcon />}
          />
          {rightEl}
        </Flex>
      </Flex>
    </>
  );
};

//steal from chakra git
export function Header(props: HTMLChakraProps<"header">) {
  const bg = useColorModeValue("white", "gray.900");
  const ref = React.useRef<HTMLHeadingElement>();
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};
  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <chakra.header
      ref={ref as any}
      shadow={y > height ? "md" : undefined}
      transition="box-shadow 0.2s, background-color 0.2s"
      pos="sticky"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      width="full"
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="8xl">
        <NavBar />
      </chakra.div>
    </chakra.header>
  );
}
