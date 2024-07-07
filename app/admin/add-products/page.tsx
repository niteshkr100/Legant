//addproduct page(page0)

import Container from "@/app/components/Container"
import FormWrap from "@/app/components/FormWrap"
import AddProductForm from "./AddProductForm"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"

const AddProducts = async() => {

  const currentUser = await getCurrentUser();
  
  if(!currentUser  || currentUser.role != 'ADMIN'){
    return <NullData title="Oops! access denied"/>
  }

  return (
    <div>
       <Container>
          <FormWrap>
             <AddProductForm/>
          </FormWrap>
       </Container>
    </div>
  )
}

export default AddProducts
