import styled from "styled-components";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Center from "@/components/Center";
import axios from "axios";
// import Image from "next/image";
import ProductImages from "@/components/ProductImages";
import ImageAction from "@/components/ImageAction";

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
`;

const GenerateBtn = styled.div`
  background: #000;
  color: #fff;
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
  padding: 0 2rem;
  margin-bottom: 5px;
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
        //   "https://deepwallec2.s3.us-east-2.amazonaws.com/user_generated1722638444553.jpg";
        // setResult(uri);
        // payload = { ...payload, images: [uri] };
        // setActiveImage(uri);
        // setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log("Error . . .", err);
      } finally {
        setLoading(false);
        setProduct({ ...payload });
      }
    }
  }

  return (
    <Creative className="gereante_page ">
      {/* <Center> */}
      <Row >
        <Title>Fit Your Thoughts in to Frame </Title>
        {/* <ImagesGrid className="mt-2 mb-3 d-flex justify-content-center"> */}

        {/* // <img
          //   src={result} // Replace with your image URL
          //   // src={
          //   //   "https://oaidalleapiprodscus.blob.core.windows.net/private/org-2hSGZegpBX0l1lJCg3IhTQD8/user-JiqvUpeEXsQsCdm5czNC9Wtz/img-TmZtYQ5wnYq1z9nhrovC2if7.png?st=2024-07-29T17%3A34%3A20Z&se=2024-07-29T19%3A34%3A20Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-07-29T14%3A34%3A03Z&ske=2024-07-30T14%3A34%3A03Z&sks=b&skv=2023-11-03&sig=IuzW72wdwwdVNprPX1iSsNr8CHoq8HT95VU1nV71LgY%3D"
          //   // } // Replace with your image URL
          //   width={"40%"}
          //   height={"100%"}
          //   style={{ maxHeight: "500px" }}
          // /> */}

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
            className={`p-3 ${emptyInput ? "border-danger border-2 border-end-0" : ""
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
              Generate
            </GenerateBtn>
          ) : (
            <GenerateBtn onClick={generatePics}>Generate</GenerateBtn>
          )}
        </InputSec>
        {/* </ImagesGrid> */}
      </Row>
      {/* </Center> */}
    </Creative>
  );
}
