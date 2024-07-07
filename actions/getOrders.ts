import prisma from "@/libs/prismadb"

//get order
export default async function getOrders(){

    // prisma use
    try{
        const orders = await prisma.order.findMany({
            include:{
                user:true
            },
            orderBy:{
                createDate:'desc'
            }
        })

        return orders
    }catch(error: any){
        throw new Error(error);
    }
}