import Link from "next/link";
import styled, { keyframes } from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
// import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const fadedown = keyframes`
  0% {
    opacity: 0;
    left: -100%;
  }
  70% {
    left: 0%;
  }
  100% {
    opacity: 1;
  }
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledNav = styled.nav`
  animation: ${fadedown} 1s ease-in-out;

  ${(props) =>
    props.mobilenavactive
      ? `
  display: flex;
  flex-direction:column;
  padding-top: 100px;
  // justify-content:center;
  box-shadow: 0px 0 30px  #000000a3;
  border-radius: 0px 0px 15px 15px;
  `
      : `
    display: none;
    padding: 70px 20px 20px;
  `}

  .StyledNaItems {
    padding: 20px 0px;
    box-shadow: 0px 0px 4px #0000002f;
  }

  // gap: 1rem;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 50%;
  left: 0;
  right: 0;
  background-color: #fff;
  color: #000;
  z-index: 4;

  .styled-nav-item {
    display: flex;
    justify-content: flex-start;
    font-size: 1rem;
    font-weight: 500;
    color: #0000009f;
    padding-left: 2rem;
    // padding-bottom: 15px;
    text-transform: capitalize;
  }

  .active {
    color: #d9121f;
    box-shadow: 0px 4px 3px #0000001f;
    animation: ${fade} 0.3s ease-in-out;
  }

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
const NavLinkMobile = styled.div`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  transition:0.5s;
  @media screen and (min-width: 768px) {
    padding: 0;
  }

  :hover{
    cursor:pointer;
    color:#d9121f;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  display: flex;
  align-self: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  // z-index: 10;
  padding: 3px;
  @media screen and (min-width: 576px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);
  const router = useRouter()

  const navPages = [
    {
      page: "Home",
      path: "/",
      iconClass: 'bi bi-house'
    },
    {
      page: "All products",
      path: "/products",
      iconClass: 'bi bi-images'
    },
    {
      page: "Create",
      path: "/generate",
      iconClass: 'bi bi-pen'
    },
  ];
  // const pathname = usePathname()
  function handleClick(index, item) {
    console.log("index index", index);
    setActiveIndex(index === activeIndex ? null : index);
    setMobileNavActive(false)
    router.push(`/${item?.path}`)
  }

  return (
    <div className="styled-header">
      <div className="header-grid  ">
        <div className="logo-container related">
          <NavLink href={"/"} className="Logo">
            Deepwall
          </NavLink>
        </div>
        <StyledNav className="d-sm-none" mobilenavactive={mobileNavActive}>
          <div className="StyledNaItems">
            {navPages.map((item, index) => (
              <NavLinkMobile
                key={item?.path}
                className={
                  index === activeIndex
                    ? "active styled-nav-item "
                    : "styled-nav-item "
                }
                // href={item?.path}
                onClick={() => handleClick(index, item)}
              >
                <i className={`${item?.iconClass} me-3`}></i>
                <div>{item?.page}</div>
              </NavLinkMobile>
            ))}
          </div>
        </StyledNav>
        <div className="nav-links related  d-sm-flex d-none ">
          <NavLink className="nav-opt" href={"/"}>
            Home
          </NavLink>
          <NavLink className="nav-opt" href={"/products"}>
            Product
          </NavLink>
          <NavLink className="nav-opt" href={"/generate"}>
            Create
          </NavLink>
        </div>
        <div className="sides-btns related ">
          <NavLink
            href={"/cart"}
            className="nav-opt cart-btn"
            mobilenavactive={mobileNavActive}
          >
            <i className="bi bi-cart3 text-dark fw-bold fs-4"></i>
            {cartProducts?.length ? (
              <div className="cart-count">{cartProducts.length}</div>
            ) : (
              false
            )}
          </NavLink>
          <NavButton
            className="nav-opt "
            mobilenavactive={mobileNavActive}
            onClick={() => setMobileNavActive((prev) => !prev)}
          >
            {mobileNavActive ? <i className="bi bi-x-lg fs-5 text-dark fw-bolder mx-2"></i> : <BarsIcon />}
          </NavButton>
        </div>
      </div>
    </div>
  );
}
