"use client"

//From here details of adminNav is passed to AdminNavItem page--------->

import Link from "next/link"
import AdminNavItem from "./AdminNavItem"
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md"
import { usePathname } from "next/navigation"
import Container from "../Container"

 
const AdminNav = () => {

 //usePathname hook---->usePathname is a Client Component hook that lets you read the current URL's pathname.
  const pathname = usePathname();

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
       <Container>

        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
            <Link href="/admin">
                {/* Imported from AdminNavItem */}
                <AdminNavItem
                label="Summary"
                icon={MdDashboard} 
                selected={pathname === "/admin"}/>
            </Link>
            <Link href="/admin/add-products">
                {/* Imported from AdminNavItem */}
                <AdminNavItem
                label="AddProducts"
                icon={MdLibraryAdd} 
                // /admin/add-products---->when selected called app-->admin->add-products(folder)-->page.tsx
                selected={pathname === "/admin/add-products"}/>
            </Link>
            <Link href="/admin/manage-products">
                {/* Imported from AdminNavItem */}
                <AdminNavItem
                label="ManageProducts"
                icon={MdDns} 
                selected={pathname === "/admin/manage-products"}/>
            </Link>
            <Link href="/admin/manage-orders">
                {/* Imported from AdminNavItem */}
                <AdminNavItem
                label="ManageOrders"
                icon={MdFormatListBulleted} 
                selected={pathname === "/admin/manage-orders"}/>
            </Link>
        </div>

       </Container>
    </div>
  )
}

export default AdminNav
