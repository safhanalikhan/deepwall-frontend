import { useState } from "react";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import {mongooseConnect} from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import ProductCount from "@/components/ProductCount";
import ProductsGrid from "@/components/ProductsGrid";


const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;
const ColWrapper = styled.div`
  display: flex;
  justify-content:space-between;
  height:40rem;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  height:100%;
`;
const ImageBox = styled.div`
  display: flex;
  flex:1;
  height:100%;
  max-height:750px
`;
const ImageActionBox = styled.div`
  display: flex;
  flex:1;
  height:100%;
  padding:3rem;

  .sidebar-options{
    display:flex;
    flex-direction:column;
    // justify-content:  center;

    p{
      font-size:smaller
    }
  }
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 5rem;
  `;
const ImageButton = styled.div`
    border: 2px solid #000;
    ${props => props.active ? ` 
      border-color: #000;
    ` : `
      border-color: transparent;
    `}
    height: 80px;
    cursor: pointer;
    border-radius: 0px;
    
  `;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function CategoryPage({category,products}) {
  console.log("category",category)

  return (
    <div className="category_page" >
      {/* <Header /> */}
      <Center>
        {/* <ColWrapper> */}
            <h1 className="category_heding" >{category.name}</h1>
            <ProductsGrid products={products} />
        {/* </ColWrapper> */}

      </Center>
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  console.log("context in catogery",id)

  const category = await Category.findById(id);
  const products = await Product.find({
        category: id
    });
  console.log("Product = -= - = -" , products )  

  return {
    props: {
        category: JSON.parse(JSON.stringify(category)),
        products: JSON.parse(JSON.stringify(products))
    }
  }
}