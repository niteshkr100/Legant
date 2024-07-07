// This route is create to delete item from mongoDb by admin(used in manageProducts)

import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, {params}:{params:{id:string}}){

    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();
    
    //admin check
    if(currentUser.role != 'ADMIN'){
      return NextResponse.error()
    }
  

// delete logic
const product = await prisma?.product.delete({
    where:{id:params.id}
})

return NextResponse.json(product);
}