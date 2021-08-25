import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Container } from "@components/Container";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "@css/nprogress.css"; //styles of nprogress
// NProgress.configure({  template: });

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
