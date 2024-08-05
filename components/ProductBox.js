import styled , {keyframes} from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import SweetAlert from "./SweetAlert";
import CartBtn from "./CartBtn";
import { useState } from "react";
const ProductWrapper = styled.div`
  position:relative;
  overFlow:hidden
`;

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius:0px;
  // padding: 20px;
  // height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
  min-height: 450px;
  overflow:hidden;
  div{
    height:100%;
    width:100%;
  }
  img{
    max-width: 100%;
    height:100%;
    object-fit:cover;
    @media screen and (max-width: 576px) {
      width:100%;
    }
  }
`;
  const fadedown = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;
const OverLay = styled(Link)`
  animation: ${fadedown} 0.3s ease-in-out;  
  background-color: #0000006d;
  position: absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
  z-index: 1;
  display:flex;
  align-items:flex-end;
  
`;

// const CartBtn = styled.div`
//   background-color: #00000065;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   text-align: center;
//   z-index: 2;
//   cursor:pointer;
// `


export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  const [activeId, setActiveId] = useState(0);
  const [display , setDisplay] = useState(false)


  const setActiveElementOnHover = (id) => {
    setActiveId(id);
  };
  const resetActiveElementOnLeave = () => {
    setActiveId(0);
  };

  return (
    <ProductWrapper>
      <WhiteBox
          onMouseEnter={() => setActiveElementOnHover(_id)}

      >
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      {
        activeId ?
        <OverLay 
          onMouseLeave={resetActiveElementOnLeave}
          href={url}
        >

        </OverLay>

        : false
      }
        <CartBtn 
            id={_id}
          /> 
      
      {/* {activeId ? 
        <CartBtn
        // onMouseLeave={resetActiveElementOnLeave}
        className="py-2 text-light"
        onClick={() => {
          addProduct(_id)
          setDisplay(true)
        }} 
        > 
          Add to cart 
        </CartBtn> 
      : false} */}
      {/* <SweetAlert message='Item added in your cart' dis={display} setdis={setDisplay}  />  */}
    </ProductWrapper>
  );
}