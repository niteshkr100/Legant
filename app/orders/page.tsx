 
import Container from "@/app/components/Container"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"
import OrderClient from './OrderClient'
import getOrdersByUserId from "@/actions/getOrdersByUserId"
 

const Orders = async() => {   

  const currentUser = await getCurrentUser();

  //check  
  if(!currentUser){
    return <NullData title="Oops! access denied"/>
  }
  
  const orders = await getOrdersByUserId(currentUser.id);

   //check  
   if(!orders){
    return <NullData title="No orders"/>
  }
  
  return (
     <div className="pt-8">
      <Container>
        <OrderClient orders={orders}/>
      </Container>
     </div>
  )
}

export default Orders;

