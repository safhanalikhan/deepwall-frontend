import styled from "styled-components";
import CategoryBox from "./CategoryBox";
import Link from "next/link";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media screen and (max-width: 992px) and (min-width: 577px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 576px) {
    grid-template-columns: 1fr;
    // padding:0 3rem;
  }


`;


export default function CategoriesGrid({categories}) {
  return (
    <StyledProductsGrid>
      {categories?.length > 0 && categories.map(category => (
        <CategoryBox key={category._id} {...category} />
      ))}
    </StyledProductsGrid>
  );
}