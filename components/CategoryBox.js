import styled , {keyframes} from "styled-components";
import Link from "next/link";



export default function CategoryBox({_id, name , featuredImg }) {
  const url = '/categories/'+_id;
  const ProductWrapper = styled.div`
  position:relative;
  overFlow:hidden
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
  color: #fff;
  position: absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
  z-index: 1;
  display:flex;
  padding-top:2rem;
  padding-left:2rem;
  text-decoration:none
`;

  const CategoryDiv = styled.div`
    height:285px;
    weight:285px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:${featuredImg ?  `url(${featuredImg})` : `#000` };
    background-position:center;
    background-size:cover;
    text-transform:capitalize;
    font-weight:400;
`
  return (
    <ProductWrapper>

        <CategoryDiv className="fs-4" >
            <OverLay href={url} >
             {name}
            </OverLay>
        </CategoryDiv>

    </ProductWrapper>
  );
}