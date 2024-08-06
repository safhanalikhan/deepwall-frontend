import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import DynamicBtn from "@/components/DynamicBtn";
import { CartContext } from "@/components/CartContext";
import ProductCount from "@/components/ProductCount";
import { useRouter } from "next/router";
import { randomBytes } from 'crypto';

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ImageActionBox = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  //   padding: 3rem;

  .sidebar-options {
    display: flex;
    flex-direction: column;
    // justify-content:  center;

    p {
      font-size: smaller;
    }
  }
  @media screen and (max-width: 992px) {
    max-width: 700px;
    width: 100%;
  }
`;
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 1rem;
`;
const ImageButton = styled.div`
  border: 2px solid #000;
  ${(props) =>
    props.active
      ? ` 
      border-color: #000;
    `
      : `
      border-color: transparent;
    `}
  height: 80px;
  cursor: pointer;
  border-radius: 0px;
`;

const ImageAction = ({ custom, product, activeImage, setActiveImages }) => {
  const { addProduct } = useContext(CartContext);
  const [selectedQuantity, setSelectQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("18*24");
  const [selectborder, setSelectborder] = useState("Canvas Without Border");
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const router = useRouter();
  useEffect(() => {
    console.log(" product - - - - - - - - - -", product);
    console.log("- - - - - - - - - -", custom);
  }, [selectborder]);

  function addToCart() {
    if (custom) {
      const customId = randomBytes(16).toString('hex');
      let ObjectId = `customId-${customId}`
      console.log('customId', customId)
      let payload = {
        category: 'usergenerated',
        description: "",
        images: [activeImage],
        price: 500,
        title: 'usergenerated',
        _id: ObjectId,
        properties: {
          size: selectedSize,
          border: selectborder
        }
      }
      if (ls && ls.getItem("customProducts")) {
        let isItems = ls.getItem("customProducts")
        if (isItems) {
          let lastData = JSON.parse(ls.getItem("customProducts"))
          ls?.setItem("customProducts", JSON.stringify([...lastData, payload]));
          addProduct(payload._id)
        }
      } else {
        ls?.setItem("customProducts", JSON.stringify([payload]));
        addProduct(payload._id)
      }
    } else {
      addProduct(product._id)
    }
  }

  return (
    <ImageActionBox>
      <div className="w-100 h-100 sidebar-options ">
        <p>Write a review</p>
        <div className="d-flex  mt-1">
          <p className="me-3">Availability</p>
          <p className="mx-3">In Stock</p>
        </div>
        <h1 className="my-3">
          <i className="bi bi-currency-dollar"></i>
          {product.price}
        </h1>
        <p className="mb-0">Style</p>

        <div className="d-flex mt-0 mb-3">
          <DynamicBtn
            btnval="18*24"
            Dvar={selectedSize}
            DsetVar={setSelectedSize}
            DbuttonId="18*24"
          />
          <DynamicBtn
            btnval="24*36"
            Dvar={selectedSize}
            DsetVar={setSelectedSize}
            DbuttonId="24*36"
          />
          <DynamicBtn
            btnval="20*48"
            Dvar={selectedSize}
            DsetVar={setSelectedSize}
            DbuttonId="20*48"
          />
        </div>
        <p className="mb-0">Style</p>
        <div className="d-flex flex-sm-row flex-column mt-0 mb-3">
          <DynamicBtn
            btnval="Canvas Without Border"
            Dvar={selectborder}
            DsetVar={setSelectborder}
            DbuttonId="Canvas Without Border"
          />
          <DynamicBtn
            btnval="Canvas With Border"
            Dvar={selectborder}
            DsetVar={setSelectborder}
            DbuttonId="Framed with Border & Acrylic Glass"
          />
        </div>

        <div className="my-3 d-flex">
          <ProductCount quantity={setSelectQuantity} />
          <div
            className="btn btn-dark ms-2 w-100 rounded-pill mw-500 "
            onClick={() => addToCart()}
          >
            <i className="bi bi-bag-plus me-2"></i> <span> Add to cart </span>
          </div>
        </div>
        <div
          className="my-3 d-flex"
          onClick={() => {
            addToCart();
            router.push("/cart", { scroll: false });
          }}
        >
          <div className="btn btn-outline-dark w-100 mw-500 rounded-pill">
            Buy it now
          </div>
        </div>
        {
          custom ?
            false
            :
            <ImageButtons>
              {product?.images?.map((image) => (
                <ImageButton
                  key={image}
                  active={image === activeImage}
                  onClick={() => setActiveImages(image)}
                >
                  <Image src={image} alt="" />
                </ImageButton>
              ))}
            </ImageButtons>
        }
      </div>
    </ImageActionBox>
  );
};

export default ImageAction;
