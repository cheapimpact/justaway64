import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Container } from "@components/Container";
import { AppProps } from "next/dist/next-server/lib/router/router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container height="100vh">
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Container>
  );
}

export default MyApp;
