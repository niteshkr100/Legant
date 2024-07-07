import Container from "@/app/components/Container"
import ManageProductsClient from "./ManageProductsClient"
import getProducts from "@/actions/getProducts"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"
 

const ManageProducts = async() => {

  //get products & currentUser
  const products = await getProducts({category:null});
  const currentUser = await getCurrentUser();

  //check admin
  if(!currentUser  || currentUser.role != 'ADMIN'){
    return <NullData title="Oops! access denied"/>
  }
  
  return (
     <div className="pt-8">
      <Container>
        <ManageProductsClient products={products}/>
      </Container>
     </div>
  )
}

export default ManageProducts
