 
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import {getCurrentUser}  from "@/actions/getCurrentUser"

// post request---------
export async function POST(request: Request){
const currentUser = await getCurrentUser();

//admin check
  if(!currentUser || currentUser.role != 'ADMIN'){
    return NextResponse.error()
  }

    const  body = await request.json()
    const {name, description, price, brand, category, inStock, images} = body;

    const product = await prisma.product.create({
        data:{
            name, 
            description,
            brand,
            category,
            inStock,
            images,
            price: parseFloat(price)
        }
       
    })

    return NextResponse.json(product)
}


// PUt request----------
export async function PUT(request: Request){
  const currentUser = await getCurrentUser();

  if(!currentUser) return NextResponse.error();
    
    //admin check
    if(currentUser.role != 'ADMIN'){
      return NextResponse.error()
    }
  

  const  body = await request.json();
  const {id, inStock} = body;

  const product = await prisma.product.update({
    where:{id: id},
    data: {inStock}
  });

  return NextResponse.json(product);
}