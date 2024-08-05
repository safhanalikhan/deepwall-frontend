import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import { Category } from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import ProductCategory from "@/components/productCategory";

export default function CollectionPage({featuredProduct,newProducts,productsCategory}) {
  return (
    <div>
      {/* <Header /> */}
      <Featured product={featuredProduct} />
      <ProductCategory categories={productsCategory} />
      <NewProducts products={newProducts} />
    </div>
  );    
}

export async function getServerSideProps() {
  const featuredProductId = '665cb7605593fb1a75893f13';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:10});
  const productsCategory = await Category.find({}, null, {sort: {'_id':-1}, limit:10});
  
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      productsCategory: JSON.parse(JSON.stringify(productsCategory)),
    },
  };
}