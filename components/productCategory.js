import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import CategoriesGrid from "./CatogoriesGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;

`;

export default function ProductCategory({categories}) {
  return (
    <Center>
      <Title>All Category</Title>
      <CategoriesGrid categories={categories} />
    </Center>
  );
}