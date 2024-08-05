import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      console.log(ls.getItem("cart"));
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function addProduct(productId) {
    console.log("productId ? ", productId);

    setCartProducts((prev) => [...prev, productId]);
    console.log("cartProducts", cartProducts);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }
  function clearItem(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      console.log("pos", pos);
      if (pos !== -1) {
        console.log("prev", prev);
        return prev.filter((value, index) => value !== productId);
      }

      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
