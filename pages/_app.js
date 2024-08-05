import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import "../app/global.scss";
import "../app/layout.scss";
import "../app/responsive.scss";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CartContextProvider>
    </>
  );
}
