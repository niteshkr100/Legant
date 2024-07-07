import AdminNav from "../components/admin/AdminNav";

//Main Admin------------->(All things start from here--->page0)

export const metadata = {
    title:"Oneshop Admin",
    discription:"One-shop Admin Dashboard"
};

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        {/* import from component->admin->AdminNav */}
       <AdminNav/>
      {children}
    </div>
  )
}

export default AdminLayout
