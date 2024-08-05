// components/Footer.js
import styled from "styled-components";
import { Category } from "@/models/Category";

const FooterContainer = styled.footer`
  //   background-color: #333;
  //   color: #fff;
  padding: 10px 0;
  box-shadow:0px -1px 1px #0000001f;
  justify-content:center;
  display:flex;
  color:#0000008f;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const FooterTitle = styled.div`
  margin-bottom: 10px;
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 5px;
`;

export default function Footer({ categories }) {
  console.log("categories", categories);

  return (
    <FooterContainer>
      <div>
        © 2024 Deepwall. All rights reserved.
      </div>
    </FooterContainer>
    // <FooterContainer>
    //   <FooterContent>
    //     <FooterColumn>
    //       <FooterTitle>Uncategorized</FooterTitle>
    //       {/* <FooterList>
    //         {categories?.length > 0 &&
    //           categories.map((category) => (
    //             <FooterListItem key={category?._id}>
    //               {category?.name}
    //             </FooterListItem>
    //           ))}
    //       </FooterList> */}
    //     </FooterColumn>
    //     <FooterColumn>
    //       <FooterTitle>Animals Art</FooterTitle>
    //       <FooterList>
    //         <FooterListItem>Item 1</FooterListItem>
    //         <FooterListItem>Item 2</FooterListItem>
    //         <FooterListItem>Item 3</FooterListItem>
    //       </FooterList>
    //     </FooterColumn>
    //     <FooterColumn>
    //       <FooterTitle>My account</FooterTitle>
    //       <FooterList>
    //         <FooterListItem>Item 1</FooterListItem>
    //         <FooterListItem>Item 2</FooterListItem>
    //         <FooterListItem>Item 3</FooterListItem>
    //       </FooterList>
    //     </FooterColumn>
    //   </FooterContent>
    // </FooterContainer>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const productsCategory = await Category.find();
  console.log("productsCategory on my foot", productsCategory);
  return {
    props: {
      categories: JSON.parse(JSON.stringify(productsCategory)),
    },
  };
}
