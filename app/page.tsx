export const revalidate = 0;

import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import truncateText from "@/utils/truncateText";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";


// dynamic
interface HomeProps{
  searchParams: IProductParams
}
export default async function Home({searchParams}:HomeProps) {

  // this line is used to display product only admin added
  // if commented this line. we get static(demo product)*********(related to product->[productId]->page.tsx)
  const products = await getProducts(searchParams);

  if(products.length == 0 ){
    return <NullData title="Oops! No products found. Click All to clear filter" />
  }

// //shuffle product
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Corrected this line
  }
  return array;
}


const shuffledProducts = shuffleArray(products)
  return (
     <div className="py-8"> 
      <Container>
        <div>
          <HomeBanner/> 
        </div>
        {/* product destructing using map method */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-8">
              {shuffledProducts.map((product : any)=>{
                return  <ProductCard data={product} key={product.id}/>
              })}

        </div>
      </Container>
     </div>
  );
}


//server component
// statics
// export default function Home() {
//   return (
//      <div className="py-8"> 
//       <Container>
//         <div>
//           <HomeBanner/> 
//         </div>
//         {/* product destructing using map method */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-8">
//               {products.map((product : any)=>{
//                 return  <ProductCard data={product}/>
//               })}

//         </div>
//       </Container>
//      </div>
//   );
// }