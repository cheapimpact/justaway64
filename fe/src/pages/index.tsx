import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";

import { Hero } from "@components/Hero";
import { Main } from "@components/Main";
import { CTA } from "@components/CTA";
import { Footer } from "@components/Footer";
import { Header } from "@components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "@utils/createUrqlClient";
const Index = () => (
  <>
    <Header />
    <Main>
      <Hero title="Wasting Time with typescript" />
      <Text>
        builded with <Code>Next.js</Code> + <Code>chakra-ui</Code> +{" "}
        <Code>GraphQL</Code>.
      </Text>
      <List spacing={3} my={0}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink
            isExternal
            href="https://chakra-ui.com"
            flexGrow={1}
            mr={2}
          >
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink href="/gcp/ocr" flexGrow={1} mr={2}>
            GCP OCR <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>
    <Footer>
      <Text>❤️ ❤️ ❤️</Text>
    </Footer>
    <CTA />
  </>
);

export default withUrqlClient(createUrqlClient)(Index);
