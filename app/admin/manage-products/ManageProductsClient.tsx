"use client"

//materialui used for table creation 
// https://mui.com/material-ui/react-table/
// npm install @mui/material @emotion/react @emotion/styled
import { Product } from "@prisma/client"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import formatPrice from "@/utils/formatPrice"
import Heading from "@/app/components/Heading"
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md"
import Status from "@/app/components/Status"
import ActionBtn from "@/app/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseApp from "@/libs/firebase"
 

//Define interface in which used product,import from prisma
interface ManageProductsClientProps{
    products: Product[]
}

const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {

const router = useRouter();
//from firebase storage
const storage = getStorage(firebaseApp);
 //create rows
 let rows: any = [];
 
 //if product exit define row  
 if(products){
    rows = products.map((product)=>{
        return {
            id: product.id,
            name: product.name,
            price: formatPrice(product.price),
            category: product.category,
            brand: product.brand,
            inStock: product.inStock,
            images: product.images
        };
    });
 }
//create column
const columns: GridColDef[] = [
    {field: 'id', headerName:'ID', width:220},
    {field: 'name', headerName:'Name', width:220},
    {field: 'price', headerName:'Price(USD)', width:100, renderCell:(params)=>{
        return(<div className="font-bold text-slate-800">{params.row.price}</div>)
    }},
    {field:"category", headerName:"Category", width: 100},
    {field:"brand", headerName:"Brand", width: 100},
    {field:"inStock", headerName:"InStock", width: 120, renderCell:(params)=>{
        return(
          <>  
            {params.row.inStock == true? (
             <Status 
                text="in stock" 
                icon={MdDone} 
                bg="bg-teal-200" 
                color="text-teal-700"/>
             ):(
             <Status 
             text="out of stock" 
             icon={MdClose} 
             bg="bg-rose-200"
             color="text-rose-700"/>
            )} 
          </>
        )
    }},
    {field:"action", headerName:"Action", width: 200, renderCell:(params)=>{
        return(
        <div className="flex mt-3 justify-between gap-4 w-full">
             <ActionBtn icon={MdCached} 
             onClick={()=>{handleToggleStock(params.row.id, params.row.inStock)}}/>
             <ActionBtn icon={MdDelete} 
             onClick={()=>{handleDelete(params.row.id, params.row.images )}}/>
             <ActionBtn icon={MdRemoveRedEye} 
             onClick={()=>{router.push(`/product/${params.row.id}`)}}/>
        </div>)
    } },
]

// handle toggle action of stock
const handleToggleStock = useCallback((id:string, inStock:boolean)=>{
    // (api->product)
   axios.put('/api/product',{
    id,
    inStock:!inStock 
}).then((res)=>{
    toast.success('Product status changed')
    router.refresh()
}).catch((error)=>{
    toast.error("Oops! Something went wrong")
    console.log(error);
})
}, []) 

// handle delete action
const handleDelete = useCallback(async(id:string, images:any[])=>{
    toast("Deleting product, please wait");

    //delete data from firebase
    const handleImageDelete = async()=>{
         try{
            for(const item of images){
                if(item.image){
                    const imageRef = ref(storage, item.image);
                    await deleteObject(imageRef);
                    console.log("image deleted", item.image);
                }
            }
         }catch(error){
           return console.log("Deleting images error", error);
         }
    };

    await handleImageDelete();

    // delete from MongoDb
    // (api->product->[id])
    axios.delete(`/api/product/${id}`).then((res)=>{
     toast.success("Product deleted");
     router.refresh();
    }).catch((err)=>{
        toast.error("Failed to delete product");
        console.log(err);
    })
}, []);


  return (
    <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-6 mt-8">
            <Heading title="Manage Products" center/>
        </div>
        <div style={{height:600, width:"100%"}}>
       <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
            paginationModel: { page: 0, pageSize: 9 },
            },
        }}
        pageSizeOptions={[9, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        />
        </div>
    </div>
  )
}

export default ManageProductsClient
