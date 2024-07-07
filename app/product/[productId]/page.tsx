import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
 
 interface IParms {
  productId?: string;
 }

const Product = async({params}:{params:IParms}) => {
 
  const product = await getProductById(params)
  const user = await getCurrentUser();

  if(!product)return <NullData title="Oops! Product with given id does not exist"></NullData>

//old(used for demo data && this display details of demo product datta)*******(related to page.tsx)
// const Product = ({params}:{params:IParms}) => {
//   console.log("params", params);
//   const product = products.find((item)=> item.id===params.productId);

  return (
    <div className="p-8">
      <Container> 
        <ProductDetails product={product}/>
        <div className="flex flex-col mt-20 gap-4">
           {/* <AddRating product={product} user={user}/> */}
          <ListRating product={product}/>
        </div>
      </Container>
    </div>
  )
}

export default Product;
