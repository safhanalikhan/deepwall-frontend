import styled , {keyframes} from "styled-components";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import SweetAlert from "./SweetAlert";
import { useState } from "react";

const CartBtnStyled = styled.div`
  background-color: #00000065;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 2;
  cursor:pointer;
`


export default function CartBtn({id}) {
  const {addProduct} = useContext(CartContext);
  const [display , setDisplay] = useState(false)

  return (
    <>
        <CartBtnStyled
        className="py-2 text-light"
        onClick={() => {
          addProduct(id)
          setDisplay(true)
        }} 
        > 
          Add to cart 
        </CartBtnStyled>
      <SweetAlert message='Item added in your cart' dis={display} setdis={setDisplay}  /> 
    </>
  );
}