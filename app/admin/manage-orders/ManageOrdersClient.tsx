"use client"

//materialui used for table creation 
// https://mui.com/material-ui/react-table/
// npm install @mui/material @emotion/react @emotion/styled
import { Order, User} from "@prisma/client"
import {DataGrid, GridColDef} from "@mui/x-data-grid"
import formatPrice from "@/utils/formatPrice"
import Heading from "@/app/components/Heading"
import {MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md"
import Status from "@/app/components/Status"
import ActionBtn from "@/app/components/ActionBtn"
import { useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import moment from "moment"
 
 

//Define interface in which used product,import from prisma
interface ManageOrdersClientProps{
    orders: ExtendedOrders[]
}
type ExtendedOrders = Order & {
    user: User
}

const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {

const router = useRouter();
 
 //create rows
 let rows: any = [];
 
 //if product exit define row  
 if(orders){
    rows = orders.map((order)=>{
        return {
            id: order.id,
            customer: order.user.name,
            amount: formatPrice(order.amount/100),
            paymentStatus: order.status,
            date: moment(order.createDate).fromNow(),
            deliveryStatus: order.deliveryStatus,
        };
    });
 }
//create column
const columns: GridColDef[] = [
    {field: 'id', headerName:'ID', width:220},
    {field: 'customer', headerName:'Customer Name', width:130},
    {field: 'amount', headerName:'Amount(USD)', width:130, renderCell:(params)=>{
        return(<div className="font-bold text-slate-800">{params.row.amount}</div>)
    }},
    {field:"paymentStatus", headerName:"Payment Status", width: 130, renderCell:(params)=>{
        return(
          <>  
            {params.row.paymentStatus == 'pending'? (
             <Status 
                text="pending" 
                icon={MdAccessTimeFilled} 
                bg="bg-slate-200" 
                color="text-slate-700"/>
             ):params.row.paymentStatus == 'completed'?(
             <Status 
             text="completed" 
             icon={MdDone} 
             bg="bg-green-200"
             color="text-green-700"/>
            ) :(<></>)}  
          </>
        )
    }},
    
    {field:"deliveryStatus", headerName:"Deliver Status", width: 130, renderCell:(params)=>{
        return(
          <>  
            {params.row.deliveryStatus == 'pending'? (
             <Status 
                text="pending" 
                icon={MdAccessTimeFilled} 
                bg="bg-slate-200" 
                color="text-slate-700"/>
             ):params.row.deliveryStatus == 'dispatched'?(
             <Status 
             text="dispatched" 
             icon={MdDeliveryDining} 
             bg="bg-purple-200"
             color="text-purple-700"/>
            ):params.row.deliveryStatus == 'delivered'?(
                <Status 
                text="delivered" 
                icon={MdDone} 
                bg="bg-green-200"
                color="text-green-700"/>
             ):<></>}  
          </>
        )
    }},

    {field: 'date', headerName:'Date', width:130},

    {field:"action", headerName:"Action", width: 200, renderCell:(params)=>{
        return(
        <div className="flex mt-3 justify-between gap-4 w-full">
             <ActionBtn icon={MdDeliveryDining} 
             onClick={()=>{handleDispatch(params.row.id)}}/>
             <ActionBtn icon={MdDone} 
             onClick={()=>{handleDeliver(params.row.id)}}/>
             <ActionBtn icon={MdRemoveRedEye} 
             onClick={()=>{router.push(`/order/${params.row.id}`)}}/>
        </div>)
    } },
]

// handle dispatch
const handleDispatch = useCallback((id:string)=>{
    // (api->product)
   axios.put('/api/order',{
    id,
    deliveryStatus:'dispatched'
}).then((res)=>{
    toast.success('Order Dispatched')
    router.refresh()
}).catch((error)=>{
    toast.error("Oops! Something went wrong")
    console.log(error);
})
}, []) 

// handle deliver 
const handleDeliver= useCallback((id:string)=>{
    // (api->product)
   axios.put('/api/order',{
    id,
    deliveryStatus:'delivered'
}).then((res)=>{
    toast.success('Order Delivered')
    router.refresh()
}).catch((error)=>{
    toast.error("Oops! Something went wrong")
    console.log(error);
})
}, []) 

 
  return (
    <div className="max-w-[1150px] m-auto text-xl">
        <div className="mb-6 mt-8">
            <Heading title="Manage Orders" center/>
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

export default ManageOrdersClient
