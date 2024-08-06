import styled from "styled-components";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import ProductImages from "@/components/ProductImages";
import ImageAction from "@/components/ImageAction";
import Swal from "sweetalert2";
const Creative = styled.div`

  // height:100%;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ColWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${(props) =>
    props?.results
      ? `  
      height: 100%;
      // height: calc(100vh - 4rem - 10rem)    ;

      `
      : `
      height: calc(100vh - 4rem - 10rem)    ;
    `}
  margin:0.5rem 0;
  gap: 2rem;

  @media screen and (max-width: 992px) {
      flex-direction:column;
      justify-content: space-between;
      align-items:center;
      ${(props) =>
    props?.results
      ? `  
          height: 100%;
          `
      : `
          height: calc(100vh - 4rem - 15rem)    ;
        `}

  }

`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  height: 100%;
`;
const ImageBox = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  max-height: 605px;
  max-width: 500px;
  justify-content: center;
  overflow: hidden;
  // align-self:center;
  // background:#000
  @media screen and (max-width: 992px) {
    max-width: 700px;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // gap: 2rem;
  padding: 20px 5rem;
  // margin: 0 auto;
  height: 100%;
  // flex:1
  @media screen and (max-width: 992px) {
      padding: 20px 2rem;
  }
`;
const ImagesGrid = styled.div`
  display: grid;
  height: 100%;
  // min-height:30rem
`;

const InputSec = styled.div`
    display: flex;
    position:relative;
    // align-items:center;
    padding:0;
    height:3.5rem;

    .imput-field{
      position:absolute;
      top:0;
      margin:0;
      height:100%;
    }
`;

const GenerateBtn = styled.div`
  background: #000;
  color: #fff;
  position:absolute;
  right:0.4rem;
  top:0.3rem;
  height:2.9rem;
  width:5rem;
  text-align:center;
  
  ${(props) =>
    props.isDisabled
      ? `
      opacity:0.75;
      display:flex;
      justify-content:center;
      align-items:center;
      gap:5px;
      cursor:not-allowed;
      `
      : `
      display: grid;
      place-items: center;
      opacity:1;
      cursor:pointer;
      `}
  // padding: 2rem;
  // margin-bottom: 5px;
  border-radius:2rem;
  @media screen and (max-width: 576px) {
      top:0.4rem;
      height:2.8rem;
      width:2.8rem;
  }
  
`;

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(false);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const lastgeneratedImage = ls?.getItem("lastgeneratedImage")
  let payload = {
    title: "user generated",
    description: prompt,
    price: 5000,
    category: "usergenerated"
  };

  useEffect(() => {
    if (lastgeneratedImage) {
      setActiveImage(lastgeneratedImage);
      setProduct({ ...payload, Images: [lastgeneratedImage] });
    }

  }, [lastgeneratedImage])

  // useEffect(()=>{
  //   console.log(prompt)

  // },[prompt])

  async function generatePics() {
    if (prompt.trim() == "") {
      console.log("fill all fields");
      setEmptyInput(true);
    } else {
      try {
        setProduct()
        setLoading(true);
        await axios.post("/api/imagecreate", { prompt }).then((response) => {
          console.log("helo baby", response.data);
          setResult(response.data.url);
          payload = { ...payload, images: [response.data.url] };
          setActiveImage(response.data.url);
        });
        // let uri =
        //   "https://deepwallec2.s3.amazonaws.com/user_generated1722987517961.jpg";
        // setResult(uri);
        // payload = { ...payload, images: [uri] };
        // setActiveImage(uri);
        // setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log("Error . . .", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      } finally {
        setLoading(false);
        setProduct({ ...payload });
      }
    }
  }

  return (
    <Creative className="gereante_page">
      <Row className=" px-sm-5 px-3" >
        <Title>Fit Your Thoughts in to Frame </Title>

        <ColWrapper results={result ? true : false}>
          {result || lastgeneratedImage ? (
            <>
              <ImageBox>
                {activeImage && (
                  <ProductImages
                    images={product.images}
                    activeImage={activeImage}
                  />
                )}
              </ImageBox>
              {product && (
                <ImageAction
                  custom={true}
                  product={product}
                  activeImage={activeImage}
                  setActiveImages={setActiveImage}
                />
              )}
            </>
          ) : !result && loading ? (
            <div
              style={{
                maxHeight: "500px",
                width: "40%",
                height: "100%",
                alignContent: "center",
                textAlign: "center",
              }}
            // className="placeholder-glow"
            >
              {/* <div
                style={{ maxHeight: "500px", width: "100%", height: "100%" }}
              // className="placeholder"
              ></div> */}
              <div class="spinner-border text-dark opacity-75" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            false
          )}
        </ColWrapper>
        <InputSec className="my-3">
          <Input
            type="text"
            placeholder="prompt"
            value={prompt}
            name="prompt"
            className={`p-3 ps-sm-4 imput-field rounded-pill border-2 ${emptyInput ? "imput-field border-danger border-2" : ""
              }`}
            onChange={(e) => {
              setPrompt(e.target.value);
              if (emptyInput) {
                setEmptyInput(false);
              }
            }}
          />
          {loading ? (
            <GenerateBtn isDisabled={true} className="placeholder-glow">
              {/* Generate */}
              <i class="bi bi-arrow-up"></i>

            </GenerateBtn>
          ) : (
            <GenerateBtn onClick={generatePics}  >
              {/* <div className="d-sm-block d-none" > Generate </div> */}
              <i class="bi bi-arrow-up"></i>
            </GenerateBtn>
          )}
        </InputSec>
      </Row>
    </Creative>
  );
}
