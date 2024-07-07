import React from 'react'

//ManageOrders can be name anything not dependent on this component name but depends on folder manage-orders name to come to this file.

import Container from "@/app/components/Container"
import { getCurrentUser } from "@/actions/getCurrentUser"
import NullData from "@/app/components/NullData"
import ManageOrdersClient from './ManageOrdersClient'
import getOrders from '@/actions/getOrders'
 

const ManageOrders = async() => {

  //get products & currentUser
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  //check admin
  if(!currentUser  || currentUser.role != 'ADMIN'){
    return <NullData title="Oops! access denied"/>
  }
  
  return (
     <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders}/>
      </Container>
     </div>
  )
}

export default ManageOrders

