import prisma from "@/libs/prismadb"

export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams){
    try{
        const {category, searchTerm} = params;
        let searchString = searchTerm;

        // check searchTerm
        if(!searchTerm){
            searchString = ''
        }

        //query
        let query: any = {}
        if(category){
            query.category = category;
        }

        //product
        // https://www.prisma.io/docs/orm/prisma-client/queries/crud(used logic of prisma)
        const products = await prisma.product.findMany({
            where:{
                ...query,
                OR: [
                    {
                        name:{
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description:{
                            contains: searchString,
                            mode:'insensitive'
                        }
                    }
                ]
            },
            include:{
                reviews:{
                    include:{
                        user:true
                    },
                    orderBy:{
                        createDate:'desc'
                    }
                }
            }
        })
     return products;

    }catch(error:any){
        throw new Error(error);
    }
}